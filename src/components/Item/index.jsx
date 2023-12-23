import PropTypes from "prop-types";
import "./styles.scss";

const Item = ({ img, fullName, profession, gender, onClick }) => {
  return (
    <div className="item" onClick={onClick}>
      <img src={img} width={300} height={220} />
      <div className="fullName">{fullName}</div>
      <div className="info">{gender}</div>
      <div className="info">{profession}</div>
    </div>
  );
};

Item.propTypes = {
  img: PropTypes.string,
  fullName: PropTypes.string,
  profession: PropTypes.string,
  gender: PropTypes.string,
  onClick: PropTypes.func,
};
export default Item;
