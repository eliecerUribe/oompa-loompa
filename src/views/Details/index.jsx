import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genders } from "../../utils";
import "./styles.scss";

function Details({ activeItem }) {
  const navigate = useNavigate();
  const { first_name, last_name, gender, image, favorite, profession } =
    activeItem || {};
  const fullName = `${first_name} ${last_name}`;
  const description = favorite?.song;
  const formattedString = description?.replace(/\n/g, "<br>");

  useEffect(() => {
    if (!activeItem) {
      navigate("/");
    }
  }, [activeItem, navigate]);

  return (
    <div className="container">
      <img src={image} width={400} height={320} />
      <div className="item-description">
        <div className="fullName">{fullName}</div>
        <div className="info">{genders[gender]}</div>
        <div className="profession">{profession}</div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: formattedString }}
        />
      </div>
    </div>
  );
}

Details.propTypes = {
  activeItem: PropTypes.shape({
    fullName: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    gender: PropTypes.string,
    profession: PropTypes.string,
  }),
};

const stateToProps = (state) => ({
  activeItem: state.activeItem,
});

const ConnectedComponent = connect(stateToProps)(Details);

export default ConnectedComponent;
