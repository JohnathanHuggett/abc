import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/icons/abc-logo.svg";

export const Success: React.FC = () => {
  return (
    <>
      <h1>Success Page</h1>

      <Link to="/">
        <Logo />
      </Link>
    </>
  );
};
