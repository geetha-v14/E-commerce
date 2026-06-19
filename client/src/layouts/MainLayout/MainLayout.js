import React from "react";

import "./MainLayout.css";

import Header from "../../components/Header/Header";

import Footer from "../../components/Footer/Footer";



const MainLayout = ({
  children,
}) => {

  return (

    <>

      <Header />

      <main className="main-container">

        {children}

      </main>

      <Footer/>

    </>

  );
};

export default MainLayout;