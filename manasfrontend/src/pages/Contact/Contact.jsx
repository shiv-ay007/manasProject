import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import image from '../../assets/Apron.jpg';
import BreadCrumbs from '../../Component/BreadCums';
import pattern from '../../assets/patterncontact.png';
import contactHeroBg from '../../assets/contact-hero-bg.jpg';
import { useDispatch } from 'react-redux';
import { submitInquiry } from '../../redux/Slice/Parent.slice';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Contact Us' },
    ];

    const location = useLocation();

    const dispatch=useDispatch()

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Form State Management
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        concern: '',
        message: '',
    });

    // Loading state for form submission
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response=await dispatch(submitInquiry(formData))

  
        if(response?.payload?.data){
          setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    concern: '',
                    message: '',
          })
          setIsLoading(false)
    
        }
    
    };

    
  useEffect(() => {
    if (location.pathname === '/contact') {
      window.scrollTo(0, 0);
    }
  }, [location]);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 font-poppins pb-[3rem]">
              <Helmet>
        <title>Contact Dr. Manas Aggarwal</title>
        <meta name="description" content="Get in touch with Dr. Manas Aggarwal for consultations and inquiries regarding gastroenterology and liver health." />
        <meta name="keywords" content="Contact Dr. Manas Aggarwal, Gastroenterology, Lucknow, Book Appointment" />
      </Helmet>
            <BreadCrumbs headText={"Contact Us"} items={breadcrumbItems} image={contactHeroBg} />

            {/* Contact Information Section */}
            <div className="relative flex flex-col items-center justify-center">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${pattern})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        opacity: 0.8,
                        width: '40%',
                        left: '0',
                    }}
                ></div>

                <section className="max-w-7xl mx-auto py-12 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12 text-center">

                        {/* Phone Card */}
                        <a
                            href="tel:+91-8318208837"
                            className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-transform hover:-translate-y-3"
                        >
                            <div className="flex flex-col items-center">
                                <FaPhoneAlt className="text-6xl text-[#4A6F8F] mb-4 transition-transform group-hover:scale-125" />
                                <h2 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-[#4A6F8F] transition-colors">Call Us</h2>
                                <p className="mt-2 text-lg text-gray-600 font-medium group-hover:text-gray-800">+91-8318208837</p>
                            </div>
                        </a>

                        {/* Email Card */}
                        <a
                            href="mailto:aggarwal.manas@gmail.com"
                            className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-transform hover:-translate-y-3"
                        >
                            <div className="flex flex-col items-center">
                                <FaEnvelope className="text-6xl text-[#4A6F8F] mb-4 transition-transform group-hover:scale-125" />
                                <h2 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-[#4A6F8F] transition-colors">Email Us</h2>
                                <p className="mt-2 text-lg text-gray-600 font-medium group-hover:text-gray-800">aggarwal.manas@gmail.com</p>
                            </div>
                        </a>

                        {/* Location Card */}
                        <a
                            href="https://www.google.com/maps/dir//Dr+Manas+Aggarwal+-+Best+Gastroenterologist+Gomti+Nagar+Lucknow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-transform hover:-translate-y-3"
                        >
                            <div className="flex flex-col items-center">
                                <FaMapMarkerAlt className="text-6xl text-[#4A6F8F] mb-4 transition-transform group-hover:scale-125" />
                                <h2 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-[#4A6F8F] transition-colors">Visit Us</h2>
                                <p className="mt-2 text-lg text-gray-600 font-medium group-hover:text-gray-800">
                                    Chandan Hospital, Faizabad Rd, Gomti Nagar, Lucknow
                                </p>
                            </div>
                        </a>
                    </div>
                </section>
            </div>

            {/* Contact Form Section */}
            <section id="contactForm" className="container mx-auto px-4">
    <div className="bg-white p-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Doctor Image */}
        <div className="hidden md:flex justify-center items-center">
            <img
                src={image}
                alt="Doctor"
                className="rounded-lg shadow-lg max-w-full h-auto"
            />
        </div>

        {/* Contact Form */}
        <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-serif font-bold text-center mb-8 text-[#4A6F8F]">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter Your Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4A6F8F]"
                        required
                    />
                </div>
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4A6F8F]"
                        required
                    />
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter your phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4A6F8F]"
                        required
                    />
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="concern"
                        placeholder="Enter your concern"
                        value={formData.concern}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4A6F8F]"
                        required
                    />
                </div>
                <div className="relative">
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4A6F8F]"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#4A6F8F] to-[#1A466D] text-white font-serif font-bold rounded-lg hover:shadow-lg transition transform hover:-translate-y-1"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex justify-center items-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-3 border-2 border-t-white border-[#1A466D] rounded-full"
                                viewBox="0 0 24 24"
                            ></svg>
                            Sending...
                        </span>
                    ) : (
                        "Send Message"
                    )}
                </button>
            </form>
        </div>
    </div>
</section>


            {/* Map Section */}
            <div className="">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7117.865288250847!2d81.02269!3d26.873881!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfb781a8e1edf%3A0xbb68c9fe3bbab90b!2sDr%20Manas%20Aggarwal%20-%20Best%20Gastroenterologist%20Gomti%20Nagar%20Lucknow%20%7C%20Gastroenterology%20Cancer%20Surgeon%20Lucknow%20%26%20Piles%20Specialist!5e0!3m2!1sen!2sin!4v1728634517939!5m2!1sen!2sin"
                    width="100%" height="450" className="border-0 rounded-lg shadow-lg"
                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Clinic Location">
                </iframe>
            </div>

            {/* Floating CTA Button */}
            {/* <a href="#contactForm" className="fixed bottom-6 right-[4rem] bg-[#4792d4] text-white p-5 rounded-full shadow-xl hover:bg-[#1A466D] transition">
                <span className="font-bold">Book Appointment</span>
            </a> */}
        </div>
    );
};

export default ContactPage;
