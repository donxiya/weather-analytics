CREATE TABLE weather_readings (
    id SERIAL PRIMARY KEY,
    city TEXT NOT NULL,
    temperature REAL,
    windSpeed REAL,
    recorded_at TIMESTAMP NOT NULL DEFAULT NOW()
);