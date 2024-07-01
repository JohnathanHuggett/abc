import "./Heading.styles.scss";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  /*
   * The HTML tag to render the heading as.
   * @default "h1"
   */
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.FC<HeadingProps> = ({ children, tagName, className }) => {
  const Tag = tagName || "h1";

  return (
    <Tag className={`heading ${tagName ? `heading-${tagName}` : "heading-h1"} ${className ? className : ""}`}>
      {children}
    </Tag>
  );
};
