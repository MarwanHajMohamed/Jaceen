import "./footer.css";
import Logo from "../../assets/logo.jpg";

type Props = {};

export default function Footer({}: Props) {
  const currentYear: number = new Date().getFullYear();

  return (
    <div className="footer-container">
      <div className="top-side">
        <div className="footer-item-container">
          <div className="footer-item">
            <img src={Logo} alt="" />
            <div className="description">
              Jaceen is a natural supplement company based in London which
              emphasises the importance of excellence in health whilst aiming to
              help men and women of all ages achieve their wellbeing and fitness
              goals…
            </div>
          </div>
        </div>
        <div className="footer-item-container">
          <div className="footer-item">
            <div className="title">Help & Info</div>
            <div className="links">
              <a href="">FAQs</a>
              <a href="">Contact Us</a>
              <a href="">Shipping and Delivery</a>
            </div>
          </div>
        </div>
        <div className="footer-item-container">
          <div className="footer-item">
            <div className="title">About us</div>
            <div className="links">
              <a href="">About Us</a>
              <a href="">Privacy Policy</a>
              <a href="">Terms and Conditions</a>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-side">
        <div className="copyright">Jaceen &#169; {currentYear}</div>
      </div>
    </div>
  );
}
