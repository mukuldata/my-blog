import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

// router and switch to navigate between pages
// exact will check for exact path;
// for register ,login we first check if there is a user or not
// changes in React router dom v6 update :
  // 1.  component should be inside element ;
  // 2. switch changed to routes;

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={user ? <Home /> : <Register />}/>
        <Route path="/login" element={user ? <Home /> : <Login />} ></Route>
        <Route path="/write" element={user ? <Write /> : <Register />}> </Route>
        <Route path="/settings" element= {user ? <Settings /> : <Register />}></Route>
        <Route path="/post/:postId"
         element={<Single/>} />
      </Routes>
    </Router>
  );
}

export default App;
