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
  try {
    const res = await axios.post<diaryEntry>(baseUrl, diary);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("different error than axios");
    }
  }
};

export default {
  getAll,
  addNewDiary,
};
