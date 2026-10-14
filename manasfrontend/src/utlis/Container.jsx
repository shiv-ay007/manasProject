
const Container = ({ children }) => {
    return (
        <div className="container w-full max-w-[1400px] px-4 md:px-6 lg:px-8 xl:px-0 mx-auto">
            {children}
        </div>
    );
};

export default Container;
