import React from "react";
import Header from "../components/Header/Header";
import HomeMainContent from "../components/HomeMainContent/HomeMainContent";
import ImageBesideText from "../components/ImageBesideText/ImageBesideText";


const HomePage = props => {

  return (
    <div>
      <Header />
      <HomeMainContent />
      <ImageBesideText />
    </div>
  );
};

export default HomePage;
