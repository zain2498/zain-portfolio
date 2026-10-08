import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const nav = ['Home','About','Experience','Skills','Projects','Education','Contact'];

const experience = [
  {
    date: '2021 — Present',
    company: 'Sibisoft',
    role: 'Backend Java Engineer',
    type: 'Full-time',
    summary: 'Building backend systems for banking, fintech and payment products, with a focus on reliable transaction processing and integration-heavy enterprise workflows.',
    bullets: [
      'Develop backend services with Java, Spring Boot, Hibernate/JPA and REST APIs.',
      'Work on payment and POS integrations, webhooks, transaction flows and production issue resolution.',
      'Contribute to event-driven architectures using Apache Kafka and microservice patterns.',
      'Work with MySQL/PostgreSQL, SQL queries, database triggers and transaction-level debugging.',
      'Collaborate across development, QA, UAT and deployment environments to deliver production features.'
    ],
    stack: ['Java','Spring Boot','Microservices','REST APIs','Kafka','MySQL','Hibernate']
  },
  {
    date: '2021',
    company: 'Systems Limited',
    role: 'Management Trainee Officer',
    type: 'Early Career',
    summary: 'Started my professional software engineering career in an enterprise technology environment and built the foundation for my backend engineering path.',
    bullets: [
      'Worked on enterprise software development and engineering practices.',
      'Strengthened Java, SQL, application development and team collaboration skills.',
      'Transitioned into backend-focused engineering and production software delivery.'
    ],
    stack: ['Java','SQL','Enterprise Software','Git']
  }
];

const projects = [
  {
    number:'01', category:'FinTech / Backend', title:'Real-Time Fraud Detection Platform',
    text:'An event-driven fraud detection platform designed around Spring Boot microservices and Apache Kafka. The system constructs transaction data, publishes events and consumes them through a fraud detection service for near-real-time processing.',
    highlights:['Transaction ingestion API','Kafka producer / consumer flow','Fraud detection service','MySQL persistence','Microservice architecture'],
    stack:['Java','Spring Boot','Apache Kafka','MySQL','Docker','REST APIs']
  },
  {
    number:'02', category:'Research / AI', title:'Federated Learning for Credit Card Fraud Detection',
    text:'Master’s thesis research comparing flat and hierarchical federated learning for credit-card fraud detection under IID and Non-IID data distributions, with an emphasis on edge computing and communication efficiency.',
    highlights:['Flat FL vs Hierarchical FL','IID vs Non-IID experiments','FedAvg / FedProx','Edge aggregation','Recall, F1 and ROC-AUC evaluation'],
    stack:['Federated Learning','Python','Machine Learning','Edge Computing','Fraud Detection']
  },
  {
    number:'03', category:'Payments / POS', title:'Ezidebit Omni POS Integration',
    text:'Backend work in a payment ecosystem involving POS integrations, transaction workflows, webhooks and surcharge-related functionality for Australian payment use cases.',
    highlights:['POS payment workflows','Webhook handling','Payment surcharge logic','API integration','UAT / production troubleshooting'],
    stack:['Java','Spring','REST APIs','Webhooks','Payments','POS']
  },
  {
    number:'04', category:'Banking', title:'Customer Onboarding Application',
    text:'Contributed to backend engineering for a banking customer onboarding application, supporting enterprise workflows and integrations within a regulated financial-services environment.',
    highlights:['Banking workflows','Backend APIs','Database integration','Enterprise application development'],
    stack:['Java','Spring','REST APIs','SQL','Banking']
  },
  {
    number:'05', category:'Banking / Mobile', title:'Silk Bank Mobile Application',
    text:'Worked within the engineering ecosystem supporting a banking mobile application, contributing to backend services and integration work required by financial application flows.',
    highlights:['Mobile banking backend','API integration','Transaction workflows','Enterprise systems'],
    stack:['Java','Spring','REST APIs','SQL','Banking']
  }
];

const skillGroups = [
  ['Backend Engineering',['Java','Spring Boot','Spring MVC','Hibernate / JPA','REST APIs','Microservices']],
  ['Messaging & Distributed Systems',['Apache Kafka','Event-Driven Architecture','Webhooks','Async Processing','Transaction Processing']],
  ['Databases',['MySQL','PostgreSQL','SQL','Database Design','Triggers','JDBC']],
  ['Testing & Build',['JUnit 5','Mockito','Maven','Gradle','CI/CD','Ant']],
  ['Cloud & DevOps',['AWS','Docker','Tomcat','Git','Postman','Linux / CLI']],
  ['Frontend & Supporting Tools',['React JS','Cypress','VS Code','IntelliJ IDEA','Android Studio','Kony Visualizer']],
  ['FinTech Domain',['Payment Systems','POS Integrations','Banking Applications','Fraud Detection','Transaction Workflows']],
  ['Research & AI',['Federated Learning','Edge Computing','FedAvg','FedProx','SMOTE / ADASYN','ML Evaluation']]
];

