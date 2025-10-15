import React, { useEffect, useRef, useState } from 'react';
import './styling/Dashboard.css';
import ThreeCardAnimator from './ThreeCardAnimator.tsx';

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  bullets?: string[];
};

const sampleProjects: Project[] = [
  {
    id: 'p1',
    title: 'Portfolio Website',
    description: 'A fast, accessible personal site built with React.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Three.js'],
    link: 'https://github.com/Jack1065?tab=repositories',
  },
  {
    id: 'p2',
    title: 'Neuro Drone',
    description: 'Full-stack drone management system with real-time data processing.',
    tech: ['Node', 'Express', 'Postgres', 'Python'],
    link: 'https://github.com/Jack1065?tab=repositories',
  },
  {
    id: 'p3',
    title: 'Biomarker Classification Model',
    description: 'ResNet-34 model to classify Glioblastoma biomarkers in MRI imaging.',
    tech: ['Python', 'TensorFlow', 'Keras'],
    link: 'https://github.com/Jack1065?tab=repositories',
  }
];

const education = [
  { school: 'University of Arizona', degree: 'Master of Science in Data Science', location: 'Tucson, AZ', date: 'Expected May 2027' },
  { school: 'University of Wisconsin-Whitewater', degree: 'Bachelor of Science in Computer Science', minor: 'Web Application Development', location: 'Whitewater, WI', date: 'May 2025', notes: 'Honors: Dean’s List (2021–2025), Glenn R. Davis Scholarship (2021); Cumulative GPA: 3.75' }
];

