import { CoursePart } from "../types";
import { Part } from "./Part";

// interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((coursePart) => (
        // <p key={coursePart.name}>
        //   {coursePart.name} {coursePart.exerciseCount}
        // </p>
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
};
