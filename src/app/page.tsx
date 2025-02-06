import NameAnimation from '@/components/NameAnimation';
import ExperienceSection from '@/components/ExperienceSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ProjectSection from '@/components/ProjectSection';

export default function Home() {
  return (
    <main>
      <NameAnimation />
      <AboutSection />
      <ExperienceSection />
      <ProjectSection />
      <ContactSection />
    </main>
  );
}