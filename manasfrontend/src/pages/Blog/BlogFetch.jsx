import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BlogFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://drsomya.trecoarabia.com/api/v1/dynamic/Blog', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default BlogFetch;
