import React, { useEffect } from 'react';

const MyApi = ({ APIURL, APIKEY, setMovies}) => {


  useEffect(() => {
    const getDataApi = async () => {
      try {
        const res = await fetch(`${APIURL}/movie/popular?api_key=${APIKEY}`);
        const data = await res.json();
        console.log('Todo is ok baby', data);
        setMovies([...data.results]);
      } catch (error) {
        console.error('Rayos its not working', error);
      }
    };

    getDataApi();
  }, [APIURL, APIKEY]);

  return (
    <div>
    </div>
  );
};

export default MyApi;