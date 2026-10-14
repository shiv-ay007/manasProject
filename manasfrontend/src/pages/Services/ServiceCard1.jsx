import React, { useEffect } from 'react';
import pattern from '../../assets/about/pattern-3.png';
import image1 from '../../assets/service/hineria.png';
import image2 from '../../assets/service/liver_.png';
import image3 from '../../assets/service/pancreas.png';
import image4 from '../../assets/service/stomach-cancer.png';
import image5 from '../../assets/service/gallbladder.png';
import image6 from '../../assets/service/Antireflux1.png';
import image7 from '../../assets/service/digestive-system.png';
import image8 from '../../assets/service/colorrecutm1.png';
import image9 from '../../assets/service/instenstine.jpg';
import image10 from '../../assets/service/servicephoto/ch.jpeg'
import image11 from '../../assets/service/servicephoto/gbd.jpeg'
import image12 from '../../assets/service/servicephoto/livc.jpeg'
import image13 from '../../assets/service/servicephoto/livmas.jpg'
import image14 from '../../assets/service/servicephoto/panc.webp'
import image15 from '../../assets/service/servicephoto/psto.jpeg'
import image16 from '../../assets/service/servicephoto/sc.jpeg'
import image17 from '../../assets/service/servicephoto/uh.jpeg'

// import image8 from '../../assets/service/digestive-system.png';

import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const services = [
  {
    img: image7,
    title: 'Gallbladder Stones',
    description: 'Comprehensive treatment for gallstones, addressing symptoms like pain, nausea, and digestive discomfort. Includes procedures for removing stones and managing bile duct issues.',
    link: '/treatment/gallbladder/gallbladderstones',
  },
  {
    img: image10,
    title: 'Gallbladder Cancer',
    description: 'Gallbladder cancer begins in the small organ under the liver that stores bile. Early detection is critical for improved treatment outcomes.',
    link: '/treatment/gallbladder/gallbladdercancer',
  },
  {
    img: image11,
    title: 'Bile Duct Injury',
    description: 'Bile duct injuries can lead to complications in bile drainage, impacting digestion. We provide specialized care for bile duct repair and recovery.',
    link: '/treatment/gallbladder/Bileductinjury',
  },
  {
    img: image1,
    title: 'Inguinal Hernia',
    description: 'An inguinal hernia occurs when a portion of the intestine pushes through a weak spot in the abdominal muscles. Our treatments focus on minimally invasive surgery for quick recovery.',
    link: '/treatment/hernia/Inguinalhernial',
  },
  {
    img: image1,
    title: 'Ventral/Incisional Hernia',
    description: 'A ventral hernia can develop at the site of previous surgery. Our approach combines advanced surgical techniques with post-op care for hernia repair.',
    link: '/treatment/hernia/Ventralhernia',
  },
  {
    img: image1,
    title: 'Umbilical Hernia',
    description: 'Umbilical hernias typically occur in infants but can also affect adults. We offer safe and effective surgical treatments tailored to all age groups.',
    link: '/treatment/hernia/Umbilicalhernia',
  },
  {
    img: image4,
    title: 'Stomach Polyps',
    description: 'Stomach polyps are abnormal growths in the stomach lining. While most are benign, we focus on early detection to prevent complications like stomach cancer.',
    link: '/treatment/stomach-cancer/polyps',
  },
  {
    img: image4,
    title: 'Stomach Cancer',
    description: 'Stomach cancer, often slow-growing, may be mistaken for common digestive issues. Early diagnosis and a personalized treatment plan are key to effective management.',
    link: '/treatment/stomach-cancer/cancer',
  },
  {
    img: image3,
    title: 'Pancreas Stones',
    description: 'Pancreatic stones can block digestive enzymes, causing pain and inflammation. Our treatments focus on resolving blockages and restoring normal pancreas function.',
    link: '/treatment/pancreas/pancreaticestones',
  },
  {
    img: image3,
    title: 'Pancreas Cancer',
    description: 'Pancreatic cancer is a challenging condition with few early symptoms. Our team provides specialized care, including surgery, chemotherapy, and targeted therapies.',
    link: '/treatment/pancreas/pancreaticcancer',
  },
  {
    img: image1,
    title: 'Whipple Surgery',
    description: 'Whipple surgery is a complex procedure for treating pancreatic cancer and other serious conditions. Our skilled surgeons ensure the best outcomes with expert care.',
    link: '/treatment/pancreas/whipple',
  },
  {
    img: image9,
    title: 'Obstruction, Strictures',
    description: 'We manage intestinal obstructions and strictures that can lead to severe digestive issues, offering surgical and non-surgical treatment options.',
    link: '/treatment/intestine/obstruction',
  },
  {
    img: image9,
    title: 'Intestine Cancer',
    description: 'Intestine cancer can disrupt normal bowel function. Early detection and comprehensive treatment are crucial for preventing further complications.',
    link: '/treatment/intestine/instestinecancer',
  },
  {
    img: image9,
    title: 'Intestine Perforation',
    description: 'An intestine perforation is a medical emergency. Our team is equipped to provide immediate care and repair, preventing life-threatening infections.',
    link: '/treatment/intestine/perforation',
  },
  {
    img: image8,
    title: 'Colon and Rectum Polyps',
    description: 'Polyps in the colon or rectum can develop into cancer if untreated. We provide screenings and removal services for early prevention.',
    link: '/treatment/colon-rectum/rectumpolyps',
  },
  {
    img: image8,
    title: 'Inflammatory Bowel Diseases',
    description: 'We manage conditions like Crohn’s disease and ulcerative colitis that cause chronic inflammation in the digestive tract with personalized care plans.',
    link: '/treatment/colon-rectum/inflammatoryboweldiseases',
  },
  {
    img: image8,
    title: 'Colon and Rectum Cancer',
    description: 'Colon cancer is highly treatable if caught early. We focus on early detection, surgery, and advanced therapies to ensure the best outcomes.',
    link: 'treatment/colon-rectum/rectumcancer',
  },
  {
    img: image2,
    title: 'Liver Cysts/Hydatid Cysts',
    description: 'Hydatid cysts in the liver can grow due to parasitic infections. We provide both medical and surgical treatments to remove cysts safely.',
    link: '/treatment/liver/livercysts',
  },
  {
    img: image12,
    title: 'Liver Cancer',
    description: 'Liver cancer can spread quickly, making early diagnosis and treatment essential. We offer surgical, chemotherapy, and radiotherapy solutions.',
    link: '/treatment/liver/livercancer',
  },
  {
    img: image13,
    title: 'Liver Masses',
    description: 'Liver masses can be benign or malignant. Our specialists use advanced imaging and biopsies to diagnose and treat all types of liver masses effectively.',
    link: '/treatment/liver/livermass',
  },
];



