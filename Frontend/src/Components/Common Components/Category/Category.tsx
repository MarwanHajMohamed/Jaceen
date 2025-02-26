import { NavigateFunction, useNavigate } from "react-router-dom";
import "./category.css";

interface Props {
  img: string;
  title: string;
}

export default function Category(props: Props) {
  const route: NavigateFunction = useNavigate();

  return (
    <div
      className="category-container"
      onClick={() => route(`/shop/${props.title}`)}
    >
      <img src={props.img} alt="" />
      <div className="category-title">{props.title}</div>
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  );
}
