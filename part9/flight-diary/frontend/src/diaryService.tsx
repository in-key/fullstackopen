import axios from "axios";
import { diaryEntry } from "./types";
const baseUrl = "http://localhost:3001/api/diaries";

interface newDiary {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

const getAll = async () => {
  const res = await axios.get<diaryEntry[]>(baseUrl);
  return res.data;
};

const addNewDiary = async (diary: newDiary) => {
  const res = await axios.post<diaryEntry>(baseUrl, diary);
  return res.data;
};

export default {
  getAll,
  addNewDiary,
};
