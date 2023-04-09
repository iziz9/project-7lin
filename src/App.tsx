import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FloatingIcon from "./commons/Chatbot/FloatingIcon";
import Footer from "./commons/Footer";
import Header from "./commons/Header";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

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
