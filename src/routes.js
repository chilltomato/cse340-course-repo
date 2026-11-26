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
import { showUserRegistrationForm, 
    processUserRegistrationForm, 
    showLoginForm, 
    processLoginForm, 
    processLogout,
    requireLogin,
showDashboard,
requireRole } from './controllers/users.js'
import { testErrorPage } from './controllers/errors.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailspage);
router.get('/category/:id', showCategoriesdetailPage)
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);

router.get('/new-organization', requireRole('admin'), showNewOrganizationForm)
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.get('/assign-categories/:id', requireRole('admin'), showAssignCategoriesForm);
router.get('/editproject/:id', requireRole('admin'), showEditProjectForm);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.get('/register',showUserRegistrationForm);
router.get('/login', showLoginForm);

// Routes to handle form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategoriesForm);
router.post('/editproject/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
router.post('/register', processUserRegistrationForm);
router.post('/login', processLoginForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;