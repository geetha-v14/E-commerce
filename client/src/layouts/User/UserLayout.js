import React from "react";

import "./UserLayout.css";

import Header from "../../components/Header/Header";

import Footer from "../../components/Footer/Footer";



const UserLayout = ({
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

export default UserLayout;