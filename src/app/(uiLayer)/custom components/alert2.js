"use client";
import "./alert1.css"; // Importing the CSS file



export default function alert1(text, yesbtn, nobtn) {
  return (
    <div className="alert-bg-screen">
      <div className="alert-card">
        <div>Are you sure you want to ? </div>
        <div>
            <button>Yes</button>
            <button onClick={()=>setIsLoading(false)}>No</button></div>
      </div>
    </div>
  );
}