const ServiceCard1 = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="relative bg-gray-100 pt-10 pb-6">
      <div
        className="absolute"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          opacity: 0.1, // Adjust opacity to a reasonable level
          width: '30%',
          top: '0',
          bottom: '0',
          right: '0',
        }}
      ></div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto p-8 md:p-12">
        <div className='text-start md:text-center flex flex-col md:items-center justify-center'>
          <h2 className="font-bold mb-4 transition duration-300 transform">
            What We Provide Treatment
          </h2>
          <h1 className="mb-8 lg:w-1/2 lg:text-center">We Deliver Best Quality Care Treatment in Lucknow</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg group overflow-hidden border-l-2 border-[#7fbe49] cursor-pointer"
              data-aos="fade-up" // Add AOS attribute for animation
              data-aos-duration="500" // Animation duration (faster)
              data-aos-delay={index * 50} // Reduce stagger delay (faster appearance)
            >
              {/* Blue gradient background with transition effect (Right to Left) */}
              <div
                className="absolute inset-0 bg-gradient-to-l from-[#1f708e] to-[#0f4558] transform -translate-x-full transition-transform duration-700 group-hover:translate-x-0"
              ></div>

              {/* Card content */}
              <div className="relative z-10 text-gray-900 group-hover:text-white transition-colors duration-500 cur">
                <div className="text-5xl mb-4">
                  <img src={service?.img} alt="" className='h-[5rem] w-[5rem] object-cover'/>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="mb-4">{service.description}</p>
                <a href={service.link} className="text-[#79C23E] hover:text-red-300">
                  Read More &raquo;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCard1;