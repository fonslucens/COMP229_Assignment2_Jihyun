import { projects } from "./data/portfolio.js";

export default function Projects() {
  return (
    <section className="section">
      <p className="eyebrow">SELECTED WORK</p>
      <h1>Projects &amp; coursework</h1>
      <p className="lead">A clear account of what I worked on, what I contributed, and what the work produced.</p>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <figure className="project-media">
              <img src={project.image} alt={project.imageAlt} loading="lazy" />
              <figcaption>{project.imageCaption}</figcaption>
            </figure>
            <div className="project-content">
              <p className="eyebrow">{project.category}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <h3>My role</h3><p>{project.role}</p>
              <h3>Outcome</h3><p>{project.outcome}</p>
              <div className="tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              {project.link && <a className="text-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} ↗</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
