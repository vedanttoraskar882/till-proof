import { useCallback, useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { PlatformSection } from "./components/PlatformSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { FooterSection } from "./components/FooterSection";
import { PilotRequestModal } from "./components/PilotRequestModal";

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openerElement, setOpenerElement] = useState<HTMLElement | null>(null);

  const handleOpenPilotModal = useCallback((trigger: HTMLElement) => {
    setOpenerElement(trigger);
    setModalOpen(true);
  }, []);

  const handleClosePilotModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <div aria-hidden={modalOpen || undefined}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header onOpenPilotModal={handleOpenPilotModal} />

        <main id="main-content">
          <HeroSection onOpenPilotModal={handleOpenPilotModal} />
          <AboutSection />
          <PlatformSection />
          <HowItWorksSection />
          <PricingSection onOpenPilotModal={handleOpenPilotModal} />
          <FaqSection />
        </main>

        <FooterSection onOpenPilotModal={handleOpenPilotModal} />
      </div>

      <PilotRequestModal
        isOpen={modalOpen}
        openerElement={openerElement}
        onClose={handleClosePilotModal}
      />
    </>
  );
}

export default App;
