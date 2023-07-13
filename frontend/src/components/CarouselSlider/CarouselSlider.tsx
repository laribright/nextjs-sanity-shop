"use client";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";
import { FC, useState, useEffect } from "react";

interface CarouselSliderProps {
  images: { _key: string; url: string }[];
  interval?: number;
}

const CarouselSlider: FC<CarouselSliderProps> = (props) => {
  const { images, interval = 3000 } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === 0) {
        return images.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextImage();
    }, interval);

    return () => clearInterval(timer);
  }, [interval, currentImageIndex]);

  return (
    <div className={classNames.container}>
      {images.map((image, index) => (
        <Image
          key={image._key}
          src={image.url}
          width={700}
          height={700}
          alt={`Slide ${index + 1}`}
          className={`w-full h-full object-cover ${
            index !== currentImageIndex && "hidden"
          }`}
        />
      ))}

      <button className={classNames.previousButton} onClick={goToPrevImage}>
        <AiOutlineArrowLeft className="text-4xl" />
      </button>
      <button className={classNames.nextButton} onClick={goToNextImage}>
        <AiOutlineArrowRight className="text-4xl" />
      </button>
    </div>
  );
};

export default CarouselSlider;

const classNames = {
  container: "relative h-[70vh]",
  previousButton:
    "absolute flex h-14 w-14 top-1/2 left-2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full",
  nextButton:
    "absolute flex h-14 w-14 top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full",
};
