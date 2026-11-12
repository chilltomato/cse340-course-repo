import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';


const showProjectsPage  = async (req, res) => {
    const projects = await getUpcomingProjects(5);
    const title = 'Service Projects';
    res.render('projects', { title, projects });
}

const showProjectDetailspage = async (req, res) => {
    const title = 'Project Details';
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    console.log(projectDetails)
    res.render('project', {title, projectDetails});
}
export {showProjectsPage, showProjectDetailspage}