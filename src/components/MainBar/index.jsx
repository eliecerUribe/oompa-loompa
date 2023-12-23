import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../images/logo-umpa-loompa.png";
import "./styles.scss";

const MainBar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="app-bar">
      <div onClick={() => navigate(`/`)}>
        <img src={logo} alt="" width="40px" />
        <div className="title">{title}</div>
      </div>
    </div>
  );
};

MainBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainBar;
