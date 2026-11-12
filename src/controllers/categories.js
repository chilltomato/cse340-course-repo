import { getAllCategories, getCategoryDetails } from '../models/categories.js';
import {getProjectsByCategoryId} from '../models/projects.js';
const showCategoriesPage   = async (req, res) => {
    const title = 'Categories';
    const categories = await getAllCategories();
    res.render('categories', { title, categories });
}

const showCategoriesdetailPage   = async (req, res) => {
    const title = 'Category';
    const categoryId = req.params.id;
    const categorydetails = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    res.render('category', { title, categorydetails, projects });
}

export {showCategoriesPage, showCategoriesdetailPage }

