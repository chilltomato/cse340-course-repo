import db from './db.js'

const getAllProjects = async() => {
    const projectquery = `
    SELECT
    p.project_id,
    p.title,
    p.description,
    p.place,
    p.thedate,
    o.organization_id,
    o.name AS organization_name
    FROM public.projects p
    LEFT JOIN public.project_orgaizations po
    ON p.project_id = po.project_id
    LEFT JOIN public.organization o
    ON po.organization_id = o.organization_id
    ORDER BY p.project_id;
    `;

    const projectresult = await db.query(projectquery);
    const projects = projectresult.rows.reduce((acc, row) => {
        let project = acc.find(
            project => project.project_id === row.project_id
        );

        if (!project) {
            project = {
                project_id: row.project_id,
                title: row.title,
                description: row.description,
                place: row.place,
                thedate: row.thedate,
                organizations: []
            };

            acc.push(project);
        }

        if (row.organization_id !== null) {
            project.organizations.push({
                organization_id: row.organization_id,
                name: row.organization_name,
                description: row.organization_description,
                email: row.organization_email
            });
        }

        return acc;
    }, []);

    return projects;

}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
        p.project_id,
        p.title,
        p.description,
        p.place,
        p.thedate
        FROM public.projects p
        INNER JOIN public.project_orgaizations po
        ON p.project_id = po.project_id
        WHERE po.organization_id = $1
        ORDER BY p.thedate;
      `;
      const queryParams = [organizationId];

      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
const currentdate = new Date();
const query = `
   SELECT
        p.project_id,
        p.title,
        p.description,
        p.place,
        p.thedate,
        o.organization_id,
        o.name AS organization_name
        FROM public.projects p
        LEFT JOIN public.project_orgaizations po
        ON p.project_id = po.project_id
        LEFT JOIN public.organization o
        ON po.organization_id = o.organization_id
        where thedate >= $2
        ORDER BY p.thedate ASC
        LIMIT $1;
      `;
      const queryParams = [number_of_projects, currentdate];

      const projectresult = await db.query(query, queryParams);

      const projects = projectresult.rows.reduce((acc, row) => {
        let project = acc.find(
            project => project.project_id === row.project_id
        );

        if (!project) {
            project = {
                project_id: row.project_id,
                title: row.title,
                description: row.description,
                place: row.place,
                thedate: row.thedate,
                organizations: []
            };

            acc.push(project);
        }

        if (row.organization_id !== null) {
            project.organizations.push({
                organization_id: row.organization_id,
                name: row.organization_name,
                description: row.organization_description,
                email: row.organization_email
            });
        }

        return acc;
    }, []);

    return projects;
}


const getProjectDetails = async (organizationId) => {
      const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.place,
        p.thedate,
        o.organization_id,
        o.name AS organization_name
        FROM public.projects p
        LEFT JOIN public.project_orgaizations po
        ON p.project_id = po.project_id
        LEFT JOIN public.organization o
        ON po.organization_id = o.organization_id      
        WHERE p.project_id = $1;
    `;

      const queryParams = [organizationId];
    const projectresult = await db.query(query, queryParams);

      const projects = projectresult.rows.reduce((acc, row) => {
        let project = acc.find(
            project => project.project_id === row.project_id
        );

        if (!project) {
            project = {
                project_id: row.project_id,
                title: row.title,
                description: row.description,
                place: row.place,
                thedate: row.thedate,
                organizations: []
            };

            acc.push(project);
        }

        if (row.organization_id !== null) {
            project.organizations.push({
                organization_id: row.organization_id,
                name: row.organization_name,
            });
        }

        return acc;
    }, []);

    return projects[0];
};

const getProjectsByCategoryId = async (categoryId) => {
      const query = `
        SELECT
        p.project_id,
        p.title,
        p.description,
        p.place,
        p.thedate
        FROM public.projects p
        INNER JOIN public.project_category pa
        ON p.project_id = pa.project_id
        WHERE pa.category_id = $1
        ORDER BY p.thedate;
      `;
      const queryParams = [categoryId];

      const result = await db.query(query, queryParams);

      return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId};
