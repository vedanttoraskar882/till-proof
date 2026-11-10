export function OfferFlowIllustration() {
  return (
    <figure
      className="offer-flow hero-animate hero-animate--4"
      aria-label="How a local offer moves from a creator’s post to a customer’s Visit Token and then to a till receipt"
    >
      <div className="offer-flow__header">
        <span className="offer-flow__title">
          From post to till — three separate artefacts
        </span>
        <span className="offer-flow__subtitle">
          Static illustrative flow · Not a live QR or receipt
        </span>
      </div>

      <div className="offer-flow__grid">
        {/* Artefact 1: Creator's post */}
        <div className="artefact-card">
          <div>
            <div className="artefact-card__tag">01 · Creator’s post</div>
            <div className="post-mock">
              <div className="post-mock__top">
                <span className="post-mock__handle">@local_creator</span>
                <span className="post-mock__disclosure">Ad · Local Brief</span>
              </div>
              <div className="post-mock__frame">
                <div className="post-mock__offer-title">
                  Quiet Tuesday Evening Offer
                </div>
                <div className="post-mock__offer-meta">
                  Illustrative offer terms shown before claim
                </div>
              </div>
              <div className="post-mock__link-strip">
                <span className="post-mock__link-text">
                  Public campaign link / QR
                </span>
                <div className="schematic-badge" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
          <p className="artefact-card__caption">
            The public campaign link or QR code opens the offer.
          </p>
        </div>

        <div className="flow-connector" aria-hidden="true">
          <svg
            className="flow-connector__arrow--mobile"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 4V16M10 16L5.5 11.5M10 16L14.5 11.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="flow-connector__arrow--desktop"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4 10H16M16 10L11.5 5.5M16 10L11.5 14.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Artefact 2: Customer's Visit Token */}
        <div className="artefact-card artefact-card--token">
          <div>
            <div className="artefact-card__tag">02 · Customer’s Visit Token</div>
            <div className="token-mock">
              <div className="token-mock__head">
                <span>Claim Page</span>
                <span>Single-use</span>
              </div>
              <div className="token-mock__code-box">
                <div>
                  <span className="token-mock__code-label">
                    Personal Visit Token
                  </span>
                  <span className="token-mock__code-sub">
                    Short backup code · Illustrative
                  </span>
                </div>
                <span className="token-mock__seal" aria-hidden="true">
                  1×
                </span>
              </div>
              <div className="token-mock__rules">
                <span>Validity: Brief offer hours</span>
                <span>Daily cap: Enforced on claim</span>
              </div>
            </div>
          </div>
          <p className="artefact-card__caption">
            The customer claims a personal, single-use code.
          </p>
        </div>

        <div className="flow-connector" aria-hidden="true">
          <svg
            className="flow-connector__arrow--mobile"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 4V16M10 16L5.5 11.5M10 16L14.5 11.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="flow-connector__arrow--desktop"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4 10H16M16 10L11.5 5.5M16 10L11.5 14.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Artefact 3: Till receipt */}
        <div className="artefact-card artefact-card--receipt">
          <div>
            <div className="artefact-card__tag">03 · Till receipt</div>
            <div className="receipt-mock">
              <div className="receipt-mock__top">
                <div className="receipt-mock__title">TILLPROOF · TILLTAP</div>
                <div className="receipt-mock__sub">
                  Static illustrative receipt
                </div>
              </div>
              <div className="receipt-mock__rows">
                <div className="receipt-mock__row">
                  <span>Personal code</span>
                  <strong>Scanned</strong>
                </div>
                <div className="receipt-mock__row">
                  <span>Receipt number</span>
                  <strong>Entered</strong>
                </div>
                <div className="receipt-mock__row">
                  <span>Bill total</span>
                  <strong>Recorded</strong>
                </div>
              </div>
              <div className="receipt-mock__footer">
                <span>End of shift</span>
                <span>Owner checks takings</span>
              </div>
            </div>
          </div>
          <p className="artefact-card__caption">
            Staff scan the personal code and record the receipt number and bill
            total.
          </p>
        </div>
      </div>
    </figure>
  );
}
