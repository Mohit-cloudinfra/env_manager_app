"use client";

import "./loading.css"; // Importing the CSS file

export default function LoadingScreen (){
return (
  <div className="loading-screen">
    <div className="spinner">
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
      <div className="dot dot4"></div>
    </div>
    <p>Please wait</p>
  </div>
);
}
