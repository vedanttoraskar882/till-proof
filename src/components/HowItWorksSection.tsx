import { WORKFLOW_STEPS } from "../data/siteContent";
import { useScrollReveal } from "../hooks/useScrollReveal";

function getActorClass(actor: string): string {
  if (actor === "Owner") return "actor-badge actor-badge--owner";
  if (actor === "Staff") return "actor-badge actor-badge--staff";
  return "actor-badge";
}

export function HowItWorksSection() {
  const { ref, revealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="how-it-works"
      className={`section section--tinted reveal-section ${revealed ? "is-revealed" : ""}`}
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        <p className="section__eyebrow">04 · How It Works</p>
        <h2 id="how-it-works-heading" className="section__heading">
          How a Tuesday offer reaches the till
        </h2>
        <p className="section__lead">
          Follow one restaurant’s quiet Tuesday evening offer from the initial
          brief to closing-time till approval, keeping owner, creator, customer
          and staff actions clear at every step.
        </p>

        <ol className="workflow-grid" style={{ listStyle: "none", padding: 0 }}>
          {WORKFLOW_STEPS.map((step) => (
            <li key={step.stepNumber} className="step-card">
              <div className="step-card__top">
                <span className="step-card__num">
                  Step {String(step.stepNumber).padStart(2, "0")}
                </span>
                <span className={getActorClass(step.actor)}>{step.actor}</span>
              </div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__desc">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
