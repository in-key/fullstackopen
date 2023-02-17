type trainingEval = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = (days: number[], target: number): trainingEval => {
  const res = {
    periodLength: days.length,
    trainingDays: days.filter((d) => d > 0).length,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: target,
    average: days.reduce((prev, curr) => prev + curr, 0) / days.length,
  };

  if (res.average < target * 0.5) {
    res.rating = 1;
  } else if (res.average < target) {
    res.rating = 2;
  } else {
    res.rating = 3;
  }

  if (res.rating === 3) {
    res.success = true;
  }

  switch (res.rating) {
    case 1:
      res.ratingDescription = "Do better you monkey";
      break;
    case 2:
      res.ratingDescription = "Not good enough";
      break;
    default:
      res.ratingDescription = "You King Kong";
      break;
  }

  return res;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
