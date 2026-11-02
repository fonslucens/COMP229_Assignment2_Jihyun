import { Link } from "react-router-dom";
import { services } from "./data/portfolio.js";

export default function Services() {
  return (
    <section className="section">
      <p className="eyebrow">SERVICES</p>
      <h1>Ways I can contribute.</h1>
      <p className="lead">Entry-level project support grounded in my coursework and frontend team experience.</p>
      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <span className="service-number">{service.number}</span>
            <h2>{service.title}</h2><p>{service.text}</p>
          </article>
        ))}
      </div>
      <div className="callout"><h2>Have a small project or a learning opportunity?</h2><p>I welcome conversations about where my current skills could be useful.</p><Link className="button" to="/contact">Start a conversation</Link></div>
    </section>
  );
}
