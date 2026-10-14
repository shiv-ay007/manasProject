import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BsQuestionCircle } from 'react-icons/bs';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How long does recovery take after laparoscopic surgery?',
      a: 'Laparoscopic (minimally invasive) surgery involves tiny keyhole incisions, resulting in minimal post-operative pain and blood loss. Most patients are ambulatory within 24 to 48 hours and can comfortably resume sedentary work or light daily activities within 5 to 7 days.',
    },
    {
      q: 'Can gallbladder stones be dissolved or treated without surgery?',
      a: 'For symptomatic gallbladder stones causing pain, nausea, or indigestion, laparoscopic cholecystectomy (surgical removal of the gallbladder) is the gold standard and permanent cure. Dissolution medications are clinically ineffective and carry serious risks of recurrence, infection, or pancreatitis.',
    },
    {
      q: 'Is cashless health insurance / TPA mediclaim accepted at Chandan Hospital?',
      a: 'Yes, Chandan Hospital, Lucknow facilitates seamless cashless hospitalization for all major private health insurance providers and government TPAs, including Star Health, HDFC ERGO, Care Health, ICICI Lombard, Medi Assist, and more.',
    },
    {
      q: 'How do I schedule an OPD consultation with Dr. Manas Aggarwal?',
      a: 'You can easily reserve an appointment by clicking the "Request a Callback" button on our website, completing the quick online inquiry form, or dialing our dedicated patient helpline directly at +91-8318208837.',
    },
    {
      q: 'What diagnostic evaluations are required prior to surgery?',
      a: 'Pre-operative assessments typically include baseline blood tests (CBC, LFT, KFT, Blood Sugar, Coagulation profile), Ultrasound (USG) Abdomen, and advanced imaging such as a contrast CT scan or Endoscopy depending on your specific diagnosis to ensure maximum surgical safety.',
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#f4faf7] via-[#ebf6f1] to-[#e2f2ec] py-14 sm:py-16 lg:py-20 overflow-hidden">
      {/* Distinct Style: Clean Minimalist Question Architecture (No dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-16 w-[450px] h-[450px] bg-[#00B771]/16 rounded-full blur-[110px]" />
        <div className="absolute -bottom-24 -right-16 w-[450px] h-[450px] bg-[#1CB6E6]/18 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center justify-center mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
              Frequently Asked Questions
            </span>
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#112340] tracking-tight max-w-3xl leading-snug">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2 leading-relaxed">
            Clear, honest information about surgical procedures, recovery timelines, and hospital facilities.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white shadow-[0_8px_30px_rgba(20,150,170,0.12)] border-teal-200'
                    : 'bg-white/80 hover:bg-white shadow-sm border-gray-100 hover:border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isOpen
                          ? 'bg-[#00B771] text-white'
                          : 'bg-teal-50 text-[#0e6b56]'
                      }`}
                    >
                      <BsQuestionCircle className="text-sm" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-[#112340] font-sans">
                      {faq.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-teal-50 text-[#00B771] rotate-180'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <FiChevronDown className="text-base" />
                  </div>
                </button>

                {/* Answer Collapse */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-[0.92rem] text-gray-600 leading-relaxed border-t border-gray-50">
                    <p className="pl-11">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
