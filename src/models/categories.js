import db from './db.js'

const getAllCategories = async() => {
  
    const categoryquery = `
        SELECT 
        a.category_id, 
        a.category_name,
        p.project_id,
        p.title,
        p.description, 
        p.place, 
        p.thedate
        FROM public.category a
        LEFT JOIN public.project_category ap
        ON a.category_id = ap.category_id
        LEFT JOIN public.projects p
        ON ap.project_id = p.project_id
        ORDER BY p.project_id;

    `;

    const categoryresult = await db.query(categoryquery);

   const categories = categoryresult.rows.reduce((acc, row) => {

        let category = acc.find(
            category => category.category_id === row.category_id
        );

        if (!category) {
            category = {
                category_id: row.category_id,
                category_name: row.category_name,
                projects: []
            };

            acc.push(category);
        }

        if (row.project_id !== null) {
            category.projects.push({
                project_id: row.project_id,
                title: row.title,
                description: row.description,
                place: row.place,
                thedate: row.thedate
            });
        }

        return acc;

    }, []);

    return categories;
}

const getCategoryDetails = async(categoryId) => {
  
    const categoryquery = `
        SELECT 
        category_id, 
        category_name
        FROM public.category 
        WHERE category_id = $1;
    `;
      const queryParams = [categoryId];

    const categoryresult = await db.query(categoryquery, queryParams);
    return categoryresult.rows[0];
}

const getcategorysByProjectId = async (ProjectId) => {
      const query = `
        SELECT
        a.category_id, 
        a.category_name
        FROM public.category a
        INNER JOIN public.project_category ap
        ON a.category_id = ap.category_id
        WHERE ap.project_id = $1
      `;
      const queryParams = [ProjectId];

      const result = await db.query(query, queryParams);

      return result.rows;
};
export {getAllCategories, getCategoryDetails, getcategorysByProjectId}  