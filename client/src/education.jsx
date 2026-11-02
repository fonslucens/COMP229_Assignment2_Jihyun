import { education, profile } from "./data/portfolio.js";

export default function Education() {
  return (
    <section className="section">
      <p className="eyebrow">EDUCATION &amp; QUALIFICATIONS</p>
      <h1>A foundation that keeps growing.</h1>
      <p className="lead">From healthcare to software engineering, with attention to people and detail throughout.</p>
      <div className="education-list">
        {education.map((item) => (
          <article className="education-item" key={item.id}>
            <div><p className="education-date">{item.dates}</p><span className="status-tag">{item.status}</span></div>
            <div><h2>{item.school}</h2><h3>{item.qualification}</h3><p>{item.description}</p></div>
          </article>
        ))}
        <article className="education-item">
          <div><p className="education-date">{profile.dentalLicenceYear}</p><span className="status-tag">Professional qualification</span></div>
          <div><h2>Dental Hygienist Licence</h2><h3>South Korea</h3><p>Obtained in South Korea in {profile.dentalLicenceYear}.</p></div>
        </article>
      </div>
    </section>
  );
}
