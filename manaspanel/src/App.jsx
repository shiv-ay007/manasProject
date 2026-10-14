import React from 'react';
import { AuthProvider } from './Component/AuthContext';
import MainRouter from './MainRouter';

const App = () => {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
};

export default App;
