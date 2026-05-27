type SectionHeadingProps = {
  tag: string;
  title: string;
  className?: string;
  accent?: boolean;
};

export default function SectionHeading({ tag, title, className = "", accent = false }: SectionHeadingProps) {
  return (
    <h2 className={`section-heading ${accent ? "section-heading--accent" : ""} ${className}`}>
      <span className="section-heading__open" aria-hidden="true">
        &lt;{tag}&gt;
      </span>
      {title}
      <span className="section-heading__close" aria-hidden="true">
        &lt;/{tag}&gt;
      </span>
    </h2>
  );
}
