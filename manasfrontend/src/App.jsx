import React, { useEffect, useState } from 'react';
import Footer from './Component/Footer';
import Header from './Component/Header';
import WhatsAppIcon from './Component/WhastappIcon';
import CallIcon from './Component/CallIcon';
import MainRoutes from './mainroute/MainRoutes';

const App = () => {
  const [showSplash, setShowSplash] = useState(false); // Control splash screen visibility

  // Handle initial splash screen display
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false); // Hide splash screen after 1 second
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(splashTimeout); // Clean up the timeout on unmount
  }, []);

  return (
    <div>
      {showSplash ? (
        <SplashScreen /> 
      ) : (
        <>
          {/* <TopHeader /> */}
          <Header />
          {/* <Headers/> */}
          <main className="w-full">
            <MainRoutes />
          </main>
     
          <Footer />
          <WhatsAppIcon />
          <CallIcon />
          {/* <ScrollToTopButton /> */}
        </>
      )}
    </div>
  );
};

export default App;
