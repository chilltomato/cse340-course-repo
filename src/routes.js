import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';
import { showProjectsPage, 
    showProjectDetailspage, 
    showNewProjectForm, 
    processNewProjectForm, 
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';
import {showCategoriesPage, 
    showCategoriesdetailPage, 
    showAssignCategoriesForm, 
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    categoryValidation,
    showEditCategoryForm,
    processEditCategoryForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailspage);
router.get('/category/:id', showCategoriesdetailPage)

router.get('/new-organization', showNewOrganizationForm)
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.get('/assign-categories/:id', showAssignCategoriesForm);
router.get('/editproject/:id', showEditProjectForm);
router.get('/new-category', showNewCategoryForm)
router.get('/edit-category/:id', showEditCategoryForm)

// Routes to handle form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/assign-categories/:id', processAssignCategoriesForm);
router.post('/editproject/:id', projectValidation, processEditProjectForm)
router.post('/new-category', categoryValidation, processNewCategoryForm)
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm)

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;