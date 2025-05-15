import ReactMarkdown from "react-markdown";

export default function ExpandableMarkdown({
  title,
  sectionKey,
  content,
  expandedSection,
  toggleExpand,
}: {
  title: string;
  sectionKey: string;
  content: string;
  expandedSection: string;
  toggleExpand: (key: string) => void;
}) {
  const isExpanded = expandedSection === sectionKey;

  return (
    <div>
      <h4 onClick={() => toggleExpand(sectionKey)}>
        {title}
        <span className={`arrow ${isExpanded ? "rotate" : ""}`}>▼</span>
      </h4>

      <div className={`section ${isExpanded ? "expand" : "hide"}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <hr />
    </div>
  );
}
