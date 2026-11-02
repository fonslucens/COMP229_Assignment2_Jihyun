// Personal content is kept together so it can be reviewed before publication.
// Sources and remaining edits are documented in docs/CONTENT_SOURCES.md.
export const profile = {
  name: "Jihyun Kim",
  initials: "JK",
  location: "Toronto, Ontario",
  email: "jkim565@my.centennialcollege.ca",
  linkedin: "https://www.linkedin.com/in/jihyun-kim-34ba30346/",
  headline: "Software, data, and the people who use them.",
  role: "AI Software Engineering Student",
  introduction:
    "I am a Software Engineering Technology – Artificial Intelligence student at Centennial College. I am developing my skills in web applications, relational databases, and requirements analysis, with an interest in fintech and user-centred products.",
  mission:
    "My goal is to turn user needs into clear, useful software and make information easier to understand and act on.",
  // User-supplied portrait; served directly from client/public/images.
  portrait: "/images/portrait.jpg",
  resume: "/documents/Jihyun_Kim_Resume.pdf",
  contactIntroduction:
    "I welcome conversations about co-op opportunities, student projects, and ways to contribute to web development, data, or business analysis.",
  // The licence year was confirmed by Jihyun; this is a South Korean qualification.
  dentalLicenceYear: "2022",
  coop: "Seeking a four-month co-op for January–April 2027.",
  aboutParagraphs: [
    "I am a Software Engineering Technology – Artificial Intelligence student at Centennial College in Toronto. I am developing my skills in web applications, SQL, and requirements analysis, with an interest in fintech and user-centred products.",
    "Before studying software engineering, I completed an Associate Degree in Dental Hygiene and obtained my South Korean dental hygienist licence in 2022. My education and customer-facing experience in Korea and the UK have taught me to listen carefully, pay attention to detail, and communicate clearly.",
    "I contributed to the frontend of Zipbob, an award-winning team project, and strengthened my database skills through Oracle SQL coursework. I am now learning to build interactive applications with React and looking for opportunities to connect user needs with practical software solutions.",
  ],
};

export const projects = [
  {
    id: "zipbob",
    title: "Zipbob",
    category: "Team project · October 2021",
    image: "/images/zipbob-cover.svg",
    imageAlt: "Illustrated overview of the Zipbob recipe recommendation project",
    imageCaption: "Project overview illustration — not an application screenshot.",
    description:
      "A five-person Multicampus project connecting agricultural product information and price predictions with recipe recommendations.",
    role:
      "Front-end team member. Contributed HTML5, CSS, and JavaScript interface work to a Django and SQLite-based application.",
    outcome:
      "Collaborated in a five-person team to deliver a recipe recommendation service. The team received the Multicampus Top Excellence Award.",
    technologies: ["HTML5", "CSS", "JavaScript", "Django", "SQLite"],
    link: "https://github.com/ginttone/Zipbob",
    linkLabel: "View team repository",
  },
  {
    id: "insurance-database",
    title: "Auto Insurance Database",
    category: "Academic coursework · COMP 122 · 2026",
    image: "/images/insurance-cover.svg",
    imageAlt: "Simplified illustration of vehicle, driver licence, and auto insurance tables",
    imageCaption: "Simplified project illustration based on the coursework table relationships.",
    description:
      "An Oracle SQL coursework project modelling vehicles, driver licences, and insurance policies in three related tables.",
    role:
      "Created the table definitions and applied primary keys, foreign keys, and CHECK constraints. Inserted sample data and documented SQL execution results.",
    outcome:
      "Produced three related tables with 12 sample records and documented constraints and execution results in SQL Developer.",
    technologies: ["Oracle SQL", "SQL Developer", "Data integrity"],
    link: "",
    linkLabel: "",
  },
  {
    id: "sql-queries",
    title: "SQL Queries & Record Maintenance",
    category: "Academic coursework · COMP 122 · 2026",
    image: "/images/queries-cover.svg",
    imageAlt: "Illustration of SELECT queries and INSERT, UPDATE, DELETE operations",
    imageCaption: "Learning-project illustration — not a screenshot of query results.",
    description:
      "Coursework using a provided JustLee bookstore database and a separate student table to practise queries and record maintenance.",
    role:
      "Wrote SELECT queries with aliases, DISTINCT, and filters. Created a student table and practised INSERT, UPDATE, and DELETE statements.",
    outcome:
      "Produced documented examples of data retrieval and record maintenance using the supplied bookstore database and a separate student table.",
    technologies: ["Oracle SQL", "SELECT", "CRUD"],
    link: "",
    linkLabel: "",
  },
];

export const education = [
  {
    id: "centennial",
    school: "Centennial College",
    qualification: "Advanced Diploma — Software Engineering Technology – Artificial Intelligence (Co-op)",
    dates: "September 2025 – Present",
    status: "In progress",
    description:
      "Expected graduation: December 2028. Coursework includes Database Concepts, Software Requirements Engineering, programming, Unix/Linux, and web application development.",
  },
  {
    id: "multicampus",
    school: "Multicampus",
    qualification: "Certificate — Big Data-Based Intelligent Service Development",
    dates: "May 2021 – October 2021",
    status: "Completed",
    description:
      "Completed 844 hours of K-Digital Training, including the Zipbob team project. The project team received the Top Excellence Award.",
  },
  {
    id: "hanyang",
    school: "Hanyang Women’s University",
    qualification: "Associate Degree — Dental Hygiene",
    dates: "March 2018 – February 2021",
    status: "Completed",
    description:
      "Healthcare education developed my attention to detail, professional communication, and documentation habits.",
  },
];

// These describe entry-level contributions, not a claim of senior paid expertise.
export const services = [
  { id: "web", number: "01", title: "Front-end web development", text: "Support the implementation of clear, responsive interfaces using HTML, CSS, and JavaScript. I am extending this foundation with React components and forms." },
  { id: "sql", number: "02", title: "SQL & database support", text: "Write basic SQL queries, work with related tables, and apply keys and constraints to support consistent data." },
  { id: "requirements", number: "03", title: "Requirements & documentation", text: "Help organise user needs, describe application behaviour, and document test steps and development decisions." },
];
