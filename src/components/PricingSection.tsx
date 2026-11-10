import { PRICING_PLANS } from "../data/siteContent";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface PricingSectionProps {
  onOpenPilotModal: (trigger: HTMLElement) => void;
}

export function PricingSection({ onOpenPilotModal }: PricingSectionProps) {
  const { ref, revealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="market-pricing"
      className={`section reveal-section ${revealed ? "is-revealed" : ""}`}
      aria-labelledby="pricing-heading"
    >
      <div className="container">
        <p className="section__eyebrow">05 · Market Pricing</p>
        <h2 id="pricing-heading" className="section__heading">
          What your venue pays
        </h2>
        <p className="section__lead">
          Your venue funds the creator payments agreed in each brief.
          TillProof’s standard fees have three parts: a monthly platform fee
          where applicable, a fee per verified cover, and a percentage of the
          creator payments you fund. All prices exclude VAT.
        </p>

        {/* Founding pilot terms placed before standard pricing plans */}
        <div
          className="pilot-terms-box"
          role="region"
          aria-label="Founding pilot terms"
        >
          <div>
            <p className="pilot-terms-box__badge">
              Founding pilot · April–May 2027
            </p>
            <p className="pilot-terms-box__copy">
              The eight planned pilot venues pay £0 in TillProof platform fees
              during the pilot. Venues still fund their agreed creator payments.
              The default is £25 per published post plus £4 per verified cover.
              Creators join free and receive their agreed earnings in full.
            </p>
          </div>
          <div className="pilot-terms-box__cta">
            <button
              type="button"
              className="btn btn--primary"
              onClick={(e) => onOpenPilotModal(e.currentTarget)}
            >
              Request a Pilot
            </button>
          </div>
        </div>

        {/* Shared PRICING_PLANS source rendered as desktop table & mobile stacked cards */}
        <div className="pricing-plans-wrap">
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <caption className="sr-only">
                TillProof standard venue plans, fees and planned billing dates
              </caption>
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Monthly platform fee</th>
                  <th scope="col">Platform fee per verified cover</th>
                  <th scope="col">Fee on venue-funded creator payments</th>
                  <th scope="col">Planned billing from</th>
                  <th scope="col">Included features</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_PLANS.map((plan) => (
                  <tr key={plan.id}>
                    <th scope="row" className="pricing-table__plan">
                      {plan.name}
                    </th>
                    <td className="pricing-table__mono">
                      {plan.monthlyPlatformFee}
                    </td>
                    <td className="pricing-table__mono">
                      {plan.feePerVerifiedCover}
                    </td>
                    <td className="pricing-table__mono">
                      {plan.feeOnCreatorPayments}
                    </td>
                    <td className="pricing-table__mono">
                      {plan.plannedBillingFrom}
                    </td>
                    <td>{plan.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pricing-cards" aria-label="Standard pricing plans">
            {PRICING_PLANS.map((plan) => (
              <article key={plan.id} className="pricing-card">
                <h3 className="pricing-card__name">{plan.name}</h3>
                <dl className="pricing-card__rows">
                  <div className="pricing-card__row">
                    <dt>Monthly platform fee</dt>
                    <dd>{plan.monthlyPlatformFee}</dd>
                  </div>
                  <div className="pricing-card__row">
                    <dt>Platform fee per verified cover</dt>
                    <dd>{plan.feePerVerifiedCover}</dd>
                  </div>
                  <div className="pricing-card__row">
                    <dt>Fee on venue-funded creator payments</dt>
                    <dd>{plan.feeOnCreatorPayments}</dd>
                  </div>
                  <div className="pricing-card__row">
                    <dt>Planned billing from</dt>
                    <dd>{plan.plannedBillingFrom}</dd>
                  </div>
                  <div className="pricing-card__row pricing-card__row--features">
                    <dt>Included features</dt>
                    <dd>{plan.features}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <p className="pricing-clarification">
          The percentage fee is charged to the venue on top of the creator’s
          agreed pay. It applies to content fees and per-cover creator earnings.
          The customer’s bill value is used for campaign reporting and is
          outside this fee calculation.
        </p>

        {/* Worked example itemised receipt */}
        <article
          className="worked-receipt"
          aria-labelledby="worked-example-heading"
        >
          <div className="worked-receipt__header">
            <span className="worked-receipt__label">Illustrative example</span>
            <h3 id="worked-example-heading" className="worked-receipt__title">
              Example month on Growth — one site, three posts, 30 verified covers
            </h3>
          </div>

          <div className="worked-receipt__groups">
            <div className="receipt-group">
              <h4 className="receipt-group__heading">
                1. Venue-funded creator payments (paid in full to creators)
              </h4>
              <ul className="receipt-lines">
                <li className="receipt-line">
                  <span>Creator content fees: 3 × £25</span>
                  <span className="receipt-line__amount">£75.00</span>
                </li>
                <li className="receipt-line">
                  <span>Creator cover earnings: 30 × £4</span>
                  <span className="receipt-line__amount">£120.00</span>
                </li>
              </ul>
              <div className="receipt-subtotal">
                <span>Total creator pay</span>
                <span>£195.00</span>
              </div>
            </div>

            <div className="receipt-group receipt-group--platform">
              <h4 className="receipt-group__heading">
                2. TillProof platform fees (Growth)
              </h4>
              <ul className="receipt-lines">
                <li className="receipt-line">
                  <span>Growth monthly fee</span>
                  <span className="receipt-line__amount">£59.00</span>
                </li>
                <li className="receipt-line">
                  <span>TillProof cover fees: 30 × £0.75</span>
                  <span className="receipt-line__amount">£22.50</span>
                </li>
                <li className="receipt-line">
                  <span>Fee on creator payments: 12% × £195</span>
                  <span className="receipt-line__amount">£23.40</span>
                </li>
              </ul>
              <div className="receipt-subtotal">
                <span>Total TillProof fees</span>
                <span>£104.90</span>
              </div>
            </div>
          </div>

          <div className="worked-receipt__total">
            <span className="worked-receipt__total-label">
              Total venue outlay
            </span>
            <span className="worked-receipt__total-amount">£299.90</span>
          </div>
          <p className="worked-receipt__footnote">
            Excluding VAT and the cost of fulfilling the offer.
          </p>
        </article>
      </div>
    </section>
  );
}
