import PropTypes from "prop-types";
import { connect } from "react-redux";
import { genders } from "../../utils";
import "./styles.scss";

function Details({ fullName, description, image, gender, profession }) {
  const formattedString = description.replace(/\n/g, "<br>");

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
  fullName: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  gender: PropTypes.string,
  profession: PropTypes.string,
};

const stateToProps = (state) => {
  const { first_name, last_name, gender, image, favorite, profession } =
    state.activeItem;
  const fullName = `${first_name} ${last_name}`;
  const description = favorite.song;

  return { fullName, description, image, gender, profession };
};

const ConnectedComponent = connect(stateToProps)(Details);

export default ConnectedComponent;
