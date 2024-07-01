import "./PaymentSteps.styles.scss";

interface PaymentStepsProps {
  children?: React.ReactNode;
  isExpanded?: boolean;
  setExpanded?: () => void;
}

export const PaymentSteps: React.FC<PaymentStepsProps> = ({ children, isExpanded, setExpanded }) => {
  return (
    <>
      <div className="pay-step">
        <div className="pay-step-headline">
          <div className="pay-step-indicator">1</div>
          <div className="pay-step-title">Payment Information</div>
          {!isExpanded ? (
            <button className="pay-step-edit" onClick={setExpanded ? setExpanded : undefined}>
              Edit
            </button>
          ) : null}
        </div>

        {isExpanded && <div className="pay-step-content">{children}</div>}
      </div>
    </>
  );
};
