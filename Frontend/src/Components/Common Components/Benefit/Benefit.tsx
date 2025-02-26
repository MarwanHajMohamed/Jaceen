import "./benefit.css";

interface Props {
  img: string;
  title: string;
  description: string;
}

export default function Benefit(props: Props) {
  return (
    <div className="benefit-container">
      <div className="left-side">
        <div className="image-container">
          <img src={props.img} alt="" />
        </div>
      </div>
      <div className="right-side">
        <div className="benefit-title">{props.title}</div>
        <div className="description">{props.description}</div>
      </div>
    </div>
  );
}
