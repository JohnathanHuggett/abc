import { Link } from "react-router-dom";
import { Heading, BasePageLayout } from "../../components";

import "./Home.styles.scss";

export const HomePage: React.FC = () => {
  return (
    <BasePageLayout>
      <div className="intro">
        <Heading>Hi, Taylor</Heading>

        <p className="intro-description">
          You have 6 medical bills ready from ABC Health System. You can pay your bills here or verify your identity to
          view full bill details.
        </p>
      </div>

      <div className="cta-to-pay">
        <div className="cta-to-pay-cost">
          <div className="cta-to-pay-text">
            <span className="cta-to-pay-text-description">Total amount due:</span>
            <span className="heading-h1">$600.00</span>
          </div>
          <Link to="/pay" className="btn btn-primary">
            Pay total
          </Link>
        </div>
      </div>
    </BasePageLayout>
  );
};
