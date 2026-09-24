import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import SearchBar from '../SearchBar';

export const Home = () => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [latitude, setLatitude] = useState(51.5074); // Default: London
  const [longitude, setLongitude] = useState(-0.1278);
  const [locationName, setLocationName] = useState('London');

  const timezone = 'Europe/London';

  // Fetch coordinates when searchLocation changes
  useEffect(() => {
    if (!searchLocation) return;
    const fetchCoordinates = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}&limit=1`
        );
        const data = await res.json();
        if (data.length > 0) {
          const { lat, lon, display_name } = data[0];
          setLatitude(parseFloat(lat));
          setLongitude(parseFloat(lon));
          setLocationName(display_name);
        }
      } catch (err) {
        console.error('Geocoding error:', err);
      }
    };
    fetchCoordinates();
  }, [searchLocation]);

  // Fetch weather when coords change
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setWeather(data.daily);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to fetch weather data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, [latitude, longitude]);

  if (isLoading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="homeSearchBar">
      <SearchBar searchLocation={searchLocation} setSearchLocation={setSearchLocation} />

      <h2 style={{ marginTop: '20px' }}>Weather for {locationName}</h2>

      <h1 style={{ textDecoration: 'underline' }}>7-Day Forecast</h1>
      {weather && weather.time && weather.time.length > 0 ? (
        weather.time.map((date, index) => (
          <Link
            key={index}
            to={{
              pathname: `/weather/${date}`,
              search: `?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(locationName)}`,
            }}
            style={{
              display: 'block',
              marginBottom: '10px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: 'whitesmoke',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ margin: '1px' }}>Date: {date}</h3>
              <p>Max Temp: {weather.temperature_2m_max[index]}°C</p>
              <p>Min Temp: {weather.temperature_2m_min[index]}°C</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};