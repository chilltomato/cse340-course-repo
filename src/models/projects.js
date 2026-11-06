import db from './db.js'
import { getAllOrganizations } from './organizations.js';

const getAllProjects = async() => {
    const projectquery = `
        SELECT project_id, title, description, place, thedate
      FROM public.projects;
    `;

    const projectresult = await db.query(projectquery);

    const projectorgaizationsquery = `
        SELECT project_id, organization_id
      FROM public.project_orgaizations;
    `;

    const projectorgaizationsresult = await db.query(projectorgaizationsquery);
    const organizations = await getAllOrganizations();
    const projects = projectresult.rows.map( project => { 
        const ProjectOrganizations = projectorgaizationsresult.rows.filter(
            relationship => relationship.project_id == project.project_id
        );

        const detailedprojectorganizations = ProjectOrganizations.map(relationship => {
            return organizations.find(
                organization => organization.organization_id === relationship.organization_id
            );
        }).filter(Boolean);

        return {
            ...project,
            organizations: detailedprojectorganizations
        }
    })

    return projects;
}

export {getAllProjects}  