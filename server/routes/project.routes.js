import express from 'express';
import projectCtrl from '../controllers/project.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import allowBulkDelete from '../helpers/bulkDeleteGuard.js';

const router = express.Router();
router.route('/api/projects')
  .get(projectCtrl.list)
  .post(authCtrl.requireSignin, projectCtrl.create)
  .delete(authCtrl.requireSignin, allowBulkDelete, projectCtrl.removeAll);

router.route('/api/projects/:projectId')
  .get(projectCtrl.read)
  .put(authCtrl.requireSignin, projectCtrl.update)
  .delete(authCtrl.requireSignin, projectCtrl.remove);

router.param('projectId', projectCtrl.projectByID);
export default router;
