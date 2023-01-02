import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Payroll from "./components/Payroll";
import Video from "./components/Video";
import Jobs from "./components/Jobs";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";

function App() {
  return (
    <div className="App">

      {/* insert bg component here */}

      <Router basename='/'>
        <NavBar />
        <Routes>
          <Fragment><Route path="/" element={<Header />} /></Fragment>
          <Fragment><Route path="video/*" element={<Video />} /></Fragment>
          <Fragment><Route path="search/*" element={<Search />} /></Fragment>
          <Fragment><Route path="payroll/*" element={<Payroll />} /></Fragment>
          <Fragment><Route path="jobs/*" element={<Jobs />} /></Fragment>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
