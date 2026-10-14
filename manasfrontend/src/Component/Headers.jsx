import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';

const Headers = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  const treatments = [
    {
      name: 'Gallbladder',
      subItems: [
        { name: 'Gallstones', path: '/treatment/gallbladder/gallbladderstones' },
        { name: 'Gallbladder Cancer', path: '/treatment/gallbladder/gallbladdercancer' },
        { name: 'Bile Duct Injury', path: '/treatment/gallbladder/Bile-duct-injury' },
      ],
    },
    {
      name: 'Hernia',
      subItems: [
        { name: 'Inguinal Hernia', path: '/treatment/hernia/Inguinalhernial' },
        { name: 'Ventral/Incisional Hernia', path: '/treatment/hernia/Ventral-hernia' },
        { name: 'Umbilical Hernia', path: '/treatment/hernia/Umbilical-hernia' },
      ],
    },
    {
      name: 'stomachCancer',
      subItems: [
        { name: 'Polyps', path: '/treatment/stomach-cancer/polyps' },
        { name: 'Stomach Cancer', path: '/treatment/stomach-cancer/cancer' },
    
      ],
    },
    {
      name: 'pancreas',
      subItems: [
        { name: 'Pancreatic Stones', path: '/treatment/pancreas/stones' },
        { name: 'Pancreatic Cancer', path: '/treatment/pancreas/cancer' },
        { name: 'Whipple Surger', path: '/treatment/pancreas/whipple' },
      ],
    },
    {
      name: 'intestine',
      subItems: [
        { name: 'Obstruction / Strictures', path: '/treatment/intestine/obstruction' },
        { name: 'Perforation', path: '/treatment/intestine/perforation' },
        { name: 'Intestinal Cancer', path: '`/treatment/intestine/cancer' },
      ],
    },
    {
      name: 'colonRectum',
      subItems: [
        { name: 'Polyps', path: '/treatment/colon-rectum/polyps' },
        { name: 'Inflammatory Bowel Diseases', path: '/treatment/colon-rectum/inflammatory-bowel-diseases`' },
        { name: 'Colon/Rectal Cancer', path: 'treatment/colon-rectum/cancer' },
      ],
    },
    {
      name: 'liver',
      subItems: [
        { name: 'Cysts / Hydatid Cysts', path: '/treatment/liver/cysts' },
        { name: 'Liver Cancer', path: '/treatment/liver/cancer' },
        { name: 'Liver Mass', path: '/treatment/liver/mass' },
      ],
    },
    {
      name: 'Whipple Surgery',
      subItems: [
        { name: 'Whipple Surgery', path: '/treatment/whipple/whipple-surgery' },
   
      ],
    },
    {
      name: 'antirefluxProcedure',
      subItems: [
        { name: 'Anti-Reflux Procedure', path: '/treatment/antireflux-procedure/antireflux-procedure' },
   
      ],
    },


    // Add more treatments as needed
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <Link to="/" className="relative">Home</Link>
      <Link to="/about" className="relative">About</Link>

      <div
        className="relative"
        onMouseEnter={() => setActiveDropdown('treatments')}
        onMouseLeave={() => {
          setActiveDropdown(null);
          setActiveSubDropdown(null);
        }}
      >
        <button className={`flex items-center gap-1 ${activeDropdown === 'treatments' ? 'text-primary font-semibold' : ''}`}>
          Our Treatments <IoMdArrowDropdown />
        </button>

        {activeDropdown === 'treatments' && (
          <div className="absolute left-0 bg-white shadow-lg rounded-lg w-48 z-50">
            {treatments.map((treatment) => (
              <div
                key={treatment.name}
                className="border-b relative"
                onMouseEnter={() => setActiveSubDropdown(treatment.name)}
                onMouseLeave={() => setActiveSubDropdown(null)}
              >
                <button className="flex justify-between items-center w-full px-4 py-2 hover:bg-gray-100">
                  {treatment.name}
                  <IoMdArrowDropdown />
                </button>

                {activeSubDropdown === treatment.name && (
                  <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg w-48 z-50">
                    {treatment.subItems.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        to={subItem.path} 
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => {
                          setActiveDropdown(null); // Close main dropdown on click
                          setActiveSubDropdown(null); // Close sub-dropdown on click
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to="/cases" className="relative">Cases</Link>
      <Link to="/blog" className="relative">Blog</Link>
      <Link to="/contact" className="relative">Contact Us</Link>
    </nav>
  );
};

export default Headers;
