"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import { FaAsterisk } from "react-icons/fa";
export default function ProfilePage() {

const a="uppendra.maddi@gmail.com";
  return (
    <div className="profile-cont">
      <div className='profile-header '>
        <span className='header-text1'>Edit Profile</span>
        <span className='header-text2'>Set Up Your Personal Information</span>
      </div>
      <div className='profile-body '>
        <div className='d-flex w-50 justify-content-right align-items-end' >
          <label className='profile-label'><FaAsterisk className="asterisk" /> Name :</label>
        </div>
        <input className='w-50 form-control profile-input' />
        <div className='d-flex flex-column w-50 mt-4 justify-content-right ' >
          <label className='profile-label'>Email id :</label>
          <label className='profile-mailid'>{a}</label>
          
        </div>
        <div className='d-flex w-50 justify-content-begin'>
        <button className='btn1 w-auto mt-5 rounded'>Update Profile</button>
        </div>

      </div>
    </div>
  );
}