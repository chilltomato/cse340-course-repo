import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import{getcategorysByProjectId} from '../models/categories.js'

const showProjectsPage  = async (req, res) => {
    const projects = await getUpcomingProjects(5);
    const title = 'Service Projects';
    res.render('projects', { title, projects });
}

const showProjectDetailspage = async (req, res) => {
    const title = 'Project Details';
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getcategorysByProjectId(projectId);
    res.render('project', {title, projectDetails, categories});
}
export {showProjectsPage, showProjectDetailspage}