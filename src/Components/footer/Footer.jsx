import "./footer.css";
import { IoIosMailOpen, IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import A from "../../assets/A.JPG";

function Footer() {
  return (
    <div>
      <section className="carte" id="footer">
        <footer>
          <img src={A} alt="" />
          <p>&copy; 2026 Abombidus. Tous droits réservés.</p>
          <h3>Contacter Moi</h3>
          <div className="links">
            <a className="mail" href="mailto:abombidus@gmail.com">
              <IoIosMailOpen />
            </a>
            <a className="twitter" href="#">
              <FaSquareXTwitter />
            </a>
            <a className="facebook" href="https://facebook.com/Mario.Abo.2025">
              <FaFacebook />
            </a>
            <a className="whatsapp" href="https://wa.me/237695833316">
              <IoLogoWhatsapp />
            </a>
            <a className="github" href="https://github.com/abombidus">
              <FaGithub />
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Footer;
