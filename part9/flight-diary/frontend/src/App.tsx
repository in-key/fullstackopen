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
            date{" "}
            <input value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            visibility{" "}
            <input
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            />
          </div>
          <div>
            weather{" "}
            <input
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            />
          </div>
          <div>
            comment{" "}
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
