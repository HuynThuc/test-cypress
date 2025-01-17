import { GlobalPresenceAndProjects } from './section/global-and-project';
import { InsightsSection } from './section/insight-section';
import { ServicesSection } from './section/services-section';
import { WelcomeSection } from './section/welcome-section';

export default function Home() {
  return (
    <div>
      <WelcomeSection />
      <ServicesSection />
      <GlobalPresenceAndProjects />
      <InsightsSection />
    </div>
  );
}
