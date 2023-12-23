import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
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

function Home({ data, getItems }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    getItems(page);
  }, [getItems, page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 1500);
  };

  return (
    <div>
      <div className="search-input">
        <input placeholder="Search" />
        <div className="separator" />
        <img src={searchIcon} width={18} />
      </div>
      <div className="title">Find your Oompa Loompa</div>
      <div className="subtitle">There are more than 100k</div>
      <InfiniteScroll
        dataLength={data?.results?.length || 0}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>There is no more Oompa Loompas to list</h4>}
      >
        {data?.results?.map((item, index) => (
          <Item
            key={item.id + index}
            img={item.image}
            fullName={`${item.first_name} ${item.last_name}`}
            gender={genders[item.gender]}
            profession={item.profession}
          />
        ))}
      </InfiniteScroll>
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

const mapStateToProps = (state) => {
  const { data, loading, errors } = state.items;
  return { data, loading, errors };
};

const mapDispatchToProps = (dispatch) => ({
  getItems: (page) => {
    dispatch(fetchAll());

    fetch(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
    )
      .then((response) => response.json())
      .then((data) => dispatch(fetchAllSuccess(data)))
      .catch((error) =>
        dispatch(fetchAllFailure(error.message || "An error has occured"))
      );
  },
});

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedComponent;
