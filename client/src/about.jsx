import { Link } from "react-router-dom";
import { profile } from "./data/portfolio.js";

export default function About() {
  return (
    <section className="section">
      <p className="eyebrow">ABOUT ME</p>
      <div className="about-grid">
        <div>
          <h1>{profile.name}</h1>
          <p className="lead">{profile.role}</p>
          {profile.aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="button-row">
            <a className="button" href={profile.resume} target="_blank" rel="noreferrer">View résumé (PDF)</a>
            <Link className="button secondary" to="/contact">Contact me</Link>
          </div>
        </div>
        <figure className="portrait-frame">
          {/* This is the actual portrait supplied by Jihyun, not a generated image. */}
          <img className="portrait" src={profile.portrait} alt={`Portrait of ${profile.name}`} width="1200" height="1500" />
          <figcaption>{profile.name}</figcaption>
        </figure>
      </div>
      <div className="about-values">
        <article><h2>Technical foundations</h2><p>JavaScript, HTML/CSS, Oracle SQL, Python, and C# through projects and coursework.</p></article>
        <article><h2>People &amp; communication</h2><p>Korean and English communication, international customer service, and collaborative learning.</p></article>
        <article><h2>Where I’m heading</h2><p>Fintech, data-informed products, business systems, and useful web applications.</p></article>
      </div>
    </section>
  );
}
