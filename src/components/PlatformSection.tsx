import { PLATFORM_MODULES } from "../data/siteContent";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function PlatformSection() {
  const { ref, revealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="platform"
      className={`section reveal-section ${revealed ? "is-revealed" : ""}`}
      aria-labelledby="platform-heading"
    >
      <div className="container">
        <p className="section__eyebrow">03 · Platform</p>
        <h2 id="platform-heading" className="section__heading">
          From a local brief to an approved till receipt
        </h2>
        <p className="section__lead">
          Each module has a stated planned release window so you can see what is
          included in the founding pilot and what arrives in later updates.
        </p>

        <div className="release-legend" aria-label="Availability key">
          <span className="legend-item">
            <span className="pill pill--pilot">Founding pilot</span>
            <span>April–May 2027</span>
          </span>
          <span className="legend-item">
            <span className="pill pill--later">Later releases</span>
            <span>July 2027 – July 2029</span>
          </span>
        </div>

        <div className="platform-grid">
          {PLATFORM_MODULES.map((mod) => (
            <article key={mod.id} className="module-card">
              <div>
                <h3 className="module-card__title">{mod.name}</h3>
                <p className="module-card__desc">{mod.description}</p>
              </div>

              <div className="module-card__availability">
                <div className="availability-line">
                  <span className="pill pill--pilot">Founding pilot</span>
                  <span>{mod.pilotRelease}</span>
                </div>
                {mod.laterReleases && (
                  <div className="availability-line">
                    <span className="pill pill--later">Later releases</span>
                    <span>{mod.laterReleases}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
