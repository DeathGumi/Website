import NameAnimation from '@/components/NameAnimation';
import ExperienceSection from '@/components/ExperienceSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <NameAnimation />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}