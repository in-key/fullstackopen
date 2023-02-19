import React, { useEffect, useState } from "react";
import { diaryEntry } from "./types";
import diaryService from "./diaryService";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<diaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const visibilityOptions = ["great", "good", "ok", "poor"];
  const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];

  useEffect(() => {
    diaryService.getAll().then((data) => setDiaries(data));
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const addedDiary = await diaryService.addNewDiary({
        date,
        visibility,
        weather,
        comment,
      });
      setDiaries(diaries.concat(addedDiary));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
        setErrorMsg(error.response.data);
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
      }
    }
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };
  return (
    <div>
      <div>
        <h1>Add new entry</h1>
        {errorMsg && (
          <div style={{ border: "3px solid red", margin: 5, padding: 5 }}>
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            date:{" "}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            visibility:{" "}
            {visibilityOptions.map((option) => (
              <>
                <input
                  key={option}
                  type="radio"
                  name="visibility"
                  checked={visibility === option}
                  onChange={() => setVisibility(option)}
                />
                {option}
              </>
            ))}
          </div>
          <div>
            weather:{" "}
            {weatherOptions.map((option) => (
              <>
                <input
                  key={option}
                  type="radio"
                  name="weather"
                  checked={weather === option}
                  onChange={() => setWeather(option)}
                />
                {option}
              </>
            ))}
          </div>
          <div>
            comment:{" "}
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button>submit</button>
        </form>
      </div>
      <div>
        <h1>Diary Entries</h1>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
