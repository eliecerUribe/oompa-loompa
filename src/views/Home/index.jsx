import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
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
  const ref = useRef(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (ref.current || page > 1) {
      getItems(page);
      ref.current = false;
    }
  }, [getItems, page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 1500);
  };

  const getFilteredItems = () => {
    const val = filter?.toLowerCase();

    if (val) {
      return data.results.filter(
        (item) =>
          item.first_name.toLowerCase().includes(filter.toLowerCase()) ||
          item.last_name.toLowerCase().includes(filter.toLowerCase()) ||
          item.profession.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return data.results;
    }
  };

  const filteredItems = getFilteredItems();

  const onChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div className="search-input">
        <input placeholder="Search" onChange={onChange} />
        <div className="separator" />
        <img src={searchIcon} width={18} />
      </div>
      <div className="title">Find your Oompa Loompa</div>
      <div className="subtitle">There are more than 100k</div>
      <InfiniteScroll
        dataLength={filteredItems?.length || 0}
        next={fetchMoreData}
        hasMore={!!filteredItems?.length}
        loader={<div className="loading">Loading...</div>}
      >
        {filteredItems?.length > 0 ? (
          filteredItems.map((item, index) => (
            <Item
              key={item.id + index}
              img={item.image}
              fullName={`${item.first_name} ${item.last_name}`}
              gender={genders[item.gender]}
              profession={item.profession}
            />
          ))
        ) : (
          <h4>There is no match</h4>
        )}
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
