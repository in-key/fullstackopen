interface DaysTarget {
  days: number[];
  target: number;
}

function parseArgv(args: string[]): DaysTarget {
  if (args.length < 4) throw new Error("Not enough arguments");

  const ars = args.slice(2).map((a) => Number(a));

  if (ars.some((a) => isNaN(a))) {
    throw new Error("Provided values were not numbers!");
  } else {
    return {
      target: ars[0],
      days: ars.slice(1),
    };
  }
}

type trainingEval = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

export const calculateExercises = (days: number[], target: number): trainingEval => {
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

try {
  const { days, target } = parseArgv(process.argv);
  console.log(calculateExercises(days, target));
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
