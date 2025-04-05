import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./richtexteditor.css";

interface Props {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const RichTextEditor = (props: Props) => {
  const handleChange = (value: string) => {
    props.setState(value);
  };

  return (
    <div className="editor-container">
      <ReactQuill
        className="quill"
        value={props.state}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
          ],
        }}
        theme="snow"
      />
    </div>
  );
};

export default RichTextEditor;
