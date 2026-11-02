import express from 'express';
import contactCtrl from '../controllers/contact.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import allowBulkDelete from '../helpers/bulkDeleteGuard.js';

const router = express.Router();
router.route('/api/contacts')
  .get(contactCtrl.list)
  .post(contactCtrl.create)
  .delete(authCtrl.requireSignin, allowBulkDelete, contactCtrl.removeAll);

router.route('/api/contacts/:contactId')
  .get(contactCtrl.read)
  .put(authCtrl.requireSignin, contactCtrl.update)
  .delete(authCtrl.requireSignin, contactCtrl.remove);

router.param('contactId', contactCtrl.contactByID);
export default router;
