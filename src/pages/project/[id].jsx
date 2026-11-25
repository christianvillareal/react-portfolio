import ProjectDetails from '../../components/ProjectDetails';
import { getProject } from '../../lib/projects';
export default function ProjectPage({project}) { return <ProjectDetails key={project.id} project={project} />; }
export async function getServerSideProps({ params, res }) {
  res.setHeader('Cache-Control', 'no-store');
  const project = await getProject(params.id);
  return project ? { props: { project } } : { notFound: true };
}
