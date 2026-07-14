import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "6959e305a8a8d792b35a516b8e28df44";

  async function getWeather() {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getWeather();
          }
        }}
      />

      <button onClick={getWeather}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>

          <p>
            <strong>Temperature:</strong> {weather.main.temp} °C
          </p>

          <p>
            <strong>Feels Like:</strong> {weather.main.feels_like} °C
          </p>

          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>

          <p>
            <strong>Pressure:</strong> {weather.main.pressure} hPa
          </p>

          <p>
            <strong>Condition:</strong> {weather.weather[0].description}
          </p>

          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </>
  );
}

export default App;