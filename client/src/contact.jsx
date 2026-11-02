import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "./data/portfolio.js";
import { validateContact } from "./utils/validateContact.js";

const initialForm = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  email: "",
  message: "",
};

export default function Contact({ onCapture }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    // Keep the other fields; update only the input whose name matches this key.
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
    if (hasSubmitted) setErrors(validateContact(nextFormData));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setHasSubmitted(true);
    const nextErrors = validateContact(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // Pass a snapshot to the parent before switching to the Home route.
    // No network request, console logging, email, or persistent storage is used.
    onCapture({ ...formData });
    navigate("/");
    window.scrollTo(0, 0);
  }

  return (
    <section className="section">
      <p className="eyebrow">CONTACT ME</p>
      <h1>Let’s start with a conversation.</h1>
      <p className="lead">{profile.contactIntroduction}</p>
      <div className="contact-grid">
        <aside className="contact-panel" aria-label="Contact information">
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
          <dl>
            <dt>Location</dt><dd>{profile.location}</dd>
            <dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd>
            <dt>LinkedIn</dt><dd><a href={profile.linkedin} target="_blank" rel="noreferrer">View my LinkedIn profile ↗</a></dd>
          </dl>
          <p className="small">For a real enquiry, please use the email or LinkedIn link above.</p>
        </aside>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h2>Contact form</h2>
          <p id="form-note" className="form-note">Course demonstration: your entries will appear on Home after validation. Nothing is emailed or saved permanently. Use sample information when testing. All fields are required.</p>
          {Object.keys(errors).length > 0 && <p className="error-summary" role="alert">Please correct the fields below before continuing.</p>}
          <div className="field-row">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" autoComplete="given-name" required value={formData.firstName} onChange={handleChange} aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "firstName-error" : undefined} />
              {errors.firstName && <p id="firstName-error" className="field-error">{errors.firstName}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" autoComplete="family-name" required value={formData.lastName} onChange={handleChange} aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "lastName-error" : undefined} />
              {errors.lastName && <p id="lastName-error" className="field-error">{errors.lastName}</p>}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="contactNumber">Contact Number</label>
            <input id="contactNumber" name="contactNumber" type="tel" autoComplete="tel" required value={formData.contactNumber} onChange={handleChange} aria-invalid={Boolean(errors.contactNumber)} aria-describedby={errors.contactNumber ? "contactNumber-error" : undefined} />
            {errors.contactNumber && <p id="contactNumber-error" className="field-error">{errors.contactNumber}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" required value={formData.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
            {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
          </div>
          <button className="button" type="submit" aria-describedby="form-note">Capture &amp; return Home <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </section>
  );
}
