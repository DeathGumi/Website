import NameAnimation from '@/components/NameAnimation';
import ExperienceSection from '@/components/ExperienceSection';
import AboutSection from '@/components/AboutSection';

export default function Home() {
  return (
    <main>
      <NameAnimation />
      <AboutSection />
      <ExperienceSection />
    </main>
  );
}