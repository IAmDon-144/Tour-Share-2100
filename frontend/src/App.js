import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";



import Home from "./containers/Home";

import About from "./apicontainers/About";
import PostDetails from "./apicontainers/PostDetails";
import NewPost from "./apicontainers/NewPost";
import ConfirmDelete from "./apicontainers/ConfirmDelete";
import UpdatePost from "./apicontainers/UpdatePost";
import ApiCollection from "./apicontainers/ApiCollection";
import Settings from "./apicontainers/Settings";



import Login from "./containers/Login";
import Activate from "./containers/Activate";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";
import Profile from "./containers/Profile";
import MyProfile from "./containers/MyProfile";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Layout from "./hocs/Layout";



import store from "./store";
import { Provider } from "react-redux";


function App() {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("#7ee40f");
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <LoadingBar
            color={color}
            progress={progress}
            shadow={true}
            height={3}
            onLoaderFinished={() => setProgress(0)}
          />
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home setProgress={setProgress} setColor={setColor} />
              </Route>

              <Route exact path="/about">
                <About setProgress={setProgress} setColor={setColor} />
              </Route>

              <Route exact path="/settings">
                <Settings setProgress={setProgress} setColor={setColor} />
              </Route>
              <Route exact path="/create" component={NewPost}></Route>
              <Route exact path="/api" component={ApiCollection}></Route>

              <Route exact path="/my/profile" component={MyProfile}></Route>
              <Route exact path="/profile/:id" component={Profile}></Route>

              <Route exact path="/:id/:title">
                <PostDetails setProgress={setProgress} setColor={setColor} />
              </Route>

              <Route
                exact
                path="/update/:id/post"
                component={UpdatePost}
              ></Route>
              <Route
                exact
                path="/delete/:id/post"
                component={ConfirmDelete}
              ></Route>

              <Route exact path="/login">
                <Login setProgress={setProgress} setColor={setColor} />
              </Route>
              <Route exact path="/signup">
                <Signup setProgress={setProgress} setColor={setColor} />
              </Route>
              <Route
                exact
                path="/activate/:uid/:token"
                component={Activate}
              ></Route>
              <Route exact path="/reset-password" component={ResetPassword} />
              <Route
                exact
                path="/password/reset/confirm/:uid/:token"
                component={ResetPasswordConfirm}
              />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
