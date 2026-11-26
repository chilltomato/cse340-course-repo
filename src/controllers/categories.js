import { getAllCategories, 
    getCategoryDetails, 
    getcategorysByProjectId, 
    createCategory,
    updateCategory  } from '../models/categories.js';
import {getProjectsByCategoryId, 
    getProjectDetails, 
    updateCategoryAssignments} from '../models/projects.js';
import { body, validationResult } from 'express-validator';

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

const showNewCategoryForm = async (req, res) => {
    const title = "new category";

    res.render('new-category', { title});
};

const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-category');
    }
    const {name} = req.body;
    const categoryID = await createCategory(name);
    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryID}`);

}

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Name must be between 3 and 100 characters')
];

const showEditCategoryForm = async (req, res) => {
    const title = "edit category";
    const categoryId = req.params.id;
    const categorydetails = await getCategoryDetails(categoryId);

    res.render('edit-category', { title, categorydetails});
};

const processEditCategoryForm = async (req, res) => {
    // Check for validation errors
    const categoryId = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect(`/edit-category/${categoryId}`);
    }
    const {name} = req.body;
    const categoryID = await updateCategory(categoryId, name);
    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryID}`);

}


export {showCategoriesPage, 
    showCategoriesdetailPage, 
    showAssignCategoriesForm, 
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    categoryValidation,
    showEditCategoryForm,
    processEditCategoryForm
    }

