const SectionWrapper = ({ children, className = "" }) => {
    return (
      <section className={`bg-gray-100 py-10 sm:py-12 md:py-14 lg:py-16 ${className}`}>
        {children}
      </section>
    );
  };
  
  export default SectionWrapper;
  