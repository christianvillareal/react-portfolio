import { Html, Head, Main, NextScript } from 'next/document';
import { basePath } from '../lib/site';
export default function Document() {
 const backgroundStyles = {
   '--gradient-image': `url("${basePath}/images/gradient2.png")`,
   '--contact-image': `url("${basePath}/images/contact-bg.png")`,
 };
 return <Html lang="en"><Head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" rel="stylesheet" /></Head><body style={backgroundStyles}><Main /><NextScript /></body></Html>;
}
