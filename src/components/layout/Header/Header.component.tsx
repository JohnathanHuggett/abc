import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../../assets/icons/abc-logo.svg";

import "./Header.styles.scss";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/">
        <Logo />
      </Link>
    </header>
  );
};
