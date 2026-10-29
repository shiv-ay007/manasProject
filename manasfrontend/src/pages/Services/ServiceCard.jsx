import React, { useEffect } from 'react';
import Slider from 'react-slick';

import image1 from '../../assets/service/hineria.png';
import image2 from '../../assets/service/liver_.png';
import image3 from '../../assets/service/pancreas.png';
import image4 from '../../assets/service/stomach-cancer.png';
import image5 from '../../assets/service/gallbladder.png';
import image6 from '../../assets/service/Antireflux1.png';
import image7 from '../../assets/service/digestive-system.png';
import image8 from '../../assets/service/colorrecutm1.png';
import image9 from '../../assets/service/instenstine.jpg';
import image10 from '../../assets/service/servicephoto/ch.jpeg';
import image11 from '../../assets/service/servicephoto/gbd.jpeg';
import image12 from '../../assets/service/servicephoto/livc.jpeg';
import image13 from '../../assets/service/servicephoto/livmas.jpg';
import image14 from '../../assets/service/servicephoto/panc.webp';
import image15 from '../../assets/service/servicephoto/psto.jpeg';
import image16 from '../../assets/service/servicephoto/sc.jpeg';
import image17 from '../../assets/service/servicephoto/uh.jpeg';

import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Container from '../../utlis/Container';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  { title: "Hernia Treatment in Lucknow", img: image1, description: "Get expert hernia treatment in Lucknow with advanced surgical techniques for minimal recovery time.", link: "/treatment/hernia/Inguinalhernial" },
  { title: "Liver Care Specialist", img: image2, description: "Expert liver care services, including diagnosis, treatment, and management of liver diseases in Lucknow.", link: "/treatment/liver/livercancer" },
  { title: "Pancreas Disease Treatment", img: image3, description: "Specialized pancreas treatment with customized plans for effective management of pancreatic disorders.", link: "/treatment/pancreas/pancreaticcancer" },
  { title: "Stomach Cancer Treatment", img: image4, description: "Comprehensive stomach cancer treatment in Lucknow, including chemotherapy, surgery, and advanced therapies.", link: "/treatment/stomach-cancer/cancer" },
  { title: "Gallbladder Surgery Expert", img: image5, description: "Best gallbladder surgery in Lucknow with minimally invasive laparoscopic techniques for quick recovery.", link: "/treatment/gallbladder/gallbladderstones" },
  { title: "Antireflux Surgery in Lucknow", img: image6, description: "Effective antireflux surgery for acid reflux relief, performed by top specialists.", link: "/treatment/antireflux-procedure/antireflux" },
  { title: "Digestive Health Clinic", img: image7, description: "Advanced digestive system care in Lucknow, providing diagnostics, treatments, and long-term support.", link: "/treatment/digestive-system" },
  { title: "Colorectal Surgery Experts", img: image8, description: "Get the best colorectal surgery for conditions like colon cancer and inflammatory bowel disease.", link: "/treatment/colon-rectum/rectumcancer" },
  { title: "Intestinal Disorders Treatment", img: image9, description: "Advanced treatment for intestinal disorders, focusing on gut health and long-term wellness.", link: "/treatment/intestine/instestinecancer" },
  { title: "Laparoscopic Cholecystectomy", img: image10, description: "Safe and effective gallbladder removal surgery with laparoscopic techniques in Lucknow.", link: "/treatment/gallbladder/gallbladderstones" },
  { title: "Gastric Bypass Surgery", img: image11, description: "Top gastric bypass surgery programs in Lucknow for sustainable weight loss.", link: "/treatment/weight-loss-surgery/weight-loss" },
  { title: "Liver Cirrhosis Treatment", img: image12, description: "Personalized liver cirrhosis care plans to improve patient quality of life.", link: "/treatment/liver/livercirrhosis" },
  { title: "Liver Mass Diagnosis & Treatment", img: image13, description: "Advanced diagnostic and treatment solutions for liver masses in Lucknow.", link: "/treatment/liver/livermass" },
  { title: "Pancreatitis Treatment Center", img: image14, description: "Specialized pancreatitis care in Lucknow, focusing on dietary support and pain relief.", link: "/treatment/pancreas/pancreatitis" },
  { title: "Postoperative Recovery Support", img: image15, description: "Comprehensive postoperative care services to ensure a smooth recovery after surgery.", link: "/treatment/postoperative-care" },
  { title: "Expert Surgical Care", img: image16, description: "Trusted surgical care services in Lucknow, ensuring safe and effective treatment outcomes.", link: "/treatment/surgical-care" },
  { title: "Diagnostic Ultrasound Services", img: image17, description: "Advanced ultrasound services in Lucknow for accurate diagnosis and treatment planning.", link: "/treatment/ultrasound-services" },
];

