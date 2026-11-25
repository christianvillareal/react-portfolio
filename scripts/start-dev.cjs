const { spawn } = require('node:child_process');
const path = require('node:path');
require('@next/env').loadEnvConfig(process.cwd());

let backend;
let frontend;
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  frontend?.kill();
  backend?.kill();
  process.exitCode = code;
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());

async function healthy() {
  try {
    const response = await fetch('http://localhost:3001/health', { signal: AbortSignal.timeout(1000) });
    return response.ok && (await response.json()).status === 'ok';
  } catch {
    return false;
  }
}

async function start() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if ((!apiUrl || apiUrl.replace(/\/$/, '') === 'http://localhost:3001') && !(await healthy())) {
    const directory = path.join(process.cwd(), 'portfolio-backend');
    try {
      require.resolve('express', { paths: [directory] });
      require.resolve('dotenv', { paths: [directory] });
    } catch {
      throw new Error('Install the contact backend dependencies with: npm --prefix portfolio-backend install');
    }
    backend = spawn(process.execPath, ['server.js'], {
      cwd: directory, stdio: 'inherit', env: { ...process.env, PORT: '3001' }, windowsHide: true,
    });
    backend.on('error', error => { console.error(error.message); stop(1); });
    backend.on('exit', code => { if (!stopping) stop(code || 1); });
    let ready = false;
    for (let attempt = 0; attempt < 20 && !stopping; attempt++) {
      if (await healthy()) { ready = true; break; }
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    if (stopping) return;
    if (!ready) throw new Error('The contact backend did not start. Check portfolio-backend/.env.');
  }
  frontend = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', ...process.argv.slice(2)], {
    stdio: 'inherit', windowsHide: true,
  });
  frontend.on('error', error => { console.error(error.message); stop(1); });
  frontend.on('exit', code => stop(code || 0));
}
start().catch(error => { console.error(error.message); stop(1); });
