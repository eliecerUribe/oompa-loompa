import PropTypes from "prop-types";
import MainBar from "../MainBar";

export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: "Roboto, sans-serif" }}>
      <MainBar title="Oompa Loompa's Crew" />
      <div>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
