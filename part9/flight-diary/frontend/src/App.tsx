import { useEffect, useState } from "react";
import { diaryEntry } from "./types";
import diaryService from "./diaryService";

function App() {
  const [diaries, setDiaries] = useState<diaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => setDiaries(data));
  });
  return (
    <div>
      {" "}
      <h1>Diary Entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
