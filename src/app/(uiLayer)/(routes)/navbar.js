'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import "./sidebar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiStamper } from "react-icons/gi";
import { FaFolderOpen, FaUsers, FaEnvelope, FaCog } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router=useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`d-flex flex-column sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="d-flex flex-row sidebar-header">
        {isOpen && <h2>ENVELOPE MANAGER</h2>}
        <span className='hambtn' onClick={toggleSidebar}><RxHamburgerMenu size={27} /></span>
      </div>
      <ul>
        <li className={pathname === '/EnvelopeGroups' ? 'active' : ''} >
          <Link href="/EnvelopeGroups" >
            <span className="icon"><FaFolderOpen /></span>
            {isOpen && <span className="text">Envelope Groups</span>}
          </Link>
        </li>
        <li className={pathname === '/Clients' ? 'active' : ''}>
          <Link href="/Clients">
            <span className="icon"><FaUsers /></span>
            {isOpen && <span className="text">Clients</span>}
          </Link>
        </li>
        <li className={pathname === '/Envelopes' ? 'active' : ''}>
          <Link href="/Envelopes" >
            <span className="icon"><FaEnvelope /></span>
            {isOpen && <span className="text">Envelopes</span>}
          </Link>
        </li>
        <li className={pathname === '/Indica' ? 'active' : ''}>
          <Link href="/Indica" >
            <span className="icon"><GiStamper /></span>
            {isOpen && <span className="text">Indica</span>}
          </Link>
        </li>
        <li className={pathname === '/Settings' ? 'active' : ''}>
          <Link href="/Settings" >
            <span className="icon"><FaCog /></span>
            {isOpen && <span className="text">Settings</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}