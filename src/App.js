import "./App.scss";

// Import Packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";

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
import ProfileUser from "./containers/ProfileUser";

// Import Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarkerAlt,
  faClock,
  faRss,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMapMarkerAlt, faClock, faRss, faStar);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userAccount, setUserAccount] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);

  // we store the token 7 days in the cookie

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
        `https://vinted-backend-luc.herokuapp.com/offers?priceMin=${fetchRangeValues[0]}&priceMax=${fetchRangeValues[1]}&title=${searchInput}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [searchInput, fetchRangeValues]);

  return isLoading ? (
    <Loader
      type="Oval"
      color="#21adb6"
      height={100}
      width={100}
      timeout={3000} //3 secs
      className="loader"
    />
  ) : (
    <Router>
      <Header
        userToken={userToken}
        setUser={setUser}
        setSearchInput={setSearchInput}
        setFetchRangeValues={setFetchRangeValues}
        fetchRangeValues={fetchRangeValues}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer userToken={userToken} />
        </Route>
        <Route path="/user/login">
          <Login setUser={setUser} setUserAccount={setUserAccount} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/user/publish">
          <Publish userToken={userToken} />
        </Route>
        <Route path="/user/">
          <ProfileUser
            userToken={userToken}
            setUser={setUser}
            userAccount={userAccount}
            data={data}
          />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Hero />
          <Home
            userToken={userToken}
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
