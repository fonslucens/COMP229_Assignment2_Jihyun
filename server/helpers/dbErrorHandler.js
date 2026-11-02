// Same role and exported name as the Week 4 helper.
const getUniqueErrorMessage = (err) => {
  // Compatibility fix: use structured key information, not the old '.$' string format.
  const keys = Object.keys(err.keyPattern || err.keyValue || {});
  const field = keys[0];
  if (!field) return 'Unique field already exists';
  return field.charAt(0).toUpperCase() + field.slice(1) + ' already exists';
};

const getErrorMessage = (err) => {
  if (err.code === 11000 || err.code === 11001) return getUniqueErrorMessage(err);
  if (err.name === 'ValidationError' && err.errors) {
    for (const field in err.errors) {
      if (err.errors[field].message) return err.errors[field].message;
    }
  }
  if (err.name === 'CastError') return 'Invalid value for ' + err.path;
  return 'Something went wrong';
};

export default { getErrorMessage };
