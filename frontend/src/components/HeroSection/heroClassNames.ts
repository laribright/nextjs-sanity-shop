const heroClassNames = {
  hero: "px-6 sm:px-12 md:px-20 lg:px-36 py-40",
  grid: "grid grid-cols-1 lg:grid-cols-2 lg:gap-8",
  content:
    "max-w-md mx-auto lg:max-w-none lg:mx-0 lg:col-start-1 lg:col-end-2 flex flex-col justify-center",
  heading:
    "tracking-tight mb-3 text-primary-dark font-bold text-xl md:text-2xl lg:text-3xl text-gray-900",
  paragraph:
    "mt-3 font-medium text-base md:text-lg text-gray-300 sm:mt-5 sm:max-w-md md:mt-5 md:max-w-xl lg:mx-0",
  button:
    "mt-8 sm:mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-[40px] shadow-sm text-white bg-primary hover:bg-primary-dark sm:px-8",
  buttonSpan: "ml-4",
  imageContainer:
    "hidden lg:block lg:col-start-2 lg:col-end-3 flex justify-center", // hide the image on smaller screens
  image: "h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full",
  ctaText:
    "text-white text-5xl md:text-5xl leading-[120%] md:leading-[155%] font-bold",
};

export default heroClassNames;
