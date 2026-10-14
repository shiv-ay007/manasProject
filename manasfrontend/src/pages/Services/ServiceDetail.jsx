import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaHeartbeat, FaSyringe, FaStethoscope, FaClipboardList, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import image1 from '../../assets/service/servicedetails/service1.jpg'; // Example image
import image2 from '../../assets/service/servicedetails/service2.jpg'; // Example image
import gstones from '../../assets/service/Treatment_Photo/gstones.webp'
import gcancer from '../../assets/service/Treatment_Photo/gcancer.avif'
import gbiles from '../../assets/service/Treatment_Photo/gbiles.jpg'
import ihernia from '../../assets/service/Treatment_Photo/inghernia.png'
import vhernia from '../../assets/service/Treatment_Photo/vhernia.jpg'
import uhernia from '../../assets/service/Treatment_Photo/uhernia_1.jpeg'
import scancer from '../../assets/service/Treatment_Photo/scancer.jpg'
import spolp from '../../assets/service/Treatment_Photo/spolps.jpg'
import pstones from '../../assets/service/Treatment_Photo/pstones_.jpeg'
import pcancer from '../../assets/service/Treatment_Photo/pcancer.jpg'
import intcancer from '../../assets/service/Treatment_Photo/intesdisease.jpg'
import intesdis from '../../assets/service/Treatment_Photo/instobs.png'
import inteper from '../../assets/service/Treatment_Photo/intper.jpg'
import intercancer from '../../assets/service/Treatment_Photo/intcancer.jpg'
import crcancer from '../../assets/service/Treatment_Photo/crcancer_.jpg'
import infbow from '../../assets/service/Treatment_Photo/inflambowel.jpeg'
import  livdisease from '../../assets/service/Treatment_Photo/idisease.jpeg'
import  antire from '../../assets/service/Treatment_Photo/Antireflux.jpeg'
import  livercancer from '../../assets/service/Treatment_Photo/livercancer.jpeg'
import  livermass from '../../assets/service/Treatment_Photo/livermass.jpeg'
import  livercryst from '../../assets/service/Treatment_Photo/livercysts.webp'
import d1d1 from '../../assets/service/Treatment_Photo/colonrecutm.jpeg'
import whiplesurgery from '../../assets/service/Treatment_Photo/wsurgery.jpeg'
import weightlossurgery from '../../assets/service/Treatment_Photo/stomach.jpeg'
import robotic from '../../assets/service/servicephoto/robotic.png'
import hemorrhoidsImage from '../../assets/service/Treatment_Photo/haemorrhoids.jpg'
import fiser from '../../assets/service/Treatment_Photo/fisser.jpg'
import fastal from '../../assets/service/Treatment_Photo/fastal.jpg'
import umbnew from '../../assets/service/servicedetails/umbilicalnew.jpeg'
import pannew from '../../assets/service/servicedetails/pannew.jpeg'
import wilnew from '../../assets/service/servicedetails/whilnew.jpeg'
import vannew from '../../assets/service/servicedetails/ventalnew.jpeg'
import bilenew from '../../assets/service/servicedetails/bilenew.jpeg'

// import BreadCrumbs from '../../Component/BreadCums';
import ServiceImage from './ServiceImages';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { motion } from "framer-motion"; // For entrance animations
import { MdKeyboardArrowRight } from 'react-icons/md';

import AOS from 'aos'; // Import AOS as an asset
import 'aos/dist/aos.css'; // Import AOS styles
import { Helmet } from 'react-helmet';
import Container from '../../utlis/Container';

const BreadCrumbs = ({ items, headText ,image,text}) => {

  console.log(image);
  
  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center py-16 lg:py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }} // Background image
      data-aos="fade-in" // Add AOS effect here
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Heading */}
      <h1 className="text-white text-center relative z-20 sora-600 px-4 mb-4 " data-aos="fade-up">
        {headText}
      </h1>

      {/* Breadcrumb navigation */}
      <nav className="flex items-center relative z-20 space-x-1 px-4 text-gray-300 text-sm lg:text-base">
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-white">
                <MdKeyboardArrowRight className="text-lg lg:text-xl mt-[0.2rem]" />
              </span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-white transition-colors"
                data-aos="fade-left" // Add AOS effect here
                data-aos-delay={index * 100} // Stagger effects
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-white" data-aos="fade-right">
                {text}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};


