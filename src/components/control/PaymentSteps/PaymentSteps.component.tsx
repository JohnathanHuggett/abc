import "./PaymentSteps.styles.scss";

interface PaymentStepsProps {
  children?: React.ReactNode;
}

export const PaymentSteps: React.FC<PaymentStepsProps> = ({ children }) => {
  return (
    <>
      <div className="pay-step">
        <div className="pay-step-headline">
          <div className="pay-step-indicator">1</div>
          <div className="pay-step-title">Payment Information</div>
          <button className="pay-step-edit">Edit</button>
        </div>

        <div className="pay-step-content">{children}</div>
      </div>
    </>
  );
};
