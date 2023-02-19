import axios from "axios";
import { diaryEntry } from "./types";
const baseUrl = "http://localhost:3001/api/diaries";

const getAll = async () => {
  const res = await axios.get<diaryEntry[]>(baseUrl);
  return res.data;
};

export default {
  getAll,
};
