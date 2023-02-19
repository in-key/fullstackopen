import { CoursePart } from "../types";
// interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

interface TotalProps {
  courseParts: CoursePart[];
}

export const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
