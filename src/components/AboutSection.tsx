import { WHO_IT_IS_FOR } from "../data/siteContent";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function AboutSection() {
  const { ref, revealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="about"
      className={`section section--tinted reveal-section ${revealed ? "is-revealed" : ""}`}
      aria-labelledby="about-heading"
    >
      <div className="container">
        <p className="section__eyebrow">02 · About TillProof</p>
        <h2 id="about-heading" className="section__heading">
          Which of tonight’s bills came from the campaign?
        </h2>

        <div className="about-grid">
          <div>
            <p className="about-problem">
              A café pays a local creator to promote its lunch menu. The owner
              can see the post’s reach, but the till report alone cannot
              identify which customers came because of that post. TillProof is
              designed to link each claimed offer to a receipt so the owner can
              review campaign spend and cost per verified visit.
            </p>

            <h3 className="about-subhead">Who it is for</h3>
            <ul className="audience-list">
              {WHO_IT_IS_FOR.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="founder-card" aria-labelledby="founder-heading">
            <p className="founder-card__eyebrow">Founder</p>
            <h3 id="founder-heading" className="founder-card__name">
              Shivam Shivam, Founder
            </h3>
            <p className="founder-card__bio">
              Shivam Shivam is TillProof’s sole founder and is based in Bexley,
              south-east London. He holds an MSc in Management from BPP
              University. His experience includes managing shifts and counter
              promotions at McDonald’s, processing payments and balancing tills
              at Shell, and working delivery rounds for Domino’s. That
              experience shaped a practical part of TillProof: owners review
              campaign visits against the takings they already check at the end
              of a shift.
            </p>
            <p className="founder-card__bio">
              He speaks English, Punjabi and Hindi and leads product decisions,
              sales and operations under the public brand name TillProof.
            </p>

            <dl className="founder-facts">
              <div className="founder-facts__row">
                <dt>Base</dt>
                <dd>Bexley, south-east London</dd>
              </div>
              <div className="founder-facts__row">
                <dt>Languages</dt>
                <dd>English, Punjabi and Hindi</dd>
              </div>
              <div className="founder-facts__row">
                <dt>Public brand</dt>
                <dd>TillProof</dd>
              </div>
              <div className="founder-facts__row">
                <dt>Incorporation</dt>
                <dd>Planned for January 2027</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
