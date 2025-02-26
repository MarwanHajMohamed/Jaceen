import "./testimonial.css";

interface Props {
  author: string;
  description: string;
}

export default function Testimonial(props: Props) {
  return (
    <div className="testimonial-container">
      <i className="fa-solid fa-quote-left"></i>
      <div className="description">{props.description}</div>
      <div className="author">{props.author}</div>
    </div>
  );
}
