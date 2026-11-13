import { usePortfolioData } from './hooks/usePortfolioData';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageLoader } from './components/Loading';
import { ErrorState } from './components/ErrorState';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Certifications } from './sections/Certifications';
import { Services } from './sections/Services';
import { Contact } from './sections/Contact';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'certifications',
  'services',
  'contact',
];

export default function App() {
  const {
    profile,
    skills,
    projects,
    experience,
    education,
    certifications,
    services,
    socialLinks,
    loading,
    error,
  } = usePortfolioData();

  const { theme, toggle } = useTheme();

  const activeSection = useActiveSection(SECTION_IDS);

  // Custom loading animation
  if (loading && !profile) {
    return <PageLoader />;
  }

  // Preserve the existing Google Sheets error screen
  if (error && !profile) {
    return (
      <div className="
        min-h-screen
        bg-[var(--bg-primary)]
        text-[var(--text-primary)]
        flex items-center justify-center
        p-6
      ">
        <ErrorState
          message={`Unable to connect to Google Sheets API: ${error}. Please verify network connectivity or Google Apps Script URL.`}
          retry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="
      min-h-screen
      bg-[var(--bg-primary)]
      text-[var(--text-primary)]
      transition-colors duration-300
      flex flex-col
      selection:bg-[var(--selection-bg)]
      selection:text-[var(--selection-color)]
    ">

      {/* Navigation Bar */}
      <Navbar
        profile={profile}
        theme={theme}
        onToggleTheme={toggle}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1">

        {/* Hero */}
        <Hero
          profile={profile}
          socialLinks={socialLinks}
          projectCount={projects.length}
        />

        {/* About */}
        <About profile={profile} />

        {/* Skills */}
        <Skills
          skills={skills}
          loading={loading}
        />

        {/* Projects */}
        <Projects
          projects={projects}
          loading={loading}
        />

        {/* Experience */}
        <Experience
          experience={experience}
          loading={loading}
        />

        {/* Education */}
        <Education
          education={education}
          loading={loading}
        />

        {/* Certifications */}
        <Certifications
          certifications={certifications}
          loading={loading}
        />

        {/* Services */}
        <Services
          services={services}
          loading={loading}
        />

        {/* Contact */}
        <Contact
          profile={profile}
          socialLinks={socialLinks}
        />

      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        socialLinks={socialLinks}
      />

    </div>
  );
}
