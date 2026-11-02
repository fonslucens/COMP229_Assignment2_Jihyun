import { Link } from "react-router-dom";
import { profile, projects } from "../src/data/portfolio.js";

export default function Home({ submission, onClear }) {
  return (
    <>
      {submission && (
        <section className="receipt" aria-labelledby="receipt-title">
          <p className="eyebrow">CONTACT FORM DEMONSTRATION</p>
          <h2 id="receipt-title">Your form data was captured.</h2>
          <p role="status">You have returned to Home. This demonstration does not send an email or save data permanently.</p>
          <dl className="receipt-data">
            <div><dt>First Name</dt><dd>{submission.firstName}</dd></div>
            <div><dt>Last Name</dt><dd>{submission.lastName}</dd></div>
            <div><dt>Contact Number</dt><dd>{submission.contactNumber}</dd></div>
            <div><dt>Email Address</dt><dd>{submission.email}</dd></div>
            <div className="receipt-message"><dt>Message</dt><dd>{submission.message}</dd></div>
          </dl>
          <button className="button secondary" type="button" onClick={onClear}>Clear captured data</button>
        </section>
      )}
      <section className="hero">
        <div>
          <p className="eyebrow">HELLO, I’M JIHYUN KIM</p>
          <h1>{profile.headline}</h1>
          <p className="hero-copy">{profile.introduction}</p>
          <div className="button-row">
            <Link className="button" to="/about">Get to know me <span aria-hidden="true">↗</span></Link>
            <Link className="button secondary" to="/project">Explore my projects</Link>
          </div>
          <p className="quiet-line">{profile.location} · {profile.coop}</p>
        </div>
        <aside className="hero-note" aria-label="Professional focus">
          <p className="eyebrow">MY APPROACH</p>
          <p className="note-title">Understand.<br />Build.<br />Improve.</p>
          <div className="note-divider" />
          <p>I bring a people-first perspective to technical learning.</p>
          <div className="tags"><span>Web</span><span>Data</span><span>User needs</span></div>
        </aside>
      </section>
      <section className="mission">
        <p className="eyebrow">MISSION</p>
        <h2>Useful technology starts with a clear purpose.</h2>
        <p>{profile.mission}</p>
      </section>
      <section className="section">
        <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2>Projects &amp; coursework</h2></div><Link to="/project">See the details →</Link></div>
        <div className="preview-grid">
          {projects.map((project, index) => (
            <Link key={project.id} to="/project" className="preview-card">
              <span className="card-number">0{index + 1}</span>
              <h3>{project.title}</h3>
              <p>{project.category}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
