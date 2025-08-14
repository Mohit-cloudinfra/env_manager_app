"use client";
import '../../../globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './settings.css';
import { FiKey } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SettingsLayout({ children }) {
  const pathname = usePathname() || '';

  return (
    <div className="cont">
      <div className="cont-header">
        <span className="header-title">Settings</span>
      </div>
      <div className='row mt-4'>
        <div className='col-md-3'>
          <div className='settings-nav-card p-3 rounded'>
          <Link href="/Settings/Profile">
            <div className={`settings-nav-items p-2 rounded ${pathname === '/Settings/Profile' ? 'active' : ''}`}>
              <LuUserRound />
              <span>Profile</span>
            </div>
          </Link>
          <Link href="/Settings/UpdatePassword">
            <div className={`settings-nav-items p-2 rounded ${pathname === '/Settings/UpdatePassword' ? 'active' : ''}`}>
              <FiKey />
              <span>Update Password</span>
            </div>
          </Link>
        </div>
        </div>
        <div className='col-md-9'>
          <div className='changing-cont'>
          {children}
          </div>
        </div>
      </div>
    </div>
  );
}