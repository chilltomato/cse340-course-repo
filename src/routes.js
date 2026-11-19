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
    projectValidation 
} from './controllers/projects.js';
import { showCategoriesPage, 
    showCategoriesdetailPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm 
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailspage);
router.get('/project/:id', showProjectDetailspage);
router.get('/category/:id', showCategoriesdetailPage)
router.get('/new-organization', showNewOrganizationForm)
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);

// Routes to handle form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;