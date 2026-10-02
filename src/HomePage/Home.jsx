import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import SearchBar from './SearchBar';

const weatherCodeDescriptions = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export const Home = () => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [latitude, setLatitude] = useState(51.5074);
  const [longitude, setLongitude] = useState(-0.1278);
  const [locationName, setLocationName] = useState('London');

  const timezone = 'Europe/London';

  useEffect(() => {
    if (!searchLocation.trim()) return;

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchLocation
          )}&limit=1`
        );

        if (!response.ok) {
          throw new Error('Could not find that location.');
        }

        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon, display_name } = data[0];
          setLatitude(parseFloat(lat));
          setLongitude(parseFloat(lon));
          setLocationName(display_name);
        } else {
          setError('Location not found.');
        }
      } catch (err) {
        console.error('Geocoding error:', err);
        setError('Could not find that location.');
      }
    };

    fetchCoordinates();
  }, [searchLocation]);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code` +
            `&daily=precipitation_probability_max&timezone=${timezone}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setWeather({
          current: data.current,
          daily: data.daily,
        });
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
    <div className="form">
      <h1 style={{ textDecoration: 'underline' }}>7-Day Forecast</h1>

      <SearchBar
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />

      <h2>Weather for {locationName}</h2>

      {weather?.daily?.time?.length > 0 ? (
        weather.daily.time.map((date, index) => (
          <Link
            key={date}
            to={{
              pathname: `/weather/${date}`,
              search: `?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(
                locationName
              )}`,
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

              <p>{weatherCodeDescriptions[weather.current.weather_code] || 'Unknown'}</p>
              <p>{weather.current.temperature_2m}°C</p>
              <p>{weather.current.wind_speed_10m} km/h</p>
              <p>{weather.current.wind_direction_10m}°</p>
              <p>{weather.current.precipitation} mm</p>
              <p>{weather.daily.precipitation_probability_max?.[index] ?? 'N/A'}%</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};