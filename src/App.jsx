import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import RoutesComponent from "./router/RoutesComponent";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <RoutesComponent />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
