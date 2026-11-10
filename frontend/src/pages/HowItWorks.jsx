
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HowItWorks.css';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Identify a Local Problem',
      description:
        'Notice an issue affecting your neighbourhood or community. It could be damaged roads, overflowing garbage, water leakage, poor street lighting, drainage problems or other civic concerns.',
      tag: 'Citizen Action'
    },
    {
      number: '02',
      title: 'Submit a Report',
      description:
        'Create an account and submit a report with the problem category, location and a clear description. Provide accurate information so others can understand the issue.',
      tag: 'Report Submission'
    },
    {
      number: '03',
      title: 'Community Verification',
      description:
        'Other citizens can view the submitted report and vote once to support it. Community participation helps highlight issues that deserve attention and discourages unsupported reports.',
      tag: 'Community Participation'
    },
    {
      number: '04',
      title: 'Administrative Review',
      description:
        'Administrators review submitted reports, consider community feedback and update their status as the issue moves through the resolution process.',
      tag: 'Administrative Action'
    },
    {
      number: '05',
      title: 'Track the Progress',
      description:
        'Citizens can revisit reports and monitor their status. Updates help everyone understand whether an issue is still pending, being addressed or has been resolved.',
      tag: 'Transparency'
    },
    {
      number: '06',
      title: 'Towards a Better Community',
      description:
        'As problems receive attention and are resolved, communities become safer, cleaner and better organised. Every genuine report contributes to this shared effort.',
      tag: 'Community Impact'
    }
  ];

  return (
    <div className="how-page">


{/* How It Works Navbar */}
<nav className="how-navbar">
  <div className="how-logo">
    Civic<span>Connect</span>
  </div>

  <Link to="/" className="how-home-link">
    ← Back to Home
  </Link>
</nav>


      {/* Hero Section */}
      <section className="how-hero">
        <span className="how-eyebrow">CIVICCONNECT | OUR PROCESS</span>

        <h1>
          From Reporting Problems
          <br />
          to Creating <span>Change.</span>
        </h1>

        <p>
          A platform that connects citizens, encourages community
          participation and brings visibility to local problems.
          Together, we can make our neighbourhoods better.
        </p>

        <a href="#reporting-process" className="how-hero-btn">
          Explore How It Works
        </a>
      </section>

      {/* Mission Section */}
      <section className="how-mission">
        <div className="mission-heading">
          <span>OUR PURPOSE</span>
          <h2>Why CivicConnect Exists</h2>
        </div>

        <div className="mission-content">
          <p>
            Local problems often go unnoticed because people do not
            know where to report them or how to bring them to the
            attention of the right authorities.
          </p>

          <p>
            CivicConnect aims to bridge this gap by providing a
            common platform where citizens can report local issues,
            support community reports and follow their progress.
          </p>

          <p>
            Our goal is to encourage responsible participation,
            improve transparency and make it easier for communities
            to raise concerns that affect their everyday lives.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="how-process" id="reporting-process">

        <div className="process-heading">
          <span>THE REPORTING JOURNEY</span>
          <h2>How a Problem Gets Reported and Addressed</h2>
          <p>
            Every meaningful change starts with someone identifying
            a problem and taking the initiative to report it.
          </p>
        </div>

        <div className="timeline">

          {steps.map((step) => (
            <div className="timeline-item" key={step.number}>

              <div className="timeline-marker">
                {step.number}
              </div>

              <div className="timeline-card">
                <span className="step-tag">{step.tag}</span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* Roles Section */}
      <section className="how-roles">

        <div className="roles-heading">
          <span>WORKING TOGETHER</span>
          <h2>Everyone Has a Role to Play</h2>
          <p>
            CivicConnect brings citizens and administrators
            together to make local problem reporting more effective.
          </p>
        </div>

        <div className="roles-grid">

          <div className="role-card">
            <div className="role-number">01</div>
            <h3>Citizens</h3>
            <p>
              Identify and report local problems, provide accurate
              information, support relevant reports and track
              the progress of issues in their community.
            </p>
          </div>

          <div className="role-card">
            <div className="role-number">02</div>
            <h3>Community</h3>
            <p>
              Participate by reviewing reported issues and voting
              to support reports. Collective participation helps
              bring important local concerns into focus.
            </p>
          </div>

          <div className="role-card">
            <div className="role-number">03</div>
            <h3>Administrators</h3>
            <p>
              Review reports, monitor community feedback, manage
              inappropriate submissions and update report statuses
              to keep citizens informed.
            </p>
          </div>

        </div>
      </section>

      {/* Impact Section */}
      <section className="how-impact">

        <div>
          <span>OUR VISION</span>
          <h2>Small Actions. Meaningful Change.</h2>
          <p>
            A damaged road, an overflowing drain or a broken
            streetlight may seem like a small issue until it affects
            an entire neighbourhood.
          </p>

          <p>
            We believe that citizens should have a simple way to
            raise these concerns and follow what happens next.
            CivicConnect is built around that belief.
          </p>
        </div>

        <div className="impact-highlight">
          <h3>A Better Community Begins With Participation.</h3>
          <p>
            See a problem? Do not ignore it. Report it, support
            your community and help bring attention to the issues
            that matter.
          </p>
        </div>

      </section>

      {/* Final CTA */}
      <section className="how-cta">
        <h2>Be the Reason Your Community Improves.</h2>
        <p>
          Every report is an opportunity to bring attention to
          a problem that deserves to be addressed.
        </p>

        <a href="/report" className="how-cta-btn">
          Report a Problem
        </a>
      </section>

    </div>
  );
}

export default HowItWorks;
