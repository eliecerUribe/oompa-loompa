import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import Item from "../../components/Item";
import {
  fetchAll,
  fetchAllFailure,
  fetchAllSuccess,
} from "../../redux/actions";
import searchIcon from "../../images/ic_search.png";
import "./styles.scss";

const genders = {
  F: "Woman",
  M: "Man",
};

function Home({ data, loading, errors, getItems }) {
  useEffect(() => {
    getItems();
  }, [getItems]);

  if (loading) {
    return "It is loading...";
  }

  if (errors) {
    return "It was an error :(";
  }

  return (
    <div>
      <div className="search-input">
        <input placeholder="Search" />
        <div className="separator" />
        <img src={searchIcon} width={18} />
      </div>
      <div className="title">Find your Oompa Loompa</div>
      <div className="subtitle">There are more than 100k</div>
      <div className="items-container">
        {data.results?.length > 0
          ? data.results.map((item) => (
              <Item
                key={item.id}
                img={item.image}
                fullName={`${item.first_name} ${item.last_name}`}
                gender={genders[item.gender]}
                profession={item.profession}
              />
            ))
          : "No Oompa Loompas found"}
      </div>
    </div>
  );
}

Home.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.array.isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.string,
  getItems: PropTypes.func.isRequired,
};

Home.defaultProps = {
  data: {
    results: [],
    current: 0,
    total: 0,
  },
};

const mapStateToProps = (state) => {
  const { data, loading, errors } = state.items;
  return { data, loading, errors };
};

const mapDispatchToProps = (dispatch) => ({
  getItems: () => {
    dispatch(fetchAll());

    fetch(
      "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas"
    )
      .then((response) => response.json())
      .then((data) => dispatch(fetchAllSuccess(data)))
      .catch((error) => dispatch(fetchAllFailure(error)));
  },
});

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedComponent;
