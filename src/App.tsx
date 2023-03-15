import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./commons/Footer";
import Header from "./commons/Header";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
