import { OfferFlowIllustration } from "./OfferFlowIllustration";

interface HeroSectionProps {
  onOpenPilotModal: (trigger: HTMLElement) => void;
}

export function HeroSection({ onOpenPilotModal }: HeroSectionProps) {
  return (
    <section id="home" className="section hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__intro">
          <h1 id="hero-heading" className="hero__headline">
            See which local creators bring customers to your till.
          </h1>
          <p className="hero__copy">
            Give a local creator a brief for your next offer. Customers claim it
            from the creator’s post, your team scans their personal token at the
            till, and you check the visits against the day’s takings before
            approving payment.
          </p>

          <div className="hero__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={(e) => onOpenPilotModal(e.currentTarget)}
            >
              Request a Pilot
            </button>
            <a href="#how-it-works" className="btn btn--secondary">
              See How It Works
            </a>
          </div>

          <div className="hero__pilot-note">
            <span className="hero__pilot-dot" aria-hidden="true" />
            <p>
              Founding pilot planned for April–May 2027 across Bexley, Dartford
              and neighbouring south-east London boroughs. Eight venues are
              planned.
            </p>
          </div>
        </div>

        <OfferFlowIllustration />
      </div>
    </section>
  );
}
