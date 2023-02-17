import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  const bmi = calculateBmi(Number(height), Number(weight));

  if (bmi === "Invalid input") {
    return res.json({ error: "malformatted parameters" });
  }

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target){
    return res.json({
      error: "parameters missing"
    });
  } else if (!Array.isArray(daily_exercises) || daily_exercises.length === 0 || typeof target !== 'number'){
    return res.json({
      error: "malformatted parameters"
    });
  }

  const days = daily_exercises as number[];

  const result = calculateExercises(days, target);

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Typescript app listening on port ${PORT}`);
});
