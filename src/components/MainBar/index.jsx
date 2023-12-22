import PropTypes from "prop-types";
import logo from "../../images/logo-umpa-loompa.png";
import "./styles.scss";

const MainBar = ({ title }) => (
  <div className="app-bar">
    <img src={logo} alt="" width="40px" />
    <div className="title">{title}</div>
  </div>
);

MainBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainBar;
