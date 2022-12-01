import "../styles/Footer.scss";

const Footer = (props) => {
  return (
    <footer class="footer">
      <nav>
        <ul>
          <li class="footer__menu-item">
            <a class="footer__menu-link" href="#/">
              A jugar
            </a>
          </li>
          <li class="footer__menu-item">
            <a class="footer__menu-link active" href="#/instructions">
              ¿Cómo se juega?
            </a>
          </li>
          <li class="footer__menu-item">
            <a class="footer__menu-link" href="#/options">
              Más opciones
            </a>
          </li>
        </ul>
      </nav>
      <small class="footer__copy">© Adalab</small>
    </footer>
  );
};

export default Footer;
