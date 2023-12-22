import searchIcon from "../../images/ic_search.png";
import "./styles.scss";

export default function Home() {
  return (
    <div>
      <div className="search-input">
        <input placeholder="Search" />
        <div className="separator" />
        <img src={searchIcon} width={18} />
      </div>
      <div className="title">Find your Oompa Loompa</div>
      <div className="subtitle">There are more than 100k</div>
    </div>
  );
}
