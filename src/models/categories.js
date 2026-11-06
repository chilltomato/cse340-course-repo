import db from './db.js'

const getAllCategories = async() => {
  
    const categoryquery = `
        SELECT category_id, category_name
      FROM public.category;
    `;

    const categoryresult = await db.query(categoryquery);

    const projectquery = `
        SELECT project_id, title, description, place, thedate
      FROM public.projects;
    `;

    const projectsresult = await db.query(projectquery);

    const projectcategoryquery = `
        SELECT project_id, category_id
      FROM public.project_category;
    `;

    const projectcategoryresult = await db.query(projectcategoryquery);


    const categories = categoryresult.rows.map( category => { 
        const projectcategorys = projectcategoryresult.rows.filter(
            relationship => relationship.category_id == category.category_id
        );

        const detailedprojectcategorys = projectcategorys.map(relationship => {
            return projectsresult.rows.find(
                projects => projects.project_id === relationship.project_id
            );
        }).filter(Boolean);

        return {
            ...category,
            projects: detailedprojectcategorys
        }
    })

    return categories;
}

export {getAllCategories}  