const technicalSkills = {
  languages: ['Python', 'C#', 'JavaScript', 'Java', 'PHP', 'C++', 'R', 'SQLite', 'TypeScript'],
  frameworks: ['Qlik', 'React', 'Vue.js', 'Node.js', 'Express.js', '.NET Core', 'Django', 'Laravel', 'Bootstrap', 'Tailwind CSS', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Keras', 'NumPy', 'Pandas'],
  tools: ['Jira', 'Jenkins', 'Snowflake', 'Linux', 'Azure', 'AWS', 'Docker', 'Postman', 'Power BI', 'Tableau', 'Apache Atlas', 'PostgreSQL', 'Microsoft SQL Server', 'Hadoop (HBase, Hive, Spark)', 'CI/CD Pipelines']
};

const sampleExperience: ExperienceItem[] = [
  {
    id: 'e-clinisys',
    role: 'Software Development Intern',
    company: 'Clinisys',
    location: 'Tucson, AZ',
    period: 'May 2025 – August 2025',
    description: 'Engineered features and optimizations for SaaS LIMS and LMS healthcare applications.',
    bullets: [
      'Engineered new features and services for SaaS LIMS and LMS healthcare applications, streamlining clinical workflows and enhancing data accessibility for national healthcare providers',
      'Optimized Power BI report load times, improving dashboard rendering speed across all platforms by 30%',
      'Developed new unit tests for .NET Core backend services, increasing code coverage by 20% and improving overall application reliability',
      'Built and optimized front-end features in React and Redux with TypeScript, ensuring adherence to Figma design specifications and enhancing overall user experience'
    ]
  },
  {
    id: 'e-rootriver',
    role: 'Software Engineer Intern',
    company: 'Root River Co-Work',
    location: 'Racine, WI',
    period: 'May 2023 – August 2024',
    description: 'Developed backend, optimized CI/CD, and improved website infrastructure.',
    bullets: [
      'Developed a robust CI/CD pipeline in Jenkins, reducing build times by 35% and accelerating deployment cycles',
      'Optimized PHP backend architecture, increasing website load speed by 15% and boosting SEO performance by 8%',
      'Facilitated the seamless transition to a new payment provider’s API, reducing payment processing time and decreasing transaction failures',
      'Tuned Microsoft SQL Server queries through execution plan analysis and query restructuring to improve reporting performance'
    ]
  },
  {
    id: 'e-recon',
    role: 'Project Manager',
    company: 'Recon Relocation',
    location: 'New Berlin, WI',
    period: 'May 2018 – August 2022',
    description: 'Led cross-functional teams and managed national project implementations.',
    bullets: [
      'Led cross-functional teams to coordinate commercial relocation projects, ensuring timely delivery and client satisfaction',
      'Managed project schedules, budgets, and resource allocation, increasing operational efficiency',
      'Implemented process improvements for logistics and communication, reducing project delays and enhancing team collaboration',
      'Served as primary client liaison, resolving issues and maintaining strong relationships to drive repeat business'
    ]
  }
];

const myPic = require('../MyPic.png');

export const Dashboard: React.FC = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 20);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = Array.from(document.querySelectorAll('.reveal')) as Element[];
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Observe experience items and mark the centered one
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.experience-item')) as HTMLElement[];
    if (!items.length) return;

    const centerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.intersectionRatio > 0.5) {
          el.classList.add('centered');
        } else {
          el.classList.remove('centered');
        }
      });
    }, {
      root: null,
      threshold: [0.5]
    });

    items.forEach(i => centerObserver.observe(i));
    return () => centerObserver.disconnect();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'backdrop-blur-sm py-2' : 'py-3'}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold"><img src={myPic} alt="Jack Kurtz" className="w-full h-full object-cover rounded-lg" /></div>
            <div>
              <h2 className="text-white text-lg font-semibold">Jack Kurtz</h2>
              <p className="text-slate-300 text-sm m-0">Software Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
          </div>
          <nav className="hidden md:flex gap-4">
            <a className="text-slate-200 hover:text-white" href="#projects">Projects</a>
            <a className="text-slate-200 hover:text-white" href="#education">Education</a>
            <a className="text-slate-200 hover:text-white" href="#skills">Skills</a>
            <a className="text-slate-200 hover:text-white" href="#experience">Experience</a>
            <a className="text-slate-200 hover:text-white" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

  <div className="min-h-screen bg-gradient-to-b from-brand-blue-900 via-brand-blue-800 to-brand-blue-700 pt-20 pb-10">
  <div className="max-w-6xl mx-auto px-4 dashboard-root">
          <main className="space-y-6">
            <section id="projects" className="reveal dashboard-section bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-white text-2xl mb-4">Projects</h2>
              {/* small screens: regular grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:hidden">
                {sampleProjects.map((p, i) => (
                  <article key={p.id} className="bg-white/6 border border-white/10 rounded-lg p-6 backdrop-blur-sm project-card">
                    <h4 className="text-white font-semibold">{p.title}</h4>
                    <p className="text-slate-200 text-sm mt-2">{p.description}</p>
                    <p className="text-slate-400 text-xs mt-3">{p.tech.join(' • ')}</p>
                    {p.link && <a className="inline-block mt-3 text-sky-300 hover:text-white" href={p.link}>View</a>}
                  </article>
                ))}
              </div>

              {/* md+ screens: horizontal marquee that loops (cards move left and wrap) */}
              <div className="marquee hidden md:block">
                <ThreeCardAnimator speed={40} />
                <div className="marquee-track">
                  {[...sampleProjects, ...sampleProjects].map((p, i) => (
                    <div key={`${p.id}-${i}`} className="marquee-item inline-block px-1">
                      <article className="bg-white/6 border border-white/10 rounded-lg p-6 backdrop-blur-sm project-card">
                        <h4 className="text-white font-semibold">{p.title}</h4>
                        <p className="text-slate-200 text-sm mt-2">{p.description}</p>
                        <p className="text-slate-400 text-xs mt-3">{p.tech.join(' • ')}</p>
                        {p.link && <a className="inline-block mt-3 text-sky-300 hover:text-white" href={p.link}>View</a>}
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="education" className="reveal dashboard-section bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-white text-2xl mb-4">Education</h2>
              <div className="education-timeline">
                <div className="timeline-line" />
                <ul className="timeline-list">
                  {education.map((ed, idx) => (
                    <li key={idx} className="timeline-item reveal edu-anim">
                      <div className="timeline-marker" aria-hidden="true" />
                      <div className="timeline-content bg-white/6 border border-white/10 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-white text-lg font-semibold">{ed.school}</h4>
                            <div className="text-slate-300 text-sm">{ed.degree}{ed.minor ? ` • Minor: ${ed.minor}` : ''}</div>
                            {ed.location && <div className="text-slate-400 text-xs mt-1">{ed.location}</div>}
                          </div>
                          <div className="text-slate-400 text-sm text-right">{ed.date}</div>
                        </div>
                        {ed.notes && <p className="text-slate-200 text-sm mt-3">{ed.notes}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="skills" className="reveal dashboard-section bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-white text-2xl mb-4">Technical Skills</h2>
              <div className="text-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold">Languages</h4>
                  <p className="text-slate-300 text-sm">{technicalSkills.languages.join(', ')}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Frameworks & Libraries</h4>
                  <p className="text-slate-300 text-sm">{technicalSkills.frameworks.join(', ')}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Tools & Platforms</h4>
                  <p className="text-slate-300 text-sm">{technicalSkills.tools.join(', ')}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Other</h4>
                  <p className="text-slate-300 text-sm">Big Data Analytics, ETL workflows, Agile Methodologies, Project Management, Web Design, SEO, PHI and HIPAA Compliance</p>
                </div>
              </div>
            </section>

            <section id="experience" className="reveal dashboard-section bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-white text-2xl mb-16 ">Experience</h2>
              {/* Make the experience column taller and show most recent first */}
              <div className="experience-column">
                <ul className="space-y-8">
                  {[...sampleExperience].map(e => (
                    <li key={e.id} className="bg-white/6 border border-white/10 rounded-lg p-6 experience-item">
                      <div className="experience-inner mb-8">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white text-lg font-semibold">{e.role}</h4>
                            <div className="text-slate-300 text-sm">{e.company}</div>
                          </div>
                          <div className="text-slate-400 text-sm">{e.period}</div>
                        </div>
                        <p className="text-slate-200 text-sm mt-3">{e.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="contact" className="reveal dashboard-section bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-white text-2xl mb-4">Contact</h2>
              <ul className="text-slate-200 space-y-2">
                <li>Email: <a className="text-sky-300" href="mailto:jkurtz354@gmail.com">jkurtz354@gmail.com</a></li>
                <li>Location: Tucson, Arizona</li>
                <li>GitHub: <a className="text-sky-300" href="https://github.com/Jack1065" target="_blank" rel="noreferrer">Jack1065</a></li>
              </ul>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