const services = [


  {
    id: 1,
    name: 'Gallstones',
    icon: <FaArrowAltCircleRight />,
    images: [gstones],
    link:'gallbladderstones',
    description: `Gallstones are hardened deposits of bile that can form in your gallbladder. They can vary in size and may lead to digestive issues if they obstruct bile flow.`,
    types: [
        {
            title: 'Cholesterol Gallstones',
            details: `The most common type, typically yellow and primarily made of undissolved cholesterol. They can range in size from a grain of sand to a golf ball.`,
        },
        {
            title: 'Pigment Gallstones',
            details: `Dark brown or black stones formed from excess bilirubin in the bile, often linked to liver conditions or blood disorders.`,
        },
    ],
    treatment: {
        overview: `Treatment may not be necessary for asymptomatic gallstones. For symptomatic cases, options include dietary changes, medications, or surgical removal of the gallbladder.`,
        details: [
            {
                title: 'Surgical Interventions',
                description: `Laparoscopic cholecystectomy is the most common surgery for symptomatic gallstones, aiming to relieve pain and prevent complications.`,
            },
            {
                title: 'Medications',
                description: `Some medications can dissolve cholesterol gallstones but may take a long time to work and are not always effective.`,
            },
            {
                title: 'Lifestyle and Dietary Changes',
                description: `A low-fat, high-fiber diet and regular physical activity can help prevent gallstones and manage symptoms effectively.`,
            },
        ],
    },
    causes: [
        'Excess cholesterol in bile.',
        'Increased bilirubin levels due to liver conditions.',
        'Inadequate emptying of the gallbladder.',
    ],
    symptoms: [
        'Sudden, intense pain in the upper right abdomen or center.',
        'Radiating pain to the back or right shoulder.',
        'Nausea and vomiting.',
    ],
  },

{
  id: 2,
  name: 'Gallbladder Cancer',
  link:'gallbladdercancer',
  icon: <FaArrowAltCircleRight />,
  images: [gcancer],
  description: `Gallbladder cancer is a growth of cells that begins in the gallbladder, a small organ that stores bile for digestion. Although not common, early diagnosis improves the chance for a cure. Unfortunately, most cases are found at an advanced stage, leading to a poor prognosis.`,
  types: [
      {
          title: 'Gallstones',
          details: `Hardened deposits of digestive fluid that can form in the gallbladder, causing severe pain and may require surgical removal.`,
      },
      {
          title: 'Gallbladder Cancer',
          details: `A rare but aggressive cancer that may cause few symptoms until it has advanced. Early detection is crucial for effective treatment.`,
      },
      {
          title: 'Bile Duct Injury',
          details: `Injuries to the bile duct during gallbladder surgery can lead to complications requiring additional surgical interventions.`,
      },
  ],
  treatment: {
      overview: `Treatment may include medications, lifestyle changes, and surgical interventions. Dr. Manas Aggarwal provides comprehensive care for managing gallbladder conditions.`,
      details: [
          {
              title: 'Cholecystectomy',
              description: `Surgical removal of the gallbladder, often performed laparoscopically for quicker recovery.`,
          },
          {
              title: 'Medications',
              description: `Certain medications can help dissolve gallstones, but surgery is often required for significant symptoms.`,
          },
      ],
  },
  causes: [
      `Gallbladder cancer begins when healthy cells develop DNA changes, causing rapid growth and the formation of tumors. Most cases start in the glandular cells lining the gallbladder, referred to as adenocarcinoma.`,
      `Risk factors include being female, increasing age, a history of gallstones, and chronic inflammation of the gallbladder or bile ducts.`,
  ],
  symptoms: [
      `Many cases are asymptomatic; however, when symptoms occur, they may include:`,
      `Belly pain, primarily in the upper right section.`,
      `Belly bloating.`,
      `A mass that can be felt through the skin.`,
      `Unintentional weight loss.`,
      `Yellowing of the skin and eyes (jaundice), typically indicating advanced cancer.`,
  ],
},

{
  id: 3,
  name: 'Gallbladder Bile Duct Injury',
  link:'Bileductinjury',
  icon: <FaArrowAltCircleRight />,
  images: [bilenew],
  description: `Gallbladder diseases can affect the digestion and absorption of fats. Conditions may include gallstones, inflammation, and cancer.`,
  
  types: [
    {
      title: 'Gallstones',
      details: `Gallstones are hardened deposits of digestive fluid that can form in your gallbladder. They can cause severe pain and may require surgical removal.`,
    },
    {
      title: 'Gallbladder Cancer',
      details: `A rare but aggressive cancer that can occur in the gallbladder. Early diagnosis is critical for effective treatment.`,
    },
    {
      title: 'Bile Duct Injury',
      details: `Injuries to the bile duct can occur during gallbladder surgery, leading to complications that may require additional surgery to repair.`,
    },
  ],

  treatment: {
    overview: `Treatment for gallbladder diseases may include medications, lifestyle changes, and surgical interventions. Dr. Manas Aggarwal provides comprehensive care to manage these conditions.`,
    
    details: [
      {
        title: 'Cholecystectomy',
        description: 'Surgical removal of the gallbladder, often done laparoscopically for quicker recovery.',
      },
      {
        title: 'Medications',
        description: 'Certain medications can help dissolve gallstones, but surgery is often required for significant symptoms.',
      },
    ],
  },

  causes: [
    'Obesity and high-fat diet.',
    'Age and gender (more common in women).',
    'Family history of gallstones.',
  ],

  symptoms: [
    'Sudden pain in the upper right abdomen.',
    'Nausea or vomiting.',
    'Jaundice (yellowing of the skin).',
    'Pain between shoulder blades.',
    'Pain in the right shoulder.',
  ],
},


{
  id: 4,
  name: 'Inguinal Hernia',
  link:'Inguinalhernial',
  icon: <FaArrowAltCircleRight />,
  images: [ihernia],
  description: 'Hernias occur when an organ pushes through an opening in the muscle or tissue that holds it in place. Common types include inguinal, ventral, and umbilical hernias.',
  types: [
    {
      title: 'Inguinal Hernia',
      details: 'Occurs in the inner groin when tissue protrudes through a weak spot in the abdominal muscles.',
    },
    {
      title: 'Ventral/Incisional Hernia',
      details: 'Occurs through a previous surgical incision. Risk factors include obesity, diabetes, and smoking.',
    },
    {
      title: 'Umbilical Hernia',
      details: 'Fatty tissue or part of the intestine protrudes through the abdominal wall near the belly button.',
    },
  ],
  treatment: {
    overview: 'Hernias can be repaired surgically. Dr. Manas Aggarwal provides personalized treatment plans based on the hernia type and severity.',
    details: [
      {
        title: 'Open Surgery',
        description: 'Involves a larger incision to repair the hernia.',
      },
      {
        title: 'Laparoscopic Surgery',
        description: 'Minimally invasive approach with smaller incisions and faster recovery times.',
      },
    ],
  },
  causes: [
    'Heavy lifting and straining.',
    'Obesity and poor nutrition.',
    'Chronic coughing or sneezing.',
  ],
  symptoms: [
    'Visible bulge in the affected area.',
    'Pain or discomfort, especially when lifting.',
    'A feeling of heaviness in the abdomen.',
  ],
},

{
    id: 5,
    name: 'Ventral/Incisional hernia',
    link:'Ventralhernia',
    icon: <FaArrowAltCircleRight/>,
    images: [vannew],
    description: `Hernias occur when an organ pushes through an opening in the muscle or tissue that holds it in place. Common types include inguinal, ventral, and umbilical hernias.`,
    types: [
      {
        title: 'Inguinal Hernia',
        details: `The most common type, occurring in the inner groin. It happens when tissue protrudes through a weak spot in the abdominal muscles.`,
      },
      {
        title: 'Ventral/Incisional Hernia',
        details: `Occurs through a previous surgical incision site. Risk factors include obesity, diabetes, and smoking.`,
      },
      {
        title: 'Umbilical Hernia',
        details: `Occurs when fatty tissue or a part of the intestine protrudes through the abdominal wall near the belly button.`,
      },
    ],
    treatment: {
      overview: `Hernias can be repaired surgically. Dr. Manas Aggarwal provides personalized treatment plans based on the type and severity of the hernia.`,
      details: [
        {
          title: 'Open Surgery',
          description: 'Involves a larger incision to repair the hernia.',
        },
        {
          title: 'Laparoscopic Surgery',
          description: 'Minimally invasive approach with smaller incisions and faster recovery times.',
        },
      ],
    },
    causes: [
      'Heavy lifting and straining.',
      'Obesity and poor nutrition.',
      'Chronic coughing or sneezing.',
    ],
    symptoms: [
      'Visible bulge in the affected area.',
      'Pain or discomfort, especially when lifting.',
      'A feeling of heaviness in the abdomen.',
]
},


{
  id: 6,
  name: 'Umbilical Hernia',
  link:'Umbilicalhernia',
  icon: <FaArrowAltCircleRight />,
  images: [umbnew],
  description: `Hernias occur when an organ pushes through an opening in the muscle or tissue that holds it in place. Common types include inguinal, ventral, and umbilical hernias.`,
  types: [
    {
      title: 'Inguinal Hernia',
      details: `The most common type, occurring in the inner groin. It happens when tissue protrudes through a weak spot in the abdominal muscles.`,
    },
    {
      title: 'Ventral/Incisional Hernia',
      details: `Occurs through a previous surgical incision site. Risk factors include obesity, diabetes, and smoking.`,
    },
    {
      title: 'Umbilical Hernia',
      details: `Occurs when fatty tissue or a part of the intestine protrudes through the abdominal wall near the belly button.`,
    },
  ],
  treatment: {
    overview: `Hernias can be repaired surgically. Dr. Manas Aggarwal provides personalized treatment plans based on the type and severity of the hernia.`,
    details: [
      {
        title: 'Open Surgery',
        description: 'Involves a larger incision to repair the hernia.',
      },
      {
        title: 'Laparoscopic Surgery',
        description: 'Minimally invasive approach with smaller incisions and faster recovery times.',
      },
    ],
  },
  causes: [
    'Heavy lifting and straining.',
    'Obesity and poor nutrition.',
    'Chronic coughing or sneezing.',
  ],
  symptoms: [
    'Visible bulge in the affected area.',
    'Pain or discomfort, especially when lifting.',
    'A feeling of heaviness in the abdomen.',
  ],
},



{
  id: 7,
  name: 'Stomach Cancer',
  link:'cancer',
  icon: <FaArrowAltCircleRight />,
  images: [scancer],
  description: `Stomach cancer, also known as gastric cancer, occurs when malignant cells form in the lining of the stomach. It can grow slowly, and symptoms can often be mistaken for indigestion or ulcers. Early detection is crucial for effective treatment and to prevent spread to other organs.`,
  types: [
      {
          title: 'Gastric Polyps',
          details: `Growths on the stomach lining that can become cancerous. Regular monitoring is advised.`,
      },
      {
          title: 'Adenocarcinoma',
          details: `The most common type, originating from mucus-producing cells in the stomach lining.`,
      },
      {
          title: 'Carcinoid Tumors',
          details: `Start in neuroendocrine cells and can produce hormones that lead to flushing and diarrhea.`,
      },
      {
          title: 'Gastrointestinal Stromal Tumors (GIST)',
          details: `Rare tumors that originate in the stomach wall's nerve cells.`,
      },
      {
          title: 'Lymphoma',
          details: `Cancer that begins in immune system cells and can occur in the stomach.`,
      },
  ],
  treatment: {
      overview: `Cleveland Clinic utilizes a collaborative approach to treat stomach cancer with the latest methods, including surgery, chemotherapy, and innovative therapies like HIPEC.`,
      details: [
          {
              title: 'Surgery',
              description: `May involve partial or total removal of the stomach, depending on cancer's extent. Minimally invasive options are available.`,
          },
          {
              title: 'Chemotherapy',
              description: `Drugs used to destroy cancer cells, applicable before or after surgery.`,
          },
          {
              title: 'Radiation Therapy',
              description: `Used to shrink tumors or eliminate remaining cancer cells post-surgery.`,
          },
          {
              title: 'Immunotherapy and Targeted Therapy',
              description: `New treatments that harness the immune system or target specific characteristics of cancer cells.`,
          },
      ],
  },
  causes: [
      'Smoking and alcohol consumption.',
      'Diet low in fruits and vegetables.',
      'Family history of stomach cancer.',
  ],
  symptoms: [
      'Persistent stomach pain.',
      'Nausea and vomiting.',
      'Difficulty swallowing.',
      'Unexplained weight loss.',
  ],
},



{
  id: 8,
  name: 'Stomach Polyps',
  link:'polyps',
  icon: <FaArrowAltCircleRight />, // Icon provided
  images: [spolp], // Array of images
  description: `Stomach polyps, also known as gastric polyps, are masses of cells that form on the lining of the stomach. While most are harmless, certain types can increase the risk of stomach cancer, making early detection crucial for effective treatment.`,
  types: [
    {
      title: 'Gastric Polyps',
      details: `Growths on the stomach lining that can be benign but require regular monitoring due to potential risk of cancer. They are often discovered incidentally during examinations for other conditions.`,
    },
    {
      title: 'Gastric Cancer',
      details: `A malignant tumor that develops from the cells of the stomach lining. Symptoms can be vague and include persistent stomach pain, nausea, and unexplained weight loss. Early detection is essential for improving treatment outcomes.`,
    },
  ],
  treatment: {
    overview: `Treatment options may include monitoring, surgical removal of polyps, and addressing underlying causes. Early intervention is vital for better outcomes.`,
    details: [
      {
        title: 'Surgery',
        description: 'May involve partial or total removal of the stomach, depending on the type and stage of the polyp or cancer.',
      },
      {
        title: 'Medication Management',
        description: 'Discontinuing certain medications, such as proton pump inhibitors, may be necessary for managing fundic gland polyps, especially those larger than 1 cm.',
      },
    ],
  },
  causes: [
    'Long-lasting stomach inflammation (gastritis), which can lead to hyperplastic polyps and adenomas.',
    'Infection with Helicobacter pylori bacteria, contributing to gastritis and subsequent polyp formation.',
    'Familial adenomatous polyposis, a rare genetic condition that increases the risk of developing gastric polyps and cancer.',
    'Regular use of proton pump inhibitors, which can lead to fundic gland polyps.',
  ],
  symptoms: [
    'Typically asymptomatic, but larger polyps may cause symptoms such as:',
    'Pain or tenderness in the stomach area.',
    'Nausea and vomiting.',
    'Blood in stool, which may indicate a more serious condition.',
    'Anemia resulting from chronic blood loss.',
  ],
},



{
  id: 9,
  name: 'Pancreatic Stones',
  link:'pancreaticestones',
  icon: <FaArrowAltCircleRight />,
  images: [pannew],
  description: `Pancreatic diseases affect the pancreas, which plays a key role in digestion and blood sugar regulation. Conditions such as pancreatic stones and pancreatic cancer can significantly impact health.`,
  types: [
    {
      title: 'Pancreatic Stones',
      details: `Hardened deposits that form in the pancreas, leading to digestive issues and severe pain. They can block the pancreatic duct and require medical intervention.`,
    },
    {
      title: 'Pancreatic Cancer',
      details: `A highly aggressive and often late-detected cancer of the pancreas. Due to the lack of early symptoms, it often has a poor prognosis.`,
    },
  ],
  treatment: {
    overview: `Treatment approaches vary depending on the condition and severity, ranging from medications and dietary changes to surgical procedures for serious cases.`,
    details: [
      {
        title: 'Surgery',
        description: 'Surgical removal of pancreatic stones or tumors is required in severe cases to restore function and relieve symptoms.',
      },
      {
        title: 'Medications',
        description: 'Medications focus on pain relief and managing symptoms like digestive issues.',
      },
    ],
  },
  causes: [
    'Chronic pancreatitis and inflammation of the pancreas.',
    'Smoking and obesity, both contributing to pancreatic diseases.',
    'A family history of pancreatic cancer can increase the risk.',
  ],
  symptoms: [
    'Severe and persistent abdominal pain.',
    'Unexplained weight loss and digestive problems.',
    'Diarrhea and difficulty processing food.',
  ],
},



 {
    id: 10,
    name: 'Pancreatic Cancer',
    link:'pancreaticcancer',
    icon: <FaArrowAltCircleRight />,
    images: [pcancer],
    description: `Pancreatic cancer is a highly aggressive malignancy that arises in the pancreas, an organ crucial for digestion and blood sugar regulation. This type of cancer often goes undetected in its early stages, leading to a late diagnosis and challenging treatment options.`,
    types: [
        {
            title: 'Pancreatic Cancer',
            details: `A highly aggressive cancer that can be difficult to detect early. Symptoms often appear late, leading to a poor prognosis. Early detection and treatment are crucial for improving outcomes.`,
        },
        {
            title: 'Pancreatic Stones',
            details: `Hardened deposits that can form in the pancreas, leading to severe abdominal pain and digestive issues. These stones may require surgical intervention if they cause significant symptoms.`,
        },
    ],
    treatment: {
        overview: `Cleveland Clinic Florida offers a multidisciplinary approach to treat pancreatic cancer, focusing on personalized care and innovative therapies tailored to each patient's needs.`,
        details: [
            {
                title: 'Surgery',
                description: `Surgical procedures, including Whipple surgery or distal pancreatectomy, may be necessary to remove tumors or stones, depending on the cancer's stage and location.`,
            },
            {
                title: 'Chemotherapy',
                description: `Medications used to destroy cancer cells, typically administered after surgery or for advanced cancer to manage symptoms and prolong life.`,
            },
            {
                title: 'Radiation Therapy',
                description: `Used to shrink tumors or alleviate pain, often combined with other treatments for enhanced effectiveness.`,
            },
            {
                title: 'Palliative Care',
                description: `Focused on improving quality of life for patients, addressing symptoms like pain, nausea, and emotional support throughout treatment.`,
            },
        ],
    },
    causes: [
        'Chronic pancreatitis, which can increase the risk of pancreatic cancer.',
        'Smoking and obesity, both significant risk factors.',
        'Family history of pancreatic cancer or genetic mutations.',
        'Diabetes, particularly newly diagnosed, may indicate underlying pancreatic issues.',
    ],
    symptoms: [
        'Severe abdominal pain, often radiating to the back.',
        'Unexplained weight loss without trying.',
        'Digestive issues such as diarrhea or jaundice.',
        'Loss of appetite and general fatigue.',
    ],
},




  {
    id: 11,
    name: 'Intestinal Diseases',
    link:'obstruction',
    icon: <FaArrowAltCircleRight/>,
    images: [intcancer],
    description: `Intestinal diseases encompass a variety of conditions that affect the intestines, including obstructions, strictures, and cancer.`,
    types: [
      {
        title: 'Intestinal Obstruction',
        details: `A blockage that prevents food or liquid from passing through the intestines. Symptoms include severe pain and vomiting.`,
      },
      {
        title: 'Strictures',
        details: `Narrowing of the intestines that can lead to obstruction and require surgical intervention.`,
      },
      {
        title: 'Intestinal Cancer',
        details: `Malignant tumors that develop in the intestines. Early detection is key to improving survival rates.`,
      },
    ],
    treatment: {
      overview: `Management may involve surgery, dietary modifications, and medications. A tailored treatment plan is essential for optimal care.`,
      details: [
        {
          title: 'Surgical Repair',
          description: 'Involves removing blockages or repairing strictures in the intestines.',
        },
        {
          title: 'Nutritional Support',
          description: 'Adjustments to diet to aid in digestion and nutrition absorption.',
        },
      ],
    },
    causes: [
      'Chronic inflammatory diseases.',
      'Genetic predisposition.',
      'Poor diet and lifestyle choices.',
    ],
    symptoms: [
      'Abdominal pain and swelling.',
      'Changes in bowel habits.',
      'Nausea and vomiting.',
    ],
  },



  {
    id: 12,
    name: 'Intestinal Obstruction, Strictures',
    link:'obstruction',
    icon: <FaArrowAltCircleRight />,
    images: [intesdis],
    description: `Intestinal diseases encompass various conditions affecting the intestines, including obstructions, strictures, and cancer.`,
    types: [
      {
        title: 'Intestinal Obstruction',
        details: `A blockage that prevents food or liquids from moving through the intestines, often causing severe pain, vomiting, and other digestive issues.`,
      },
      {
        title: 'Strictures',
        details: `Narrowing of the intestines, which can result in obstructions and may require surgical intervention.`,
      },
      {
        title: 'Intestinal Cancer',
        details: `Malignant tumors in the intestines. Early detection is crucial for improving survival rates and treatment success.`,
      },
    ],
    treatment: {
      overview: `Treatment may include surgery, dietary adjustments, and medications. Personalized care is critical for effective management of these conditions.`,
      details: [
        {
          title: 'Surgical Repair',
          description: 'Surgical procedures to remove obstructions or repair strictures in the intestines.',
        },
        {
          title: 'Nutritional Support',
          description: 'Dietary changes to support digestion and enhance nutrient absorption during recovery.',
        },
      ],
    },
    causes: [
      'Chronic inflammatory conditions, such as Crohn’s disease.',
      'Genetic predisposition to intestinal issues.',
      'Unhealthy diet and lifestyle factors.',
    ],
    symptoms: [
      'Severe abdominal pain and swelling.',
      'Nausea, vomiting, and changes in bowel movements.',
      'Difficulty passing gas or having a bowel movement.',
    ],
  },
  



  {
    id: 13,
    name: 'Intestine-Perforation',
    link:'perforation',
    icon: <FaArrowAltCircleRight />,
    images: [inteper],
    description: `Intestinal perforation occurs when there is a hole in the wall of the intestine, which can lead to serious complications. It may result from conditions such as intestinal ischemia, strictures, or cancer, and requires immediate medical attention to prevent severe infections and further health risks.`,
    types: [
      {
        title: 'Intestinal Obstruction',
        details: `A blockage that prevents food or liquid from passing through the intestines. Symptoms include severe pain and vomiting.`,
      },
      {
        title: 'Strictures',
        details: `Narrowing of the intestines that can lead to obstruction and require surgical intervention.`,
      },
      {
        title: 'Intestinal Cancer',
        details: `Malignant tumors that develop in the intestines. Early detection is key to improving survival rates.`,
      },
    ],
    treatment: {
      overview: `Management may involve surgery, dietary modifications, and medications. A tailored treatment plan is essential for optimal care.`,
      details: [
        {
          title: 'Surgical Repair',
          description: 'Involves removing blockages or repairing strictures in the intestines.',
        },
        {
          title: 'Nutritional Support',
          description: 'Adjustments to diet to aid in digestion and nutrition absorption.',
        },
      ],
    },
    causes: [
      'Chronic inflammatory diseases.',
      'Genetic predisposition.',
      'Poor diet and lifestyle choices.',
    ],
    symptoms: [
      'Abdominal pain and swelling.',
      'Changes in bowel habits.',
      'Nausea and vomiting.',
      'Sudden severe abdominal pain (in case of perforation).',
      'Bloody stools (indicating potential complications).',
    ],
  },
  



{
  id: 14,
  name: 'Intestine Cancer',
  link:'instestinecancer',
  icon: <FaArrowAltCircleRight />,
  images: [intercancer],
  description: `Intestine cancer is a rare form of cancer affecting the small or large intestine. It can include various types such as adenocarcinoma, sarcomas, carcinoid tumors, and lymphomas. Early diagnosis and treatment are key to improving outcomes.`,
  
  types: [
    {
      title: 'Adenocarcinoma',
      details: `A common type of small intestine cancer starting in the glandular epithelial cells lining the intestines. It often occurs in the duodenum and ileum, leading to blockages or obstruction.`,
    },
    {
      title: 'Carcinoid Tumors',
      details: `Slow-growing tumors that develop in neuroendocrine cells of the intestine. These often occur without symptoms, but when symptoms appear, they include flushing and abdominal pain.`,
    },
    {
      title: 'Lymphoma',
      details: `Cancer that begins in lymphocytes, a type of white blood cell found in the intestines. Lymphomas of the intestine may cause symptoms like abdominal pain, weight loss, and diarrhea.`,
    },
    {
      title: 'Gastrointestinal Stromal Tumor (GIST)',
      details: `A type of sarcoma that affects connective tissues in the intestines. These tumors are most common in the small intestine and may require targeted therapies.`,
    },
  ],

  treatment: {
    overview: `Treatment for intestine cancer varies depending on the type and stage of the cancer. Options may include surgery, chemotherapy, radiation therapy, and targeted therapies.`,
    details: [
      {
        title: 'Surgical Resection',
        description: 'Surgical removal of the tumor, which may include part of the intestine and nearby lymph nodes. In cases of obstruction, bypass surgery may also be necessary.',
      },
      {
        title: 'Chemotherapy and Radiation',
        description: 'Used to kill cancer cells, often after surgery, or in advanced cases where the cancer has spread.',
      },
      {
        title: 'Targeted Therapy',
        description: 'Treatments such as somatostatin analogs or immunotherapy are used for specific types of intestinal cancer, like carcinoid tumors and GISTs.',
      },
    ],
  },

  causes: [
    'Genetic mutations leading to abnormal cell growth.',
    'Chronic inflammation from conditions like Crohn’s disease or celiac disease.',
    'Inherited genetic conditions like Lynch syndrome and Peutz-Jeghers syndrome.',
    'Lifestyle factors such as diet high in red meat, smoking, and alcohol consumption.',
  ],

  symptoms: [
    'Abdominal pain or cramps.',
    'Unexplained weight loss.',
    'Nausea, vomiting, and diarrhea.',
    'Jaundice (yellowing of the skin and eyes).',
    'Bloody or black stool.',
    'Flushed skin or purple coloring in the arms and upper body.',
  ],
},



  {
    id: 15,
    name: 'Colon,Rectum-Polyps',
    link:'rectumpolyps',
    icon: <FaArrowAltCircleRight/>,
    images: [d1d1],
    description: `Colon and rectal diseases include a variety of conditions affecting the lower digestive tract, such as polyps, inflammatory bowel diseases, and cancer.`,
    types: [
      {
        title: 'Colon Polyps',
        details: `Growths on the inner lining of the colon that can potentially become cancerous. Regular screening is recommended.`,
      },
      {
        title: 'Inflammatory Bowel Diseases',
        details: `Conditions like Crohn's disease and ulcerative colitis that cause chronic inflammation in the digestive tract.`,
      },
      {
        title: 'Colon Cancer',
        details: `Malignant tumors in the colon. Early detection through screening can significantly improve outcomes.`,
      },
    ],
    treatment: {
      overview: `Treatment may involve surgery, medications, and lifestyle changes. A comprehensive approach is crucial for managing these diseases.`,
      details: [
        {
          title: 'Surgical Resection',
          description: 'Removal of cancerous sections of the colon or rectum may be necessary.',
        },
        {
          title: 'Medication Therapy',
          description: 'Drugs to manage inflammation and symptoms in inflammatory bowel diseases.',
        },
      ],
    },
    causes: [
      'Family history of colon cancer.',
      'Diet high in processed foods.',
      'Sedentary lifestyle.',
    ],
    symptoms: [
      'Changes in bowel habits.',
      'Abdominal pain and cramping.',
      'Unexplained weight loss.',
      'Rectal bleeding.',
    ],
  },


//  doubt
{
  id: 16, // Update the ID if needed
  name: 'Whipple Surgery',
  link: 'whilesurgery',
  icon: <FaArrowAltCircleRight />, // Keep or change the icon as needed
  images: [wilnew], // Update with relevant images for Whipple Surgery
  description: `Whipple Surgery, also known as pancreaticoduodenectomy, is a complex operation used to treat pancreatic cancer and other conditions affecting the pancreas, duodenum, and bile duct. It involves the removal of part of the pancreas, the duodenum, gallbladder, and part of the bile duct. Recovery can be extensive, and the surgery is often part of a comprehensive cancer treatment plan.`,
  types: [
    {
      title: 'Pancreatic Cancer',
      details: `Malignant tumors in the pancreas, which may necessitate Whipple Surgery for removal, especially if detected early.`,
    },
    {
      title: 'Chronic Pancreatitis',
      details: `Long-term inflammation of the pancreas that can lead to severe complications, sometimes requiring surgical intervention.`,
    },
    {
      title: 'Bile Duct Cancer',
      details: `Tumors that occur in the bile ducts, which may require Whipple Surgery if they are localized.`,
    },
  ],
  treatment: {
    overview: `Whipple Surgery is a major procedure that requires careful pre-operative evaluation and post-operative care. The goal is to remove the tumor and restore digestive function.`,
    details: [
      {
        title: 'Surgical Resection',
        description: 'Involves the removal of the head of the pancreas, duodenum, gallbladder, and a portion of the bile duct.',
      },
      {
        title: 'Nutritional Support',
        description: 'Post-surgery, patients may need specialized diets and supplements to manage changes in digestion.',
      },
      {
        title: 'Chemotherapy and Radiation',
        description: 'May be recommended as adjunctive treatment to manage cancer spread or recurrence.',
      },
    ],
  },
  causes: [
    'Family history of pancreatic cancer.',
    'Chronic pancreatitis or diabetes.',
    'Smoking and high-fat diets.',
    'Obesity and sedentary lifestyle.',
  ],
  symptoms: [
    'Jaundice (yellowing of the skin and eyes).',
    'Unexplained weight loss.',
    'Abdominal pain that radiates to the back.',
    'Nausea and vomiting.',
    'Changes in appetite.',
  ],
},

  



  {
    id: 17,
    name: 'Colon and Rectal Cancer',
    link:'rectumcancer',
    icon: <FaArrowAltCircleRight />,
    images: [crcancer],
    description: `Colon and rectal cancer, often referred to as colorectal cancer, includes malignant tumors that develop in the colon or rectum. This cancer arises from changes in the cells of the colon and can begin as non-cancerous growths called polyps. Early detection through screening is crucial for effective treatment and improved outcomes.`,
    types: [
        {
            title: 'Colon Polyps',
            details: `Non-cancerous growths on the inner lining of the colon. While most polyps don't cause symptoms, regular screening is essential for detection and removal to prevent cancer development.`,
        },
        {
            title: 'Inflammatory Bowel Diseases (IBD)',
            details: `Chronic conditions like Crohn's disease and ulcerative colitis that can increase the risk of developing colon cancer due to ongoing inflammation in the digestive tract.`,
        },
        {
            title: 'Colon Cancer',
            details: `Malignant tumors in the colon, which can lead to severe health complications if not detected early. Screening methods are recommended to identify cancer in its early stages when treatment is most effective.`,
        },
    ],
    treatment: {
        overview: `Treatment for colon and rectal cancer may involve a combination of surgery, chemotherapy, radiation therapy, and targeted therapies. A multidisciplinary approach tailored to the individual is essential for effective management.`,
        details: [
            {
                title: 'Surgical Resection',
                description: `Removal of the tumor and surrounding healthy tissue. This may involve partial or total colectomy, depending on the cancer's stage and location.`,
            },
            {
                title: 'Chemotherapy',
                description: `Systemic treatment using drugs to destroy cancer cells, often used post-surgery to eliminate any remaining cells and reduce the risk of recurrence.`,
            },
            {
                title: 'Radiation Therapy',
                description: `Using high-energy rays to target and kill cancer cells, commonly employed in rectal cancer treatment or to shrink tumors before surgery.`,
            },
            {
                title: 'Targeted Therapy and Immunotherapy',
                description: `Medications designed to specifically target cancer cell pathways or boost the immune system's ability to fight cancer. These are often used in advanced stages of colon cancer.`,
            },
        ],
    },
    causes: [
        `While the exact cause of colon cancer remains unclear, it often involves DNA mutations in colon cells that lead to uncontrolled growth and tumor formation.`,
        'Age: Most cases occur in people over 50, but incidence among younger adults is rising.',
        'Family history: A personal or family history of colon cancer or polyps increases risk.',
        'Inflammatory bowel diseases: Conditions such as ulcerative colitis and Crohn\'s disease heighten the risk.',
        'Inherited syndromes: Genetic conditions like familial adenomatous polyposis and Lynch syndrome are significant risk factors.',
        'Diet: Low-fiber, high-fat diets with excess processed meats may contribute to higher risks.',
        'Lifestyle factors: Obesity, physical inactivity, smoking, and excessive alcohol consumption have all been associated with increased risk.',
    ],
    symptoms: [
        'Changes in bowel habits, including persistent diarrhea or constipation.',
        'Rectal bleeding or blood in the stool, which may appear dark or bright red.',
        'Ongoing discomfort in the abdominal area, such as cramps, gas, or pain.',
        'Feeling that the bowel doesn\'t completely empty during a bowel movement.',
        'Weakness or fatigue, potentially due to anemia from blood loss.',
        'Unexplained weight loss, which can be a sign of advanced cancer.',
    ],
},




{
    id: 18,
    name: 'Inflammatory Bowel Diseases',
    link:'inflammatoryboweldiseases',
    icon: <FaArrowAltCircleRight />,
    images: [infbow],
    description: `Inflammatory bowel disease (IBD) is a term for a group of conditions that cause chronic inflammation of the gastrointestinal tract, including Crohn's disease and ulcerative colitis. These conditions lead to severe abdominal pain, diarrhea, and other complications, requiring careful management and treatment.`,
    types: [
        {
            title: 'Crohn\'s Disease',
            details: `A type of IBD that can affect any part of the gastrointestinal tract, from the mouth to the anus, causing inflammation that can penetrate deep into the layers of the affected tissue.`,
        },
        {
            title: 'Ulcerative Colitis',
            details: `A type of IBD that primarily affects the colon and rectum, leading to long-lasting inflammation and ulcers in the digestive tract.`,
        },
        {
            title: 'Colon Polyps',
            details: `Growths on the inner lining of the colon that can potentially become cancerous. Regular screening is recommended for early detection and management.`,
        },
        {
            title: 'Colon Cancer',
            details: `Malignant tumors that develop in the colon. Early detection through regular screenings can significantly improve outcomes and survival rates.`,
        },
    ],
    treatment: {
        overview: `Treatment for inflammatory bowel diseases aims to reduce inflammation, manage symptoms, and maintain remission. A multidisciplinary approach may involve medications, surgery, and lifestyle modifications.`,
        details: [
            {
                title: 'Medication Therapy',
                description: `Drugs such as anti-inflammatory medications, immunosuppressants, and biologics are used to manage symptoms and induce remission in IBD patients.`,
            },
            {
                title: 'Surgical Resection',
                description: `In cases where medication is ineffective, surgical removal of affected sections of the bowel may be necessary. This can include partial or total colectomy depending on the severity of the disease.`,
            },
            {
                title: 'Nutritional Support',
                description: `Dietary changes and nutritional support may be recommended to help manage symptoms and ensure adequate nutrient intake, especially during flare-ups.`,
            },
        ],
    },
    causes: [
        `The exact cause of inflammatory bowel disease (IBD) is not fully understood, but it is believed to involve a combination of genetic, environmental, and immune system factors.`,
        'Family history of IBD or colon cancer increases the risk.',
        'Diet high in processed foods and low in fiber may contribute to the development of IBD.',
        'Smoking and a sedentary lifestyle are also linked to a higher risk of developing IBD.',
    ],
    symptoms: [
        'Chronic diarrhea lasting more than four weeks.',
        'Severe abdominal pain and cramping.',
        'Blood or mucus in stool.',
        'Weight loss without trying.',
        'Fatigue and general weakness.',
        'Urgency to have a bowel movement or feeling of incomplete evacuation.',
    ],
},



  {
    id: 19,
    name: 'Liver Diseases',
    link:'livercysts',
    icon: <FaArrowAltCircleRight/>,
    images: [livdisease],
    description: `Liver diseases can impact liver function and lead to serious health issues. Conditions include cysts, cancer, and other masses.`,
    types: [
      {
        title: 'Liver Cysts',
        details: `Fluid-filled sacs that can develop on the liver. Most are benign and require no treatment unless symptomatic.`,
      },
      {
        title: 'Liver Cancer',
        details: `Malignant tumors that can arise from liver cells or spread from other organs. Symptoms often include jaundice and abdominal pain.`,
      },
      {
        title: 'Liver Masses',
        details: `Abnormal growths in the liver, which can be benign or malignant. Diagnostic imaging is necessary for evaluation.`,
      },
    ],
    treatment: {
      overview: `Treatment options may include surgery, chemotherapy, or lifestyle changes to manage symptoms and improve liver health.`,
      details: [
        {
          title: 'Surgical Removal',
          description: 'Involves removing tumors or cysts from the liver, depending on the nature of the growth.',
        },
        {
          title: 'Medications',
          description: 'Drug therapies to manage liver diseases and improve overall function.',
        },
      ],
    },
    causes: [
      'Chronic viral infections (e.g., hepatitis).',
      'Excessive alcohol consumption.',
      'Obesity and diabetes.',
    ],
    symptoms: [
      'Fatigue and weakness.',
      'Nausea and vomiting.',
      'Jaundice (yellowing of the skin).',
      'Abdominal swelling.',
    ],
  },



  {
    id: 20,
    name: 'Antireflux Procedure/Fundoplication',
    link:'antireflux',
    icon: <FaArrowAltCircleRight />,
    images: [antire],
    description: `The antireflux procedure, also known as fundoplication, is a surgical intervention aimed at preventing gastroesophageal reflux disease (GERD). This procedure involves wrapping the top of the stomach around the lower esophagus to tighten the muscle and prevent reflux of stomach acid.`,
    types: [
      {
        title: 'Nissen Fundoplication',
        details: `A complete wrap of the stomach around the esophagus, providing strong protection against reflux.`,
      },
      {
        title: 'Toupet Fundoplication',
        details: `A partial wrap that allows for some esophageal movement, ideal for patients with underlying motility issues.`,
      },
      {
        title: 'Transoral Incisionless Fundoplication (TIF)',
        details: `An innovative approach using an endoscope to create a partial wrap without external incisions, leading to faster recovery times.`,
      },
    ],
    treatment: {
      overview: `Treatment for GERD may begin with lifestyle changes and medications. If symptoms persist, surgical options like fundoplication may be recommended to enhance quality of life and minimize reliance on medication.`,
      details: [
        {
          title: 'Surgical Fundoplication',
          description: 'A laparoscopic procedure that wraps the stomach around the esophagus to strengthen the lower esophageal sphincter and prevent acid reflux.',
        },
        {
          title: 'Medications',
          description: 'Proton pump inhibitors and H-2 blockers can help manage symptoms and allow time for the esophagus to heal.',
        },
      ],
    },
    causes: [
      'Obesity and increased abdominal pressure.',
      'Hiatal hernia.',
      'Weak lower esophageal sphincter.',
    ],
    symptoms: [
      'Heartburn or acid regurgitation.',
      'Difficulty swallowing.',
      'Chest pain, especially when lying down.',
      'Chronic cough or throat irritation.',
    ],
  },
  


{
  id: 21,
  name: 'Liver Cancer',
  link:'livercancer',
  icon: <FaArrowAltCircleRight />,
  images: [livercancer],
  description: `Liver cancer begins in the liver cells and can lead to serious health complications. The most common type is hepatocellular carcinoma, though other forms, such as intrahepatic cholangiocarcinoma, also occur.`,

  types: [
    {
      title: 'Hepatocellular Carcinoma (HCC)',
      details: `The most common form of primary liver cancer that originates in liver cells (hepatocytes). It is usually associated with chronic liver diseases like hepatitis B or C and cirrhosis.`,
    },
    {
      title: 'Intrahepatic Cholangiocarcinoma',
      details: `A rarer type of liver cancer that begins in the bile ducts inside the liver. It often requires specialized treatment.`,
    },
    {
      title: 'Liver Masses',
      details: `Abnormal growths in the liver, which can be benign or malignant. Imaging tests are needed for evaluation and diagnosis.`,
    },
  ],

  treatment: {
    overview: `Treatment options for liver cancer may include surgical intervention, liver transplant, chemotherapy, and targeted therapies, depending on the stage and type of cancer.`,
    details: [
      {
        title: 'Surgical Removal',
        description: 'Involves removing part or all of the liver if the cancer is localized and operable.',
      },
      {
        title: 'Liver Transplant',
        description: 'In advanced cases, liver transplantation can be an option for certain patients with early-stage cancer.',
      },
      {
        title: 'Medications',
        description: 'Targeted therapies or chemotherapy drugs may be used to treat advanced liver cancer or metastatic cases.',
      },
    ],
  },

  causes: [
    'Chronic hepatitis B or C infection.',
    'Long-term alcohol abuse leading to cirrhosis.',
    'Non-alcoholic fatty liver disease (NAFLD).',
    'Exposure to aflatoxins in contaminated foods.',
  ],

  symptoms: [
    'Unexplained weight loss.',
    'Loss of appetite.',
    'Upper abdominal pain.',
    'Nausea and vomiting.',
    'Yellowing of the skin and eyes (jaundice).',
    'General weakness and fatigue.',
    'Abdominal swelling.',
  ],
},




// chat gpt data
 {
  id: 22,
  name: 'Liver Mass',
  link:'livermass',
  icon: <FaArrowAltCircleRight/>,
  images: [livermass],
  description: `Liver masses refer to abnormal growths in the liver, which can be benign (non-cancerous) or malignant (cancerous). They can range from simple cysts to more dangerous tumors, requiring thorough evaluation through imaging and biopsy to determine their nature.`,
  
  types: [
    {
      title: 'Benign Liver Masses',
      details: `These are non-cancerous growths, such as hemangiomas or focal nodular hyperplasia (FNH). These masses usually don't spread and often don't require treatment unless they cause symptoms.`
    },
    {
      title: 'Liver Cancer (Hepatocellular Carcinoma)',
      details: `Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer, which arises from liver cells. It often occurs in people with underlying liver diseases such as cirrhosis or hepatitis B/C.`
    },
    {
      title: 'Metastatic Liver Cancer',
      details: `Liver masses can also be the result of cancer spreading to the liver from other parts of the body, such as the colon, breast, or lung. This is called metastatic liver cancer.`
    },
  ],
  
  treatment: {
    overview: `Treatment for liver masses depends on the type, size, and whether the mass is benign or malignant. Options may include surgery, chemotherapy, radiation therapy, or targeted therapies.`,
    details: [
      {
        title: 'Surgical Removal',
        description: 'Surgical resection (removal) may be recommended for both benign masses causing symptoms and malignant tumors, especially if localized.'
      },
      {
        title: 'Liver Transplant',
        description: 'For cases of advanced liver cancer or severe underlying liver disease, a liver transplant may be considered as a treatment option.'
      },
      {
        title: 'Targeted Therapy & Chemotherapy',
        description: 'For malignant liver masses, targeted therapies or chemotherapy drugs are used to slow tumor growth or shrink the mass.'
      }
    ],
  },
  
  causes: [
    'Chronic viral infections (e.g., hepatitis B or C).',
    'Liver cirrhosis (often due to alcoholism or fatty liver disease).',
    'Genetic factors (e.g., hemangiomas or FNH are often congenital).',
    'Cancer spreading from other organs (metastasis).',
  ],
  
  symptoms: [
    'Often asymptomatic in early stages.',
    'Fatigue and weakness.',
    'Abdominal pain or swelling.',
    'Jaundice (yellowing of the skin and eyes).',
    'Unexplained weight loss or loss of appetite.',
    'Nausea and vomiting.'
  ],
},



// chat gpt data
 {
  id: 23,
  name: 'Liver Cysts / Hydatid Cysts',
  link:'livercysts',
  icon: <FaArrowAltCircleRight/>,
  images: [livercryst],
  description: `Liver cysts are fluid-filled sacs in the liver. They can range from simple cysts to more complex types like hydatid cysts caused by parasitic infections. Most liver cysts are benign and don't require treatment unless symptomatic.`,
  
  types: [
    {
      title: 'Simple Liver Cysts',
      details: `These are benign, fluid-filled sacs that often cause no symptoms. They are usually found incidentally during imaging tests and rarely require treatment unless they grow large or cause discomfort.`
    },
    {
      title: 'Hydatid Cysts',
      details: `Caused by the parasitic infection Echinococcus, hydatid cysts are serious and can lead to complications. They may cause abdominal pain, nausea, or infection and often require medical or surgical intervention.`
    },
    {
      title: 'Polycystic Liver Disease (PLD)',
      details: `A genetic condition where multiple cysts develop in the liver. PLD is often associated with polycystic kidney disease (PKD) and can cause liver enlargement or discomfort.`
    },
  ],
  
  treatment: {
    overview: `Treatment depends on the type and severity of the liver cysts. While simple cysts may not require treatment, hydatid cysts often require medication or surgery to prevent complications.`,
    details: [
      {
        title: 'Percutaneous Aspiration',
        description: 'A minimally invasive procedure where a needle is inserted into the cyst to drain the fluid, mainly used for symptomatic cysts.'
      },
      {
        title: 'Surgical Removal',
        description: 'For larger cysts or hydatid cysts, surgical removal may be necessary. In hydatid cyst cases, surgeons also aim to prevent parasite spread.'
      },
      {
        title: 'Anti-parasitic Medications',
        description: 'For hydatid cysts, medications like albendazole or mebendazole are used to kill the parasites before or after surgery.'
      }
    ],
  },
  
  causes: [
    'Parasitic infection (Echinococcus species, for hydatid cysts).',
    'Congenital (inherited) factors, particularly in polycystic liver disease.',
    'Unknown causes for simple liver cysts.',
  ],
  
  symptoms: [
    'Often asymptomatic in simple cysts.',
    'Abdominal discomfort or pain (especially with larger cysts).',
    'Nausea or bloating.',
    'Jaundice (if the cyst blocks bile ducts).',
    'Fever or infection (in the case of ruptured or infected cysts).',
  ],
},

{
  id: 24,
  name: 'Weight-Loss Surgery',
  link: 'weightlosssurgery',
  icon: <FaArrowAltCircleRight />,
  images: [weightlossurgery],
  description: `Weight-loss surgery, also known as bariatric surgery, is a medical procedure that helps individuals lose weight by changing the shape and function of the digestive system. It can aid in managing obesity-related conditions such as diabetes and heart disease.`,

  types: [
    {
      title: 'Sleeve Gastrectomy',
      details: `This procedure involves removing a large portion of the stomach, leaving behind a smaller, sleeve-shaped stomach. It limits how much food you can eat.`,
    },
    {
      title: 'Gastric Bypass',
      details: `Involves creating a small pouch at the top of the stomach and connecting it directly to the small intestine. This bypasses most of the stomach and part of the small intestine.`,
    },
    {
      title: 'Adjustable Gastric Band',
      details: `A band is placed around the top of the stomach to create a small pouch. The band can be adjusted to control the amount of food that can be eaten.`,
    },
    {
      title: 'Biliopancreatic Diversion with Duodenal Switch (BPD/DS)',
      details: `This more complex surgery involves removing a portion of the stomach and rerouting the intestines, which reduces nutrient absorption.`,
    },
  ],

  treatment: {
    overview: `Weight-loss surgery is typically part of a broader treatment plan that includes dietary changes, exercise, and mental health support. The specific type of surgery depends on individual medical conditions and weight-loss goals.`,
    details: [
      {
        title: 'Surgical Procedures',
        description: 'Various surgical methods exist, including sleeve gastrectomy, gastric bypass, and adjustable gastric band.',
      },
      {
        title: 'Post-Surgery Support',
        description: 'Includes dietary guidelines, exercise plans, and ongoing medical check-ups to ensure proper recovery and long-term success.',
      },
      {
        title: 'Medications',
        description: 'May include medications to manage side effects or complications such as vitamin deficiencies or digestive issues.',
      },
    ],
  },

  causes: [
    'Severe obesity (BMI 35 or higher) and related health conditions like type 2 diabetes, hypertension, or sleep apnea.',
    'Inability to lose weight through diet and exercise alone after multiple attempts.',
    'Genetic factors and metabolism disorders.',
  ],

  symptoms: [
    'Difficulty losing weight through traditional methods.',
    'Obesity-related medical conditions such as diabetes, heart disease, or sleep apnea.',
    'Severe joint pain due to excess weight.',
    'Breathing difficulties and sleep issues.',
  ],
},

{
  "id": 25,
  "name": "Robotic Surgery",
  "link": "roboticsurgery",
  "icon": <FaArrowAltCircleRight />,
  "images": [robotic],
  "description": "Robotic surgery, also known as robot-assisted surgery, allows doctors to perform complex procedures with greater precision, flexibility, and control than traditional methods. It is often used in minimally invasive surgeries.",
  
  "types": [
    {
      "title": "Robot-Assisted Heart Surgery",
      "details": "This procedure allows surgeons to perform heart surgeries through small incisions, increasing precision and reducing recovery time compared to traditional open-heart surgery."
    },
    {
      "title": "Robotic Bladder Surgery",
      "details": "Used for bladder-related procedures, robotic surgery enhances precision and control, leading to better outcomes for patients undergoing urological surgeries."
    },
    {
      "title": "Robotic GI Surgery",
      "details": "Robotic surgery in gastrointestinal procedures allows for minimally invasive options in treating conditions such as colorectal cancers, hernias, and esophagogastric disorders."
    }
  ],

  "treatment": {
    "overview": "Robotic surgery is commonly used in various fields such as cardiology, urology, and gynecology to perform delicate and complex procedures. It often results in fewer complications and faster recovery.",
    "details": [
      {
        "title": "Minimally Invasive Procedures",
        "description": "Robotic surgery is frequently used for minimally invasive procedures, leading to reduced scarring and quicker recovery times."
      },
      {
        "title": "Surgical Precision",
        "description": "The robotic system provides enhanced control and a 3D magnified view, allowing surgeons to operate with increased precision."
      },
      {
        "title": "Advanced Technology",
        "description": "Robotic systems offer innovative features that enhance the surgeon's ability to perform complex procedures effectively."
      }
    ]
  },

  "causes": [
    "Need for increased precision in complex surgeries.",
    "Minimally invasive options for reducing patient recovery time.",
    "Surgeries that require delicate movements beyond human capability.",
    "Conditions that benefit from robotic assistance, such as GI cancers and hernias."
  ],

  "symptoms": [
    "Need for surgery with reduced recovery time and scarring.",
    "Medical conditions requiring high precision in surgical treatment.",
    "Desire for minimally invasive surgical options.",
    "Symptoms related to GI issues that may necessitate robotic surgical intervention."
  ]
},


{
  id: 26,
  name: 'Hemorrhoids',
  icon: <FaArrowAltCircleRight />,
  images: [hemorrhoidsImage], // Replace with actual image reference
  link: 'hemorrhoids',
  description: `Hemorrhoids, also known as piles, are swollen veins in the anus and lower rectum. They can be internal (inside the rectum) or external (under the skin around the anus) and may lead to discomfort, itching, and bleeding.`,
  types: [
      {
          title: 'Internal Hemorrhoids',
          details: `These lie inside the rectum and are usually not visible or painful. They can cause painless bleeding during bowel movements and may protrude, leading to irritation and discomfort.`,
      },
      {
          title: 'External Hemorrhoids',
          details: `These develop under the skin around the anus and can cause itching, discomfort, swelling, and bleeding. If a blood clot forms, it can result in a thrombosed hemorrhoid, causing severe pain.`,
      },
  ],
  treatment: {
      overview: `Many people find relief from hemorrhoids through home treatments and lifestyle changes. If symptoms persist, medical intervention may be necessary.`,
      details: [
          {
              title: 'Home Remedies',
              description: `Increase fiber intake, stay hydrated, and avoid straining during bowel movements. Warm baths and topical treatments can also provide relief.`,
          },
          {
              title: 'Medications',
              description: `Over-the-counter creams and suppositories may help relieve pain and inflammation associated with hemorrhoids.`,
          },
          {
              title: 'Surgical Procedures',
              description: `For severe cases, procedures like rubber band ligation or hemorrhoidectomy may be recommended to remove or reduce the hemorrhoids.`,
          },
      ],
  },
  causes: [
      'Increased pressure in the lower rectum from straining during bowel movements.',
      'Prolonged sitting, especially on the toilet.',
      'Chronic diarrhea or constipation.',
      'Obesity and pregnancy.',
      'Low-fiber diet.',
  ],
  symptoms: [
      'Painless bleeding during bowel movements.',
      'Itching or irritation around the anus.',
      'Pain or discomfort, especially with external hemorrhoids.',
      'Swelling around the anus.',
  ],
},
{
  id: 27,
  name: 'Fissure',
  icon: <FaArrowAltCircleRight />,
  images: [fiser], // Replace with actual image reference
  link: 'fisures',
  description: `An fissure is a small tear in the thin tissue that lines the anus, often causing pain and bleeding during bowel movements. It commonly results from constipation or straining.`,
  types: [
      {
          title: 'Acute Anal Fissures',
          details: `These are recent tears that are usually painful but can heal within a few weeks with proper treatment. They often occur due to a single event of straining.`,
      },
      {
          title: 'Chronic Anal Fissures',
          details: `These fissures persist for more than eight weeks and may require more extensive treatment. They often recur and may involve the internal anal sphincter muscle, complicating healing.`,
      },
  ],
  treatment: {
      overview: `Most anal fissures heal with simple treatments such as increased fiber intake and warm baths. Persistent cases may require medications or surgery.`,
      details: [
          {
              title: 'Home Remedies',
              description: `Increasing dietary fiber, drinking plenty of fluids, and soaking in warm water can alleviate symptoms and promote healing.`,
          },
          {
              title: 'Medications',
              description: `Topical treatments, such as anesthetic creams or nitroglycerin ointment, can help reduce pain and promote healing of the fissure.`,
          },
          {
              title: 'Surgical Procedures',
              description: `In severe or chronic cases, surgery may be needed to repair the fissure or to reduce the tension in the anal sphincter muscle.`,
          },
      ],
  },
  causes: [
      'Passing large or hard stools.',
      'Constipation and straining during bowel movements.',
      'Long-lasting diarrhea.',
      'Anal intercourse and childbirth.',
      'Underlying conditions like Crohn’s disease or infections.',
  ],
  symptoms: [
      'Severe pain during bowel movements.',
      'Pain lasting for several hours after a bowel movement.',
      'Bright red blood on stool or toilet paper.',
      'Visible crack in the skin around the anus.',
      'Small lump or skin tag near the fissure.',
  ],
},
{
  "id": 28,
  "name": "Fistula",
  icon: <FaArrowAltCircleRight />,
  "images": [fastal], // Replace with actual image reference
  "link": "fistulas",
  "description": "A fistula is a connection between two parts of your body that don’t normally connect. It often takes the form of a tunnel or passageway, allowing bodily substances to travel where they shouldn’t.",
  "types": [
    {
      "title": "Anal Fistula",
      "details": "An abnormal passageway from the inside of the anus to the outer surface of the skin, typically resulting from an infection or inflammation."
    }
    // {
    //   "title": "Arteriovenous (AV) Fistula",
    //   "details": "A connection created between an artery and a vein, commonly for dialysis purposes."
    // },
    // {
    //   "title": "Aortoenteric Fistula",
    //   "details": "A life-threatening connection between the aorta and the small intestine that requires immediate medical attention."
    // },
    // {
    //   "title": "Tracheoesophageal Fistula (TEF)",
    //   "details": "A connection between the trachea and esophagus, which is often congenital but can occur in adults due to various conditions."
    // },
    // {
    //   "title": "Vaginal Fistula",
    //   "details": "An opening that forms in the vaginal wall connecting it to nearby organs, often resulting from childbirth complications."
    // }
  ],
  "treatment": {
    "overview": "Fistulas are typically treated with medications or surgery, depending on the type and severity. Early intervention can lead to better outcomes.",
    "details": [
      {
        "title": "Medications",
        "description": "Anti-inflammatory drugs or antibiotics may be prescribed to treat infections or reduce inflammation associated with the fistula."
      },
      {
        "title": "Surgical Procedures",
        "description": "Surgery may be necessary to repair the fistula and restore normal bodily function, especially for complex or chronic cases."
      }
    ]
  },
  "causes": [
    "Infection or inflammation in the affected area.",
    "Trauma or injury to body parts.",
    "Post-surgical complications.",
    "Chronic diseases such as Crohn’s disease.",
    "Radiation therapy side effects."
  ],
  "symptoms": [
    "Pain and discomfort in the affected area.",
    "Abnormal drainage of fluids (pus, blood) from the fistula.",
    "Fever or signs of infection.",
    "Swelling or redness around the fistula site.",
    "Changes in bowel or urinary function, depending on the fistula's location."
  ]
}
];



