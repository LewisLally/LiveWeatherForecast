import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import weatherCodeDescriptions from './WeatherArray';


export const WeatherDetail = () => {
  const { date } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const latitude = parseFloat(queryParams.get('lat'));
  const longitude = parseFloat(queryParams.get('lon'));
  const locationName = queryParams.get('name') || 'Unknown';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  const timezone = 'Europe/London';

  useEffect(() => {
    const fetchHourlyData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
          throw new Error('Invalid location coordinates.');
        }

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&hourly=temperature_2m,weather_code,precipitation_probability,precipitation,rain,snowfall,wind_speed_10m,wind_direction_10m` +
            `&timezone=${timezone}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const hourly = data.hourly;

        if (!hourly?.time) {
          throw new Error('Hourly forecast data is unavailable.');
        }

        const forecasts = hourly.time
          .map((time, index) => {
            if (time.slice(0, 10) !== date) return null;

            return {
              hour: Number(time.slice(11, 13)),
              temperature: hourly.temperature_2m[index],
              weatherCode: hourly.weather_code[index],
              precipitationProbability:
                hourly.precipitation_probability?.[index] ?? 'N/A',
              precipitation: hourly.precipitation?.[index] ?? 'N/A',
              rain: hourly.rain?.[index] ?? 'N/A',
              snowfall: hourly.snowfall?.[index] ?? 'N/A',
              windSpeed: hourly.wind_speed_10m?.[index] ?? 'N/A',
              windDirection: hourly.wind_direction_10m?.[index] ?? 'N/A',
            };
          })
          .filter(Boolean);

        setHourlyForecasts(forecasts);
      } catch (err) {
        console.error('Error fetching hourly data:', err);
        setError('Failed to load hourly weather data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHourlyData();
  }, [date, latitude, longitude]);

  if (isLoading) return <p>Loading hourly forecast...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 style={{ backgroundColor: 'whitesmoke' }}>
        Hourly Forecast for {date} at {locationName}
      </h2>

      {hourlyForecasts.length === 0 ? (
        <p>No hourly forecast available for this date.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              backgroundColor: 'whitesmoke',
            }}
          >
            <thead>
              <tr>
                <th style={{ width: '150px', cellStyle}}>Hour</th>
                <th style={cellStyle}>Temp (°C)</th>
                <th style={cellStyle}>Weather</th>
                <th style={cellStyle}>Precip. Chance (%)</th>
                <th style={cellStyle}>Precipitation (mm)</th>
                <th style={cellStyle}>Rain (mm)</th>
                <th style={cellStyle}>Snowfall (cm)</th>
                <th style={cellStyle}>Wind Speed (km/h)</th>
                <th style={cellStyle}>Wind Direction (°)</th>
              </tr>
            </thead>

            <tbody>
              {hourlyForecasts.map((forecast) => {
                const startHour = forecast.hour.toString().padStart(2, '0');

                return (
                  <tr key={forecast.hour}>
                    <td style={cellStyle}>
                      {`${startHour}:00–${startHour}:59`}
                    </td>
                    <td style={cellStyle}>{forecast.temperature}</td>
                    <td style={cellStyle}>
                      {weatherCodeDescriptions[forecast.weatherCode] ||
                        'Unknown'}
                    </td>
                    <td style={cellStyle}>
                      {forecast.precipitationProbability}
                    </td>
                    <td style={cellStyle}>{forecast.precipitation}</td>
                    <td style={cellStyle}>{forecast.rain}</td>
                    <td style={cellStyle}>{forecast.snowfall}</td>
                    <td style={cellStyle}>{forecast.windSpeed}</td>
                    <td style={cellStyle}>{forecast.windDirection}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};