const ServiceCard = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const settings = {
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3200,
    pauseOnHover: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="relative bg-gradient-to-b from-[#e3f4ef] via-[#eff8f5] to-[#dff2ec] py-14 sm:py-16 lg:py-20 overflow-hidden">
      {/* Option B: Aceternity UI Style Dot Matrix Background */}
      <div className="absolute inset-0 bg-dot-teal mask-radial-faded pointer-events-none opacity-80" />

      {/* Vibrant Ambient Brand Glow Orbs matching Logo (Cyan & Emerald) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-20 w-[480px] h-[480px] bg-[#1CB6E6]/25 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-20 w-[500px] h-[500px] bg-[#00B771]/22 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-teal-300/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Section Heading matching reference */}
        <div className="text-center flex flex-col items-center justify-center mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
              Our Healthcare Services
            </span>
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#112340] tracking-tight mb-3">
            Providing High-Quality Healthcare Services
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Advanced care, modern technology and a patient-first approach for better health outcomes.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="service-slider-container -mx-3">
          <Slider {...settings}>
            {services.map((service, index) => (
              <div key={index} className="px-3 pb-4 h-full flex">
                <Link
                  to={service.link}
                  className="group relative flex flex-col justify-between w-full bg-white rounded-3xl p-6 sm:p-7 text-center transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(20,150,170,0.15)] border border-slate-200/90 hover:border-teal-400 overflow-hidden cursor-pointer h-full hover:-translate-y-1.5"
                >
                  {/* Upper Content: Image + Fixed Height Title & Description */}
                  <div className="relative z-10 flex flex-col items-center flex-grow">
                    
                    {/* Circular Ring Container for Medical Image */}
                    <div className="relative mx-auto mb-6 w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center shrink-0">
                      
                      {/* Outer concentric decorative ring with satellite dots */}
                      <div className="absolute inset-0 rounded-full border border-teal-200/70 group-hover:border-[#1CB6E6]/70 group-hover:scale-105 transition-all duration-700 ease-out" />
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00B771] group-hover:bg-[#1CB6E6] transition-colors duration-700" />
                      <span className="absolute bottom-6 left-1 w-2 h-2 rounded-full bg-teal-400 group-hover:bg-[#00B771] transition-colors duration-700" />

                      {/* Inner glowing radial circular capsule - Full fill */}
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-100 shadow-[inset_0_2px_12px_rgba(0,183,113,0.12)] border-2 border-teal-100 group-hover:border-[#1CB6E6] flex items-center justify-center overflow-hidden p-0 group-hover:shadow-[0_10px_24px_rgba(28,182,230,0.25)] transition-all duration-700 ease-out">
                        <img
                          src={service.img}
                          alt={service.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>

                    {/* Service Title with Fixed 2-Line Min-Height for Perfect Baseline */}
                    <h3 className="relative z-10 text-[1.12rem] sm:text-[1.2rem] font-serif font-bold text-[#112340] group-hover:text-[#0b5f78] transition-colors duration-700 ease-out mb-1.5 leading-snug text-center">
                      {service.title}
                    </h3>

                    {/* Service Description with Fixed 3-Line Height */}
                    <p className="relative z-10 text-xs sm:text-[0.85rem] text-gray-500 group-hover:text-gray-700 transition-colors duration-700 ease-out leading-relaxed mb-5 line-clamp-3 text-center">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Circular Arrow Button - Always Fixed at Same Baseline */}
                  <div className="relative z-10 flex justify-center mt-auto pt-2">
                    <div className="w-10 h-10 rounded-full bg-[#16788f] group-hover:bg-[#1CB6E6] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(22,120,143,0.3)] group-hover:shadow-[0_6px_18px_rgba(28,182,230,0.45)] group-hover:scale-110 transition-all duration-700 ease-out">
                      <FiArrowRight className="text-base group-hover:translate-x-0.5 transition-transform duration-700 ease-out" />
                    </div>
                  </div>

                </Link>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
};

export default ServiceCard;