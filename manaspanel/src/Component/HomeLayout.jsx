import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineXMark } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineDashboard, MdOutlineDescription, MdAdd, MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineLogout } from 'react-icons/ai';
import { GiMagnifyingGlass } from 'react-icons/gi';
import logo from '../assets/logo.png';
import companylogo from '../assets/cclogo.png'

const HomeLayout = ({ children }) => {
    const [active, setActive] = useState(false);
    const [isBlogOpen, setIsBlogOpen] = useState(false);
    const navigate = useNavigate();

    const listStyle = 'flex items-center gap-3 py-3 px-4 rounded-md hover:bg-[#5a55db] transition duration-300 text-[#E1E1F3] font-semibold text-[1.1rem] w-full';
    const activeListStyle = `${listStyle} bg-[#655CCE] text-white shadow-md`;

    const handleLogout = () => {
        const response = window.confirm("Are you sure you want to logout?");
        if (response) {
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    return (
        <div className='flex flex-col md:flex-row h-screen bg-[#F6F6FA] text-gray-700'>
            {/* Sidebar */}
            <header className={`z-50 w-64 h-full bg-[#2F3349] shadow-lg transition-transform duration-500 ${active ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 absolute md:static top-0 left-0`}>
                <ul className='h-full flex flex-col'>
                    <li className='flex items-center justify-between px-4 py-5  border-b border-[#4f47a9a3] text-[#E1E1F3]'>
                        <Link to={'/'} className='flex items-center gap-3'>
                            <img src={logo} alt="Logo" className='w-24 h-auto object-cover shadow-md rounded-lg' /> {/* Increased size and added shadow */}
                            <span className='text-[#E1E1F3] font-bold text-lg'>Dashboard</span> {/* Match text color with sidebar */}
                        </Link>
                        <button className='p-2 md:hidden' onClick={() => setActive(false)}>
                            <HiOutlineXMark className='text-[1.5rem]' />
                        </button>
                    </li>
                    <div className='flex-1 overflow-y-auto mt-4'>
                        <li>
                            <NavLink to={'/'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                <MdOutlineDashboard className='text-[1.5rem]' />
                                Dashboard
                            </NavLink>
                        </li>
                        
                        {/* Blog Section */}
                        <li>
                            <button onClick={() => setIsBlogOpen(!isBlogOpen)} className={`${listStyle} flex items-center justify-between`}>
                                <div className='flex items-center gap-3'>
                                    <MdOutlineDescription className='text-[1.5rem]' />
                                    <span>Blog</span>
                                </div>
                                <MdKeyboardArrowDown className={`transition-transform ${isBlogOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isBlogOpen && (
                                <ul className='pl-8 mt-1'>
                                      <li>
                                        <NavLink to={'/blog/add'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <MdAdd />
                                            Add Blog
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/blog/list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <MdOutlineDescription />
                                            View Blog
                                        </NavLink>
                                    </li>
                                  
                                </ul>
                            )}
                        </li>
                        
                        {/* Enquiry */}
                        <li>
                            <NavLink to={'/inquiry'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                <GiMagnifyingGlass className='text-[1.5rem]' />
                                Enquiry
                            </NavLink>
                        </li>
                        
                        {/* Logout */}
                        {/* <li>
                            <button onClick={handleLogout} className={`${listStyle} text-red-400 hover:bg-red-600`}>
                                <AiOutlineLogout className='text-[1.5rem]' />
                                Logout
                            </button>
                        </li> */}
                    </div>
                </ul>
            </header>

            {/* Main Content Area */}
            <div className='flex-1 p-6 overflow-auto'>
                <button className='md:hidden p-3 mb-4' onClick={() => setActive(true)}>
                    <RxHamburgerMenu className='text-[#535162fa] text-[1.5rem]' />
                </button>
                {children}
            </div>
        </div>
    );
};

export default HomeLayout;