const ServiceDetails = () => {
  const [activeService, setActiveService] = useState(services[0]);
  const location = useLocation();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Treatment Name' },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  let pathSegments = window.location.pathname.split('/');

  useEffect(() => {
    const lastSegment = pathSegments[pathSegments.length - 1];
    const foundService = services.find(service => service?.link === lastSegment);
    if (foundService) {
      setActiveService(foundService);
    }
  }, [location.pathname]);

  return (
    <section className='overflow-x-hidden'>
      <Helmet>
        <title>{activeService?.name} - Treatment Details | Dr. Manas Aggarwal</title>
        <meta name="description" content={`Detailed information about ${activeService?.name} treatment offered by Dr. Manas Aggarwal, a leading gastroenterology specialist in Lucknow.`} />
        <meta name="keywords" content={`${activeService?.name}, Treatment Details, Gastroenterology, Dr. Manas Aggarwal, Patient Care, Advanced Surgery, Lucknow`} />
        <meta name="author" content="Dr. Manas Aggarwal" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://drmanasaggarwal.com/treatment/${activeService?.link}`} />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalCondition",
          "name": activeService?.name,
          "description": activeService?.description,
          "url": `https://www.example.com/treatment/${activeService?.link}`,
          "medicalSpecialty": "Gastroenterology",
          "potentialAction": {
            "@type": "SeekToAction",
            "target": "https://chandanhospital.in/doctor/dr-manas-aggarwal",
            "name": "Book an Appointment"
          }
        })}
      </script>

      <BreadCrumbs headText={activeService?.name} items={breadcrumbItems} image={activeService?.images[0]} text={activeService?.name} />
      <Container>
        <div className="flex flex-col-reverse md:flex-row gap-4 py-6">
          <div className="w-full md:w-1/4 shadow-lg p-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id} className={`flex items-center p-3 cursor-pointer rounded-lg transition duration-300 ${activeService.id === service.id ? 'bg-[#4A6F8F] text-white' : 'bg-white text-gray-800 hover:bg-[#4A6F8F] hover:text-white ease-in-out duration-500'}`} onClick={() => setActiveService(service)}>
                  <span className="mr-2 text-xl">{service.icon}</span>
                  <span>{service.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-3/4 w-full ml-auto pl-4">
            <img src={activeService?.images} alt={`${activeService?.name} Treatment`} className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]" />
            <motion.div className="bg-white rounded-lg md:p-6 shadow-md pt-4" data-aos="fade-up">
              <h2 className="text-3xl font-bold mb-6">{activeService.name}</h2>
              <p className="mb-6 text-lg text-gray-700 text-justify">{activeService.description}</p>
              <h3 className="mb-4 mt-6 text-xl font-bold">Treatment Overview:</h3>
              <p className="text-gray-700">{activeService.treatment.overview}</p>
              {activeService.treatment.details.map((item, index) => (
                <div key={index} className="mt-4 border-l-4 border-[#4A6F8F] pl-4 bg-blue-50 p-3 rounded-md shadow-sm">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};



export default ServiceDetails;
