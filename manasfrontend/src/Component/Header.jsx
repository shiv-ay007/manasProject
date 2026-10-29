import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';
import { FiMenu, FiX, FiMinus, FiPlus, FiPhoneCall } from 'react-icons/fi';
import BookApointement from '../Component/BookApointement';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [openDropdownMobile, setOpenDropdownMobile] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- Scroll shadow effect ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---------- Close menu on route change ---------- */
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setOpenDropdownMobile(null);
  }, [location.pathname]);

  /* ---------- Lock body scroll when mobile menu open ---------- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  /* ---------- Close desktop dropdown on outside click ---------- */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.treatments-dropdown-wrapper')) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const treatments = [
    {
      name: 'Gallbladder',
      hasSubItems: true,
      subItems: [
        { name: 'Gallstones', path: '/treatment/gallbladder/gallbladderstones' },
        { name: 'Gallbladder Cancer', path: '/treatment/gallbladder/gallbladdercancer' },
        { name: 'Bile Duct Injury', path: '/treatment/gallbladder/Bileductinjury' },
      ],
    },
    {
      name: 'Hernia',
      hasSubItems: true,
      subItems: [
        { name: 'Inguinal Hernia', path: '/treatment/hernia/Inguinalhernial' },
        { name: 'Ventral / Incisional Hernia', path: '/treatment/hernia/Ventralhernia' },
        { name: 'Umbilical Hernia', path: '/treatment/hernia/Umbilicalhernia' },
      ],
    },
    {
      name: 'Stomach Cancer',
      hasSubItems: true,
      subItems: [
        { name: 'Polyps', path: '/treatment/stomach-cancer/polyps' },
        { name: 'Stomach Cancer', path: '/treatment/stomach-cancer/cancer' },
      ],
    },
    {
      name: 'Pancreas',
      hasSubItems: true,
      subItems: [
        { name: 'Pancreatic Stones', path: '/treatment/pancreas/pancreaticestones' },
        { name: 'Pancreatic Cancer', path: '/treatment/pancreas/pancreaticcancer' },
        { name: 'Whipple Surgery', path: '/treatment/pancreas/whipple' },
      ],
    },
    {
      name: 'Proctology',
      hasSubItems: true,
      subItems: [
        { name: 'Haemorrhoids', path: '/treatment/proctology/hemorrhoids' },
        { name: 'Fissure', path: '/treatment/proctology/fisures' },
        { name: 'Fistula', path: '/treatment/proctology/fistulas' },
      ],
    },
    {
      name: 'Intestine',
      hasSubItems: true,
      subItems: [
        { name: 'Obstruction / Strictures', path: '/treatment/intestine/obstruction' },
        { name: 'Perforation', path: '/treatment/intestine/perforation' },
        { name: 'Intestinal Cancer', path: '/treatment/intestine/instestinecancer' },
      ],
    },
    {
      name: 'Colon Rectum',
      hasSubItems: true,
      subItems: [
        { name: 'Polyps', path: '/treatment/colon-rectum/rectumpolyps' },
        { name: 'Colon / Rectal Cancer', path: '/treatment/colon-rectum/rectumcancer' },
      ],
    },
    {
      name: 'Liver',
      hasSubItems: true,
      subItems: [
        { name: 'Cysts / Hydatid Cysts', path: '/treatment/liver/livercysts' },
        { name: 'Liver Cancer', path: '/treatment/liver/livercancer' },
        { name: 'Liver Mass', path: '/treatment/liver/livermass' },
      ],
    },
    {
      name: 'Whipple Surgery',
      hasSubItems: false,
      path: '/treatment/pancreas/whipple',
    },
    {
      name: 'Antireflux Procedure',
      hasSubItems: false,
      path: '/treatment/antireflux-procedure/antireflux',
    },
    {
      name: 'Weight Loss Surgery',
      hasSubItems: false,
      path: '/treatment/weight-loss-surgery/weightlosssurgery',
    },
    {
      name: 'Robotic GI Surgery',
      hasSubItems: false,
      path: '/treatment/robotic-gi-surgery/roboticsurgery',
    },
  ];

  const treatmentGroups = [
    {
      title: 'Gallbladder & Liver',
      badge: 'Biliary & HPB',
      categories: [
        {
          name: 'Gallbladder',
          items: [
            { name: 'Gallstones', path: '/treatment/gallbladder/gallbladderstones' },
            { name: 'Gallbladder Cancer', path: '/treatment/gallbladder/gallbladdercancer' },
            { name: 'Bile Duct Injury', path: '/treatment/gallbladder/Bileductinjury' },
          ],
        },
        {
          name: 'Liver Care',
          items: [
            { name: 'Liver Cysts / Hydatid', path: '/treatment/liver/livercysts' },
            { name: 'Liver Cancer', path: '/treatment/liver/livercancer' },
            { name: 'Liver Mass', path: '/treatment/liver/livermass' },
          ],
        },
      ],
    },
    {
      title: 'Pancreas & Stomach',
      badge: 'Upper GI',
      categories: [
        {
          name: 'Pancreas',
          items: [
            { name: 'Pancreatic Stones', path: '/treatment/pancreas/pancreaticestones' },
            { name: 'Pancreatic Cancer', path: '/treatment/pancreas/pancreaticcancer' },
            { name: 'Whipple Surgery', path: '/treatment/pancreas/whipple' },
          ],
        },
        {
          name: 'Stomach Care',
          items: [
            { name: 'Stomach Polyps', path: '/treatment/stomach-cancer/polyps' },
            { name: 'Stomach Cancer', path: '/treatment/stomach-cancer/cancer' },
            { name: 'Antireflux Procedure', path: '/treatment/antireflux-procedure/antireflux' },
          ],
        },
      ],
    },
    {
      title: 'Hernia & Intestine',
      badge: 'Abdominal Wall',
      categories: [
        {
          name: 'Hernia Repair',
          items: [
            { name: 'Inguinal Hernia', path: '/treatment/hernia/Inguinalhernial' },
            { name: 'Ventral / Incisional', path: '/treatment/hernia/Ventralhernia' },
            { name: 'Umbilical Hernia', path: '/treatment/hernia/Umbilicalhernia' },
          ],
        },
        {
          name: 'Intestine & Colon',
          items: [
            { name: 'Intestinal Obstruction', path: '/treatment/intestine/obstruction' },
            { name: 'Intestinal Perforation', path: '/treatment/intestine/perforation' },
            { name: 'Colon & Rectal Cancer', path: '/treatment/colon-rectum/rectumcancer' },
          ],
        },
      ],
    },
    {
      title: 'Proctology & Advanced',
      badge: 'Robotic & Speciality',
      categories: [
        {
          name: 'Proctology',
          items: [
            { name: 'Haemorrhoids (Piles)', path: '/treatment/proctology/hemorrhoids' },
            { name: 'Anal Fissure', path: '/treatment/proctology/fisures' },
            { name: 'Anal Fistula', path: '/treatment/proctology/fistulas' },
          ],
        },
        {
          name: 'Advanced Surgery',
          items: [
            { name: 'Robotic GI Surgery', path: '/treatment/robotic-gi-surgery/roboticsurgery' },
            { name: 'Weight Loss Surgery', path: '/treatment/weight-loss-surgery/weightlosssurgery' },
            { name: 'Complex Whipple', path: '/treatment/pancreas/whipple' },
          ],
        },
      ],
    },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-dr-manas-aggarwal' },
  ];
  const navLinksAfter = [
    { name: 'Cases', path: '/cases' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  /* ---------- Link class helper (hover underline REMOVED) ---------- */
  const linkClass = (path) => {
    const active =
      path === '/'
        ? location.pathname === '/'
        : location.pathname.startsWith(path);

    const textColor = 'text-gray-800 hover:text-teal-700';
    const activeColor = 'text-teal-700 font-semibold';

    return `relative px-3 py-2 text-[0.95rem] font-medium tracking-wide rounded-md transition-colors duration-300
      ${active ? activeColor : textColor}
      after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px]
      after:bg-teal-600 after:rounded-full after:transition-transform after:duration-300
      ${active ? 'after:scale-x-100' : 'after:scale-x-0'}`;
  };

  const isTreatmentsActive = location.pathname.startsWith('/treatment');

  /* ---------- MAIN handleLinkClick ---------- */
  const handleLinkClick = (e, path) => {
    if (e) e.preventDefault();

    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setOpenDropdownMobile(null);
    setIsOpen(false);

    if (path) {
      setTimeout(() => navigate(path), 60);
    }
  };

  const toggleTreatments = () => {
    setActiveDropdown(activeDropdown === 'treatments' ? null : 'treatments');
    setActiveSubDropdown(null);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b ${
          scrolled ? 'shadow-md border-teal-100' : 'shadow-sm border-teal-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between h-[68px] lg:h-[76px]">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <div className="p-0 bg-transparent transition-all duration-300">
              <img
                src={logo}
                alt="Dr Manas logo"
                className="w-[11.5rem] lg:w-[13.5rem] h-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}

            {/* ---------- Our Treatments Dropdown ---------- */}
            <div
              className="relative treatments-dropdown-wrapper"
              onMouseEnter={() => setActiveDropdown('treatments')}
              onMouseLeave={() => {
                setActiveDropdown(null);
                setActiveSubDropdown(null);
              }}
            >
              <button
                type="button"
                onClick={toggleTreatments}
                className={`relative flex items-center gap-1 px-3 py-2 text-[0.95rem] font-medium !font-poppins tracking-wide rounded-md transition-colors duration-300
                  ${
                    isTreatmentsActive || activeDropdown === 'treatments'
                      ? 'text-teal-700 font-semibold'
                      : 'text-gray-800 hover:text-teal-700'
                  }
                  after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px]
                  after:bg-teal-600 after:rounded-full after:transition-transform after:duration-300
                  ${isTreatmentsActive ? 'after:scale-x-100' : 'after:scale-x-0'}`}
              >
                Our Treatments
                <IoMdArrowDropdown
                  className={`transition-transform duration-300 ${
                    activeDropdown === 'treatments' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'treatments' && (
                <div className="absolute left-1/2 -translate-x-[36%] top-full z-50 animate-[fadeIn_0.2s_ease-out] w-[860px] max-w-[95vw]">
                  <div className="h-3 w-full" />
                  <div className="bg-white shadow-2xl rounded-2xl border border-teal-100 overflow-hidden">
                    <div className="grid grid-cols-4 gap-5 p-6 bg-white">
                      {treatmentGroups.map((group) => (
                        <div key={group.title} className="flex flex-col space-y-4">
                          <div className="border-b border-teal-100 pb-2">
                            <span className="text-[10px] font-bold text-[#00B771] uppercase tracking-wider block">
                              {group.badge}
                            </span>
                            <h4 className="text-[0.88rem] font-bold text-gray-900 mt-0.5">
                              {group.title}
                            </h4>
                          </div>

                          <div className="space-y-4">
                            {group.categories.map((cat) => (
                              <div key={cat.name}>
                                <span className="text-[0.78rem] font-semibold text-gray-800 block mb-1.5">
                                  {cat.name}
                                </span>
                                <div className="space-y-1">
                                  {cat.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      onClick={(e) => handleLinkClick(e, item.path)}
                                      className="group flex items-center gap-1.5 py-0.5 text-[0.82rem] text-gray-600 hover:text-[#00B771] transition-colors"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-teal-300 group-hover:bg-[#00B771] group-hover:scale-125 transition-all shrink-0" />
                                      <span className="group-hover:translate-x-0.5 transition-transform">
                                        {item.name}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="px-6 py-3 bg-gradient-to-r from-teal-50 via-emerald-50/70 to-teal-50 border-t border-teal-100/80 flex items-center justify-between text-xs text-teal-900">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00B771]" />
                        <span className="font-semibold text-gray-800">
                          Over 100+ Advanced Surgical Procedures Performed
                        </span>
                      </div>
                      <Link
                        to="/contact"
                        onClick={(e) => handleLinkClick(e, '/contact')}
                        className="font-bold text-teal-700 hover:text-teal-900 underline underline-offset-2 flex items-center gap-1"
                      >
                        Need guidance? Contact us →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinksAfter.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}

            {/* CTA */}
            <div className="ml-2 xl:ml-3">
              <BookApointement>
                <button
                  type="button"
                  className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 text-[0.88rem] font-serif font-semibold text-white tracking-wide rounded-full overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#1495be] via-[#1CB6E6] to-[#0ea5e9] hover:from-[#18a2cd] hover:via-[#30c0ec] hover:to-[#1CB6E6] shadow-[0_4px_16px_rgba(28,182,230,0.38)] hover:shadow-[0_6px_24px_rgba(28,182,230,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-white/30 cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 text-white shadow-inner group-hover:scale-110 group-hover:bg-white group-hover:text-[#1495be] group-hover:rotate-12 transition-all duration-300 shrink-0">
                    <FiPhoneCall className="text-[11px]" />
                  </span>
                  <span className="whitespace-nowrap font-medium">Request a Callback</span>
                  <span className="text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 text-xs shrink-0">
                    →
                  </span>
                </button>
              </BookApointement>
            </div>
          </nav>

          {/* Mobile menu open button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800 transition-colors"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>

        {/* ================= MOBILE DRAWER ================= */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed left-0 top-0 h-full w-[85%] max-w-[340px] bg-white z-50 shadow-2xl
            transition-transform duration-300 ease-out lg:hidden flex flex-col
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Drawer header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50">
            <span className="text-base font-semibold text-teal-800 tracking-wide">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
              className="p-1.5 rounded-lg hover:bg-white/70 transition-colors"
            >
              <FiX className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Drawer links */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 text-[0.95rem] font-medium text-gray-700">

            {/* Home */}
            <button
              onClick={(e) => handleLinkClick(e, '/')}
              className="block w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 hover:bg-teal-50 hover:text-teal-700"
            >
              Home
            </button>

            {/* About Us */}
            <button
              onClick={(e) => handleLinkClick(e, '/about-dr-manas-aggarwal')}
              className="block w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 hover:bg-teal-50 hover:text-teal-700"
            >
              About Us
            </button>

            {/* Treatments accordion (MOBILE) */}
            <div>
              <button
                onClick={() =>
                  setOpenDropdownMobile(
                    openDropdownMobile === 'treatments' ? null : 'treatments'
                  )
                }
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg !font-poppins font-medium
                  transition-colors duration-200
                  ${
                    openDropdownMobile === 'treatments'
                      ? 'bg-teal-50 text-teal-700'
                      : 'hover:bg-teal-50 hover:text-teal-700'
                  }`}
              >
                <span>Our Treatments</span>
                <IoMdArrowDropdown
                  className={`transition-transform duration-300 ${
                    openDropdownMobile === 'treatments' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdownMobile === 'treatments' && (
                <div className="mt-1 ml-2 space-y-0.5 border-l-2 border-teal-100 pl-2">
                  {treatments.map((treatment, index) => (
                    <div key={treatment.name}>
                      {treatment.hasSubItems ? (
                        <>
                          <button
                            onClick={() =>
                              setActiveSubDropdown(
                                activeSubDropdown === index ? null : index
                              )
                            }
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg
                                       text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700
                                       transition-colors duration-200"
                          >
                            <span>{treatment.name}</span>
                            {activeSubDropdown === index ? (
                              <FiMinus className="text-teal-600" />
                            ) : (
                              <FiPlus className="text-teal-600" />
                            )}
                          </button>

                          {activeSubDropdown === index && (
                            <div className="ml-4 mt-1 space-y-0.5 border-l border-teal-100 pl-3">
                              {treatment.subItems.map((subItem) => (
                                <button
                                  key={subItem.path}
                                  onClick={(e) => handleLinkClick(e, subItem.path)}
                                  className="block w-full text-left px-2.5 py-1.5 text-[0.85rem] rounded-md transition-colors text-gray-600 hover:text-teal-700 hover:bg-teal-50"
                                >
                                  {subItem.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={(e) => handleLinkClick(e, treatment.path)}
                          className="block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                        >
                          {treatment.name}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cases */}
            <button
              onClick={(e) => handleLinkClick(e, '/cases')}
              className="block w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 hover:bg-teal-50 hover:text-teal-700"
            >
              Cases
            </button>

            {/* Blogs */}
            <button
              onClick={(e) => handleLinkClick(e, '/blog')}
              className="block w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 hover:bg-teal-50 hover:text-teal-700"
            >
              Blogs
            </button>

            {/* Contact Us */}
            <button
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="block w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 hover:bg-teal-50 hover:text-teal-700"
            >
              Contact Us
            </button>
          </div>

          {/* Drawer footer CTA */}
          <div className="px-5 py-4 border-t border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50">
            <div className="w-full">
              <BookApointement>
                <button
                  type="button"
                  className="group relative w-full flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-serif font-semibold text-white tracking-wide rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#1495be] via-[#1CB6E6] to-[#0ea5e9] hover:from-[#18a2cd] hover:via-[#30c0ec] hover:to-[#1CB6E6] shadow-lg shadow-[#1CB6E6]/30 active:scale-98 border border-white/25 cursor-pointer"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 text-white shadow-inner group-hover:scale-110 transition-all duration-300 shrink-0">
                    <FiPhoneCall className="text-[11px]" />
                  </span>
                  <span className="font-medium">Request a Callback</span>
                  <span className="text-white/80 group-hover:translate-x-0.5 transition-transform duration-300 text-xs shrink-0">
                    →
                  </span>
                </button>
              </BookApointement>
            </div>
          </div>
        </div>
      </header>

      {/* keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Header;