const education = [
  {year:'2026', title:'Master’s in Software Engineering', school:'FAST — National University of Computer and Emerging Sciences, Karachi', detail:'CGPA 3.52 · Thesis: Federated Learning for Fraud Detection in Credit Card Transactions using Edge Computing'},
  {year:'2021', title:'Bachelor’s Degree', school:'Completed in 2021', detail:'Foundation in software engineering, programming and computer science.'}
];

const achievements = [
  ['5+','Years','Professional software engineering experience'],
  ['2026','MS','Master’s in Software Engineering completed'],
  ['FinTech','Domain','Banking, payments and POS engineering'],
  ['Research','Focus','Federated learning & fraud detection']
];

function Icon({name,size=20}) {
  const p={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.8',strokeLinecap:'round',strokeLinejoin:'round'};
  const paths={
    arrow:<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    github:<><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 4 5.1 5.1 0 0 0 19.2.5S17.9.1 15 2a13.4 13.4 0 0 0-6 0C6.1.1 4.8.5 4.8.5A5.1 5.1 0 0 0 4.7 4a5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 18c-4.5 2-5-2-7-2"/></>,
    linkedin:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    pin:<><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    external:<><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
    menu:<><path d="M4 6h16M4 12h16M4 18h16"/></>,
    close:<><path d="m6 6 12 12M18 6 6 18"/></>,
    check:<><path d="m5 12 4 4L19 6"/></>,
    download:<><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    code:<><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></>,
    layers:<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>,
    briefcase:<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
    graduation:<><path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6"/></>,
    star:<><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></>,
  };
  return <svg {...p}>{paths[name]}</svg>;
}

function App(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [active,setActive]=useState('Home');
  const [sent,setSent]=useState(false);

  useEffect(()=>{
    const onScroll=()=>{
      const y=window.scrollY+160;
      let current='Home';
      nav.forEach(n=>{const el=document.getElementById(n.toLowerCase()); if(el && y>=el.offsetTop) current=n;});
      setActive(current);
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);

  const go=(id)=>{document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:'smooth'});setMenuOpen(false)};

  return <div className="app">
    <header className="header">
      <nav className="nav shell">
        <button className="logo" onClick={()=>go('Home')}><span>ZB</span> Zain Badaruddin</button>
        <div className={`navlinks ${menuOpen?'open':''}`}>{nav.map(n=><button className={active===n?'active':''} key={n} onClick={()=>go(n)}>{n}</button>)}</div>
        <button className="menubtn" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu"><Icon name={menuOpen?'close':'menu'}/></button>
      </nav>
    </header>

    <main>
      <section id="home" className="hero shell">
        <div className="hero-grid">
          <div className="hero-main reveal">
            <div className="pill"><span className="pulse"/> Backend Java Engineer · FinTech</div>
            <h1>Building backend systems that <em>move money</em> reliably.</h1>
            <p className="hero-lead">I’m Zain Badaruddin, a Backend Java Engineer focused on payment systems, banking applications, microservices and event-driven architecture.</p>
            <div className="hero-actions"><button className="btn primary" onClick={()=>go('Projects')}>Explore my work <Icon name="arrow" size={18}/></button><button className="btn ghost" onClick={()=>go('Contact')}>Let’s connect</button></div>
            <div className="socials"><a href="https://github.com/" target="_blank" rel="noreferrer"><Icon name="github" size={17}/> GitHub</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Icon name="linkedin" size={17}/> LinkedIn</a><a href="mailto:zainbadar24@gmail.com"><Icon name="mail" size={17}/> Email</a></div>
          </div>
          <aside className="hero-card reveal delay">
            <div className="card-label">ENGINEER PROFILE</div>
            <div className="profile-mark">ZB</div>
            <h3>Backend · Payments · Distributed Systems</h3>
            <p>Java-first engineering with experience across enterprise banking, fintech integrations, POS systems and fraud detection research.</p>
            <div className="mini-list"><div><b>5+</b><span>Years experience</span></div><div><b>MS</b><span>Software Engineering</span></div><div><b>Karachi</b><span>Pakistan</span></div></div>
          </aside>
        </div>
        <div className="scroll-hint">SCROLL TO EXPLORE <Icon name="arrow" size={16}/></div>
      </section>

      <section className="stats shell">{achievements.map(([big,label,desc])=><div className="stat" key={label}><strong>{big}</strong><span>{label}</span><p>{desc}</p></div>)}</section>

      <section id="about" className="section shell">
        <div className="section-intro"><span className="index">01</span><div><div className="overline">ABOUT ME</div><h2>Backend engineering, shaped by real financial systems.</h2></div></div>
        <div className="about-grid"><div className="about-lead"><p>I’m a software engineer who enjoys working where <strong>business-critical workflows meet backend engineering</strong>. My professional experience has been centered on Java, Spring and enterprise systems, with a strong focus on payments and financial technology.</p><p>Over the course of my career, I’ve worked on payment and POS integrations, banking applications, APIs, webhooks, transaction processing and production troubleshooting. Alongside industry work, my Master’s research took me deeper into <strong>fraud detection, federated learning and edge computing</strong>.</p></div><div className="about-points"><div><span>01</span><p>Design APIs and services that are maintainable and production-ready.</p></div><div><span>02</span><p>Understand transaction flows beyond the code — from integration to database and UAT.</p></div><div><span>03</span><p>Keep learning through hands-on systems, research and independent engineering projects.</p></div></div></div>
      </section>

      <section id="experience" className="section dark-section">
        <div className="shell"><div className="section-intro light"><span className="index">02</span><div><div className="overline">CAREER</div><h2>Professional experience</h2></div></div>
        <div className="experience-list">{experience.map((e,i)=><article className="experience" key={e.company}><div className="exp-date">{e.date}</div><div className="exp-body"><div className="exp-heading"><div><span className="role-tag">{e.type}</span><h3>{e.role}</h3><h4>{e.company}</h4></div><span className="exp-number">0{i+1}</span></div><p className="exp-summary">{e.summary}</p><ul>{e.bullets.map(b=><li key={b}><Icon name="check" size={15}/>{b}</li>)}</ul><div className="tags">{e.stack.map(s=><span key={s}>{s}</span>)}</div></div></article>)}</div></div>
      </section>

      <section id="skills" className="section shell">
        <div className="section-intro"><span className="index">03</span><div><div className="overline">TECHNICAL SKILLS</div><h2>The stack behind my work.</h2></div></div>
        <div className="skill-grid">{skillGroups.map(([title,items],i)=><article className="skill-group" key={title}><div className="skill-top"><span>0{i+1}</span><Icon name={i<2?'layers':i<4?'code':'star'} size={20}/></div><h3>{title}</h3><div className="skill-tags">{items.map(s=><span key={s}>{s}</span>)}</div></article>)}</div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="shell"><div className="section-intro"><span className="index">04</span><div><div className="overline">SELECTED WORK</div><h2>Projects that tell the story.</h2></div></div><p className="section-note">A mix of production-oriented engineering and research work — with a common theme: building systems that handle real-world complexity.</p>
        <div className="project-list">{projects.map(p=><article className="project" key={p.number}><div className="project-num">{p.number}</div><div className="project-content"><div className="project-category">{p.category}</div><h3>{p.title}</h3><p>{p.text}</p><div className="project-highlights">{p.highlights.map(h=><span key={h}><Icon name="check" size={14}/>{h}</span>)}</div><div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div></div><div className="project-arrow"><Icon name="arrow" size={22}/></div></article>)}</div></div>
      </section>

      <section id="education" className="section shell education-section">
        <div className="section-intro"><span className="index">05</span><div><div className="overline">EDUCATION & MILESTONES</div><h2>Learning never stopped at graduation.</h2></div></div>
        <div className="edu-grid"><div className="education-list">{education.map(e=><article className="edu" key={e.title}><span className="edu-year">{e.year}</span><div><h3>{e.title}</h3><h4>{e.school}</h4><p>{e.detail}</p></div></article>)}</div><aside className="milestone-card"><Icon name="star" size={26}/><div className="overline">RECOGNITION</div><h3>Rising & Shining Star Award</h3><p>Recognized in 2021 for contribution and performance early in my professional journey.</p><strong>2021</strong></aside></div>
      </section>

      <section id="contact" className="contact-section">
        <div className="shell contact-grid"><div><span className="index light-index">06</span><div className="overline light-text">CONTACT</div><h2>Let’s build something dependable.</h2><p>Whether it’s a backend role, fintech product, payment integration or an interesting engineering problem, I’d be happy to connect.</p><div className="contact-links"><a href="mailto:zainbadar24@gmail.com"><Icon name="mail"/> zainbadar24@gmail.com</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Icon name="linkedin"/> LinkedIn</a><span><Icon name="pin"/> Karachi, Pakistan</span></div></div><form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Name<input required placeholder="Your name"/></label><label>Email<input required type="email" placeholder="you@example.com"/></label><label>Message<textarea required rows="5" placeholder="Tell me what you’re working on..."/></label><button className="btn primary" type="submit">{sent?<><Icon name="check"/> Message captured</>:<>Send message <Icon name="arrow"/></>}</button>{sent&&<small>This demo form is ready to connect to Formspree, Resend or your own backend API.</small>}</form></div>
      </section>
    </main>
    <footer><div className="shell footer"><span>© 2026 Zain Badaruddin</span><span>Backend Java Engineer · FinTech · Payments</span></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
