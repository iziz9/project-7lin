import React from "react";
import { Outlet } from "react-router-dom";
import FloatingIcon from "./commons/FloatingIcon";
import Footer from "./commons/Footer";
import Header from "./commons/Header";

const App = () => {
  return (
    <>
      <Header />
      <main style={{ position: "relative" }}>
        <FloatingIcon />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
