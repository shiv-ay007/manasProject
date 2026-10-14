import Cookies from 'js-cookie';

export const isLoginExpired = () => {
  const loginTimestamp = Cookies.get('loginTimestamp');
  if (!loginTimestamp) return true; // No login timestamp, treat it as expired

  const currentTime = new Date().getTime();
  const expirationTime = 20 * 60 * 1000; // 20 minutes in milliseconds

  // If the current time minus the login timestamp is greater than 20 minutes, expire the session
  return currentTime - loginTimestamp > expirationTime;
};
