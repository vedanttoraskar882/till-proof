import { NAV_LINKS } from "../data/siteContent";

interface FooterSectionProps {
  onOpenPilotModal: (trigger: HTMLElement) => void;
}

export function FooterSection({ onOpenPilotModal }: FooterSectionProps) {
  return (
    <footer id="footer" className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <a href="#home" className="wordmark">
              <span className="wordmark__badge" aria-hidden="true" />
              <span>TillProof</span>
            </a>
            <p className="site-footer__desc">
              Creator marketing measured through customer visits verified at the
              till.
            </p>
            <p className="site-footer__location">Bexley, London, UK</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="site-footer__nav-title">Sections</p>
            <ul className="site-footer__links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <button
              type="button"
              className="btn btn--on-dark"
              onClick={(e) => onOpenPilotModal(e.currentTarget)}
            >
              Request a Pilot
            </button>
          </div>
        </div>

        <div className="site-footer__bottom">
          TillProof · Founding pilot planned for April–May 2027 · Incorporation
          planned for January 2027
        </div>
      </div>
    </footer>
  );
}
