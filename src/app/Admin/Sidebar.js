'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai';
import { useSpring, animated } from '@react-spring/web';
import './admin.css';
import logoGif from '../../../public/Assests/Landing/takbon.gif'; 
import { Logo } from './logo'; 

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarAnimation = useSpring({
    right: isOpen ? '0' : '-250px',
    opacity: isOpen ? 1 : 0.5,
  });

  return (
    <>
      <header className="admin-header">
        <button className="hamburger-menu" onClick={toggleSidebar}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
        <button className="logout-button">
          <Link href="/AdminLogin">داشبورد</Link>
          <AiOutlineLogout size={24} />
        </button>
      </header>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <animated.div className="sidebar" style={sidebarAnimation}>
        <div className="sidebar-logo">
          <Logo href="/" hover={logoGif} />
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link href="/Admin">داشبورد</Link>
          </li>
          <li>
            <Link href="/Admin/NewsAdmin">اخبار</Link>
          </li>
          <li>
            <Link href="/Admin/collaborationAdmin">ارتباط با ما</Link>
          </li>
        </ul>
      </animated.div>
    </>
  );
}
