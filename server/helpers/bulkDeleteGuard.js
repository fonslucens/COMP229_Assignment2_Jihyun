import config from '../../config/config.js';

// Additional local-lab safeguard. This is not an administrator/role system.
// Every collection-wide DELETE must also pass requireSignin in its route.
const allowBulkDelete = (req, res, next) => {
  if (config.env !== 'development' || !config.allowBulkDelete) {
    return res.status(403).json({ error: 'Bulk delete is disabled. Enable it only for disposable local-lab data.' });
  }
  if (req.get('X-Confirm-Delete-All') !== 'DELETE ALL') {
    return res.status(400).json({ error: 'Set X-Confirm-Delete-All: DELETE ALL to confirm this destructive test.' });
  }
  next();
};

export default allowBulkDelete;
