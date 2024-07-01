import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/icons/abc-logo.svg";

export const Pay: React.FC = () => {
  return (
    <>
      <h1>Pay Page</h1>

      <Link to="/">
        <Logo />
      </Link>
    </>
  );
};
