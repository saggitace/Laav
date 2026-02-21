import { HybridNavigation } from '../components/HybridNavigation';
import { HybridHero } from '../components/HybridHero';
import { Services } from '../components/Services';
import { WhyUs } from '../components/WhyUs';
import { Mission } from '../components/Mission';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <HybridNavigation />
      <HybridHero />
      <Services />
      <WhyUs />
      <Mission />
      <Contact />
      <Footer />
    </div>
  );
}
