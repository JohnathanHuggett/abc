import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/icons/abc-logo.svg";

export const HomePage: React.FC = () => {
  return (
    <>
      <h1>Home Page</h1>

      <Link to="/">
        <Logo />
      </Link>
    </>
  );
};
