import React, { useState, useEffect } from "react";
import { FaBrain, FaHeartbeat, FaSmile, FaCloud, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// Categories array with name, id, and icon
const categories = [
  { id: "depression", name: "Depression", icon: <FaBrain /> },
  { id: "anxiety", name: "Anxiety Disorders", icon: <FaHeartbeat /> },
  { id: "ptsd", name: "Trauma & PTSD", icon: <FaSmile /> },
  { id: "panic", name: "Panic Disorders", icon: <FaCloud /> },
];

// Details object for the category content
const categoryDetails = {
  depression: {
    title: "Depression",
    description: `Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.`,
    subDescription: `Dynamically innovate resource-leveling customer service for state-of-the-art customer service. Keeping your eye on the ball.`,
    img: "https://via.placeholder.com/400", // Replace with actual image URL
    icons: [
      {
        icon: <FaMapMarkerAlt />,
        title: "Our Location",
        description: "For everyday care or life-changing care, you can count on us.",
      },
      {
        icon: <FaUserMd />,
        title: "Dr CV",
        description: "Quickly maximize timely deliverables for real-time schemas.",
      },
    ],
  },
  anxiety: {
    title: "Anxiety Disorders",
    description: `Completely synergize resource taxing relationships via premier niche markets.`,
    subDescription: `Professionally cultivate one-to-one customer service with robust ideas.`,
    img: "https://via.placeholder.com/400", // Replace with actual image URL
    icons: [
      {
        icon: <FaMapMarkerAlt />,
        title: "Our Location",
        description: "For everyday care or life-changing care, you can count on us.",
      },
      {
        icon: <FaUserMd />,
        title: "Dr CV",
        description: "Quickly maximize timely deliverables for real-time schemas.",
      },
    ],
  },
  panic: {
    title: "Panic Disorders",
    description: `Professionally cultivate one-to-one customer service.`,
    subDescription: `Dynamically innovate resource-leveling customer service.`,
    img: "https://via.placeholder.com/400", // Replace with actual image URL
    icons: [
      {
        icon: <FaMapMarkerAlt />,
        title: "Our Location",
        description: "For everyday care or life-changing care, you can count on us.",
      },
      {
        icon: <FaUserMd />,
        title: "Dr CV",
        description: "Quickly maximize timely deliverables for real-time schemas.",
      },
    ],
  },
  ptsd: {
    title: "Trauma & PTSD",
    description: `Dynamically innovate resource-leveling customer service for state-of-the-art customer service.`,
    subDescription: `Keeping your eye on the ball.`,
    img: "https://via.placeholder.com/400", // Replace with actual image URL
    icons: [
      {
        icon: <FaMapMarkerAlt />,
        title: "Our Location",
        description: "For everyday care or life-changing care, you can count on us.",
      },
      {
        icon: <FaUserMd />,
        title: "Dr CV",
        description: "Quickly maximize timely deliverables for real-time schemas.",
      },
    ],
  },
};

// CategorySection Component with AOS animation and active category highlight
const CategorySection = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="text-center py-12">
      <h1 className=" mb-4">What We Care For</h1>
      <h2 className=" mb-8 text-sm md:text-base">
        Making professional therapy accessible
      </h2>
      <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center cursor-pointer p-3 sm:p-4 rounded-lg transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-blue-100 border border-blue-500 shadow-lg"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(category.id)}
         
          >
            <div
              className={`text-4xl sm:text-5xl mb-2 ${
                selectedCategory === category.id ? "text-[#4f6f8f]" : "text-gray-500"
              }`}
            >
              {category.icon}
            </div>
            <span
              className={`text-base sm:text-xl ${
                selectedCategory === category.id ? "text-[#4f6f8f] font-bold" : ""
              }`}
            >
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// CategoryDetails Component with AOS animation and centered content
const CategoryDetails = ({ selectedCategory }) => {
  const details = categoryDetails[selectedCategory];

  if (!details) {
    return (
      <div className="text-center py-12" data-aos="fade-up">
        <p className="text-lg sm:text-xl text-gray-500">Please select a category to see details.</p>
      </div>
    );
  }

  return (
    <div
      className="py-12 flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-between space-y-8 lg:space-y-0 lg:space-x-8 mx-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-6xl"
      data-aos="fade-up"
    >
      {/* Text Section */}
      <div className="lg:w-1/2 space-y-4 text-center lg:text-left px-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">{details.title}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{details.description}</p>
        <p className="text-gray-500 text-sm sm:text-base">{details.subDescription}</p>

        {/* Icon Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {details.icons.map((iconDetail, index) => (
            <div key={index} className="flex items-start space-x-4" data-aos="fade-right">
              <div className="text-2xl text-blue-600">{iconDetail.icon}</div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold">{iconDetail.title}</h4>
                <p className="text-gray-500 text-xs sm:text-sm">{iconDetail.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 px-4" data-aos="fade-left">
        <img
          src={details.img}
          alt={details.title}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

// Main CategoryPage Component with AOS initialization
const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ptsd");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center overflow-x-hidden overflow-y-hidden">
      <CategorySection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <CategoryDetails selectedCategory={selectedCategory} />
    </div>
  );
};

export default CategoryPage;
