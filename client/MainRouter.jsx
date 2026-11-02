import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./src/about.jsx";
import Projects from "./src/project.jsx";
import Education from "./src/education.jsx";
import Services from "./src/services.jsx";
import Contact from "./src/contact.jsx";

export default function MainRouter() {
  // Keep the captured message above the routes so Home can read it after navigation.
  // This is temporary memory: it is neither emailed nor saved to a database.
  const [submission, setSubmission] = useState(null);

  return (
    <>
      <Layout />
      <main id="main-content" className="page-shell">
        <Routes>
          <Route path="/" element={<Home submission={submission} onClear={() => setSubmission(null)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact onCapture={setSubmission} />} />
          <Route path="*" element={
            <section className="section">
              <p className="eyebrow">404</p>
              <h1>Page not found</h1>
              <p>This route does not exist.</p>
              <Link className="button" to="/">Back to Home</Link>
            </section>
          } />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>Jihyun Kim · Software &amp; Data</span>
        <span>Built with React · COMP 229</span>
      </footer>
    </>
  );
}
