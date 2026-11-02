// Small safety helper: copy only the fields permitted by this assignment.
// Never pass the whole request body into a database update.
const pickFields = (body, fields) => {
  const data = {};
  if (!body || typeof body !== 'object' || Array.isArray(body)) return data;
  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) data[field] = body[field];
  }
  return data;
};

export default pickFields;
