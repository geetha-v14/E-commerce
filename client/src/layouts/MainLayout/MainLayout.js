import React from "react";

import "./MainLayout.css";

import Header
from "../../components/Header/Header";

// import SearchBar
// from "../../components/Header/SearchBar";


const MainLayout = ({
  children,
}) => {

  return (

    <>

      <Header />

      {/* <SearchBar /> */}

      <main className="main-container">

        {children}

      </main>

    </>

  );
};

export default MainLayout;