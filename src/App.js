import "./App.scss";

// Import Packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Import Components
import Header from "./components/Header";
import Hero from "./components/Hero";

// Import Containers
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
import UpdateUser from "./containers/UpdateUser";

function App() {
  const [userToken, setUserToken] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-backend-luc.herokuapp.com/offers?title=${searchInput}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [searchInput]);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <Router>
      <Header
        userToken={userToken}
        setUser={setUser}
        setSearchInput={setSearchInput}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer userToken={userToken} />
        </Route>
        <Route path="/user/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/user/publish">
          <Publish userToken={userToken} />
        </Route>
        <Route path="/user/update/">
          <UpdateUser userToken={userToken} />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Hero />
          <Home
            data={data}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
