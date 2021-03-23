import axios from "axios";
import { createHashHistory } from "history";

let login = async userData => {
  console.log({ userData });

  let user = await axios({
    method: "post",
    url: `http://tosafe.trendsgcc.com:3000/login`,
    data: userData,
    headers: {
      "content-type": `application/json`,
      'authorization': '62c0c6cacf66f3cdff5b34db8615ded4'
    }
  });

  return user;
};

let isAuth = () => {
  if (
    !localStorage.getItem("sacoAdmin") ||
    localStorage.getItem("sacoAdmin") == "null"
  ) {
    this.props.history.push("/login");
    // let history = createHashHistory()
    // history.push('/login');
  }
};

let authed = () => {
  if (
    localStorage.getItem("sacoAdmin") &&
    localStorage.getItem("sacoAdmin") != "null"
  ) {
    let history = createHashHistory();
    history.push("/dashboard");
  }
};

let logout = () => {
  localStorage.removeItem("sacoAdmin");

  let history = createHashHistory();
  history.push("/login");
  //redirect
  // this.props.history.push('/login')
};

export { login, logout, authed, isAuth };
