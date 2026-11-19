import { getAllCategories, 
    getCategoryDetails, getcategorysByProjectId  } from '../models/categories.js';
import {getProjectsByCategoryId, 
    getProjectDetails, 
    updateCategoryAssignments} from '../models/projects.js';
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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.id;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getcategorysByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.id;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export {showCategoriesPage, showCategoriesdetailPage, showAssignCategoriesForm, processAssignCategoriesForm }

