import React, { useState } from 'react';
import pattern from '../assets/about/pattern-26.png';

const faqs = [
  {
    question: "Who is the best gastroenterology surgeon & liver specialist in Lucknow?",
    answer: "Dr. Manas Aggarwal is recognized as the best gastroenterology surgeon and liver specialist in Lucknow.",
  },
  {
    question: "How can I book an appointment?",
    answer: (
      <>
        You can book an appointment by calling{" "}
        <a href="tel:0522-6666666" className="text-blue-500 underline">
          0522-6666666
        </a>.
      </>
    ),
  },
  {
    question: "What are the qualifications of Dr. Manas Aggarwal?",
    answer: "Dr. Manas Aggarwal is highly qualified with extensive training in gastroenterology and liver surgery.",
  },
  {
    question: "Where is the clinic located?",
    answer: "The clinic is located at Chandan Hospital, Vijayant Khand, Gomti Nagar, Lucknow, Uttar Pradesh- 226010.",
  },
  {
    question: "How can I contact Dr. Manas Aggarwal?",
    answer: "You can contact Dr. Manas Aggarwal via email at aggarwal.manas@gmail.com or by phone at +91-8318208837.",
  },
];


const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle accordion
  };

  return (
    <section className="relative py-12 bg-[#EEF5FF]">
      
  

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* FAQ Text Section */}
        <div className="w-full text-center">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">
            Frequently Asked Questions <span>(FAQ's)</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get every single answer you need
          </p>

          {/* Accordion Section */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b">
                <button
                  className="w-full flex justify-between items-center py-4 "
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  <span className="text-xl text-[#4A6F8F]">
                    {activeIndex === index ? '-' : '+'}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="p-4 text-gray-600 text-start">
                   <p>{faq.answer}</p> 
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
