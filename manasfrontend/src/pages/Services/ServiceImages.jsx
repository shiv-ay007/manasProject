import React from "react";

const ServiceImage = ({ serviceData }) => {
  console.log(serviceData); // To see the incoming data structure

  // Assuming serviceData is an array of image links as you mentioned
  // If serviceData is structured differently, adjust accordingly
  const imageLinks = serviceData;

  const [active, setActive] = React.useState(imageLinks[0]);

  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt="Active Gallery"
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {imageLinks.map((imgelink, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className={`h-20 max-w-full cursor-pointer rounded-lg object-cover object-center ${active === imgelink ? 'border-2 border-blue-500' : ''}`}
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceImage;
