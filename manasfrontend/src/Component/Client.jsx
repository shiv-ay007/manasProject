import React, { useState, useEffect } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import image from '../assets/client1.png'
const Client = () => {
    // Custom hook defined inside the component
    const useClientImages = () => {
        const [clientImages1, setClientImages1] = useState([]);
        const [clientImages2, setClientImages2] = useState([]);

        useEffect(() => {
            // Mock data or fetch from an API
            const images1 = [
                image,
                image,
                image,
                image,
                image,
                image,
                image,
                image,

                image,

                image,

                image,

                // Add more image paths...
            ];

            const images2 = [
                image,
                image,
                image,
                image,
                image,
                image,
                image,
                image,
                image,
                image,
                // Add more image paths...
            ];

            setClientImages1(images1);
            setClientImages2(images2);
        }, []);

        return { clientImages1, clientImages2 };
    };

    // Initialize Swiper
    SwiperCore.use([Autoplay, Pagination]);
    const width = window.innerWidth;

    // Use the custom hook
    const { clientImages1, clientImages2 } = useClientImages();

    return (
        <div className="relative shadow-md w-full mx-auto pt-6 z-[10] bg-[#F4F6F8] ">
            <h1 className='font-semibold mb-4 text-center'>700+  Partner&apos;s</h1>
            <Swiper
                slidesPerView={width / 260}
                spaceBetween={0}
                loop={true}
                autoplay={{ delay: 600, disableOnInteraction: false }}
                speed={3500}
                className="mySwiper"
            >
                {clientImages1.map((img, index) => (
                    <SwiperSlide key={index} className="flex justify-center py-6">
                        <LazyLoadImage
                            src={img}
                            alt={`Client ${index + 1}`}
                            className="w-[230px] cursor-pointer"
                            effect="blur"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                slidesPerView={width / 260}
                spaceBetween={0}
                loop={true}
                autoplay={{
                    delay: 600,
                    disableOnInteraction: false,
                    reverseDirection: true
                }}
                speed={3500}
                className="mySwiper"
            >
                {clientImages2.map((img, index) => (
                    <SwiperSlide key={index} className="flex justify-center py-6">
                        <LazyLoadImage
                            src={img}
                            alt={`Client ${index + 1}`}
                            className="w-[230px] cursor-pointer"
                            effect="blur"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Client;
