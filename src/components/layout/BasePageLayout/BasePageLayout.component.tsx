import { Header } from "../Header";
import { SkipLink } from "../SkipLink";

import "./BasePageLayout.styles.scss";

export const BasePageLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="base-layout-container">
      <SkipLink />
      <Header />

      <main id="main-content" className="base-layout-main">
        {children}
      </main>
    </div>
  );
};
