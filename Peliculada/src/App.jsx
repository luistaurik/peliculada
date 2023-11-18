import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header';
import Main from './components/Main';
import MyApi from '../MyApi';

function App() {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '63d8bbe1beed9ca56a98c37fc959f3c0';
  const [movies,setMovies] = useState([]);
  const URL_IMG = 'https://image.tmdb.org/t/p/original';
  const [abcOrder,setAbcOrder] = useState([]);

  const [searchM, setSearchM] = useState("");

  const validateMovies = async (searchM) => {
    const type = searchM ? "search" : "discover";
    try {
      const res = await fetch(`${API_URL}/${type}/movie?api_key=${API_KEY}&query=${searchM}`);
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error('I have an error :(', error);
    }
  };

  const sortAbc = () => {
    const ordered = [...movies].sort((first, second) => first.title.localeCompare(second.title));
    setAbcOrder(ordered);
  };

  useEffect(() => {
    sortAbc();
  }, [movies]);


  useEffect(() => {
    const getDataApi = async () => {
      try {
        const res = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await res.json();
        console.log('API response:', data); // Muestra la respuesta de la API en la consola
        setMovies([...data.results]);
      } catch (error) {
        console.error('Error fetching data from API:', error); // Muestra cualquier error en la consola
      }
    };
    
    getDataApi();
  }, [API_URL, API_KEY]);
  
  return (
    <>
      <MyApi APIURL={API_URL} APIKEY={API_KEY} setMovies={setMovies}/>
      <Header APIKEY={API_KEY} searchM={searchM} setSearchM={setSearchM} validateMovies={validateMovies} sortAbc={sortAbc}/>
      <Main/>
      <div>
        <div id="movies"  class="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {abcOrder.length > 0 ?
              abcOrder.map((movie) => (
                <div className="col" key={movie.id}>
                  <div className="card">
                    <img
                      src={`${URL_IMG + movie.poster_path}`}
                      alt=""
                      className="movie-imagebd-placeholder-img card-img-top"
                      width="100%"
                      height="395"
                      role="img"
                      aria-label="Placeholder: Thumbnail"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-body-secondary">{movie.release_date}</small>
                        <div className="vote-average">
                          <small>{movie.vote_average}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) :
            
              movies.map((movie) => (
              <div className="col" key={movie.id}>
                <div className="card">
                  <img
                    src={`${URL_IMG + movie.poster_path}`}
                    alt=""
                    className="movie-imagebd-placeholder-img card-img-top"
                    width="100%"
                    height="395"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-body-secondary">{movie.release_date}</small>
                      <div className="vote-average">
                        <small>{movie.vote_average}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
      <div className='footer' id='footer'>
                <h5>About</h5>
                <p>Luis Acosta Fuenmayor | All rights reserved.</p>
      </div>    
    </>
  ) 
}

export default App
