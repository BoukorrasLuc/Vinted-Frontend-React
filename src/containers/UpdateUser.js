// Import Packages
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const UpdateUser = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-backend-luc.herokuapp.com/user/update/`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return userToken ? (
    <div className="background">Futur page profile </div>
  ) : (
    <Redirect to="/user/login" />
  );
};
export default UpdateUser;
