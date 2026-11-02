// Pure validation logic: this can be tested without installing React.
// These rules are implementation choices, not extra rules from the assignment sheet.
export function validateContact(formData) {
  const errors = {};
  if (!formData.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!formData.lastName.trim()) errors.lastName = "Please enter your last name.";

  const contactNumber = formData.contactNumber.trim();
  const phoneDigits = contactNumber.replace(/\D/g, "");
  if (!contactNumber) {
    errors.contactNumber = "Please enter a contact number.";
  } else if (!/^[+\d\s().-]+$/.test(contactNumber) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.contactNumber = "Use 7–15 digits. Spaces, +, parentheses, dots, and hyphens are allowed.";
  }

  const email = formData.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter an email address such as name@example.com.";
  }

  if (!formData.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (formData.message.trim().length < 5) {
    errors.message = "Please use at least 5 characters.";
  } else if (formData.message.length > 2000) {
    errors.message = "Please keep the message within 2,000 characters.";
  }
  return errors;
}
