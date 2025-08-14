"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdatePassword.css';
import { FaAsterisk } from "react-icons/fa";
export default function ProfilePage() {

const a="uppendra.maddi@gmail.com";
  return (
    <div className="up-cont">
      <div className='up-header '>
        <span className='header-text1'>Password Settings</span>
        <span className='header-text2'>Change or reset your account password</span>
      </div>
      <div className='up-body'>
        <div className='mx-auto w-50 text-left'>
        <label className='up-label'><FaAsterisk className="asterisk" /> Old Password</label>
        <input className='form-control up-input' />

        <label className='up-label mt-3'><FaAsterisk className="asterisk" /> New Password</label>
        <input className='form-control up-input' />

        <label className='up-label mt-3'><FaAsterisk className="asterisk" /> Confirm Password</label>
        <input className='form-control up-input' />

        <div className='btn-container'>
          <button className='btn1 rounded'>Change Password</button>
          <button className='btn2 rounded'>Cancel</button>

        </div>
        </div>
      </div>














      
    </div>
  );
}