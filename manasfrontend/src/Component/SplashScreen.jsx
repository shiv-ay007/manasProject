import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHeartbeat, FaStethoscope, FaUserMd } from 'react-icons/fa';
import doctorImage from '../assets/Apron.jpg'

// Define keyframes for animation
const riseUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const SplashScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #4A6F8F; /* Updated to specified color */
  color: #fff;
  text-align: center;
  position: relative; /* Positioning for the doctor image */
  overflow: hidden; /* Prevent overflow */
  padding: 20px; /* Padding for smaller devices */
`;

const IconContainer = styled.div`
  display: flex;
  gap: 20px; /* Adjusted gap */
  margin-bottom: 2rem; /* Increased space below icons */
`;

const DoctorIcon = styled.div`
  font-size: 3.5rem;
  animation: ${bounce} 2s infinite;
  color: #fff;
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.3s;
  }
  &:nth-child(3) {
    animation-delay: 0.5s;
  }
`;

const Title = styled.div`
  font-size: 2.8rem; /* Slightly larger title */
  font-weight: bold;
  animation: ${riseUp} 2s ease-in-out;
  animation-delay: 0.5s;
  margin-bottom: 1rem; /* Space below title */

  @media (max-width: 768px) {
    font-size: 2.2rem; /* Smaller font size for tablets */
  }

  @media (max-width: 480px) {
    font-size: 1.8rem; /* Smaller font size for mobile */
  }
`;

const Subtitle = styled.div`
  font-size: 1.6rem; /* Increased subtitle size */
  margin: 0.5rem 0 1.5rem 0; /* Increased space around subtitle */
  animation: ${fadeIn} 3s ease-in-out;
  animation-delay: 1s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 768px) {
    font-size: 1.4rem; /* Smaller subtitle for tablets */
  }

  @media (max-width: 480px) {
    font-size: 1.2rem; /* Smaller subtitle for mobile */
  }
`;

const Tagline = styled.div`
  font-size: 1.4rem; /* Increased tagline size */
  margin: 1.5rem 0 2rem 0; /* Increased space around tagline */
  font-style: italic;
  color: #f3f3f3;
  animation: ${fadeIn} 4s ease-in-out;
  animation-delay: 1.5s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Smaller tagline for tablets */
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* Smaller tagline for mobile */
  }
`;

const DoctorImage = styled.img`
  position: absolute; /* Positioning for the image */
  bottom: 6%; /* Positioned near the bottom with more space */
  left: 50%;
  transform: translateX(-50%);
  width: 250px; /* Adjusted size for larger image */
  height: auto; /* Maintain aspect ratio */
  border-radius: 10%; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Shadow for depth */

  @media (max-width: 768px) {
    width: 200px; /* Smaller image for tablets */
    bottom: 8%; /* Adjust position */
  }

  @media (max-width: 480px) {
    width: 150px; /* Smaller image for mobile */
    bottom: 5%; /* Adjust position */
  }
`;

const SplashScreen = () => {
  return (
    <SplashScreenWrapper>
      <IconContainer>
        <DoctorIcon>
          <FaHeartbeat />
        </DoctorIcon>
        <DoctorIcon>
          <FaStethoscope />
        </DoctorIcon>
        <DoctorIcon>
          <FaUserMd />
        </DoctorIcon>
      </IconContainer>
      <Title>WELCOME TO DR. MANAS AGGARWAL</Title>
      <Subtitle>Doctor & Surgeon</Subtitle>
      <Tagline>"Caring for you with compassion and expertise"</Tagline>
      <DoctorImage src={doctorImage} alt="Doctor" /> {/* Display the doctor image */}
    </SplashScreenWrapper>
  );
};

export default SplashScreen;
