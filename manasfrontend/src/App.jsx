import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
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
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            containerStyle={{
              zIndex: 99999999,
              top: 24,
            }}
            toastOptions={{
              duration: 4500,
              style: {
                borderRadius: '16px',
                background: '#112340',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: '600',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                padding: '14px 20px',
                border: '1px solid rgba(255,255,255,0.12)',
              },
              success: {
                style: {
                  background: '#ffffff',
                  color: '#064e3b',
                  border: '1.5px solid #a7f3d0',
                  boxShadow: '0 20px 40px -10px rgba(0, 183, 113, 0.25)',
                },
                iconTheme: {
                  primary: '#00B771',
                  secondary: '#ffffff',
                },
              },
              error: {
                style: {
                  background: '#ffffff',
                  color: '#7f1d1d',
                  border: '1.5px solid #fecaca',
                  boxShadow: '0 20px 40px -10px rgba(239, 68, 68, 0.25)',
                },
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          {/* <ScrollToTopButton /> */}
        </>
      )}
    </div>
  );
};

export default App;
