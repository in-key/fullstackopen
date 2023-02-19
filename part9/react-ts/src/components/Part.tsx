import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

export const Part = (props: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.coursePart.kind) {
    case "basic":
      return (
        <>
          <h2>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </h2>
          <div>
            <em>{props.coursePart.description}</em>
          </div>
        </>
      );
    case "group":
      return (
        <>
          <h2>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </h2>
          <div>project exercises {props.coursePart.groupProjectCount}</div>
        </>
      );
    case "background":
      return (
        <>
          <h2>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </h2>
          <div>
            <em>{props.coursePart.description}</em>
          </div>
          <div>
            submit to{" "}
            <a href={props.coursePart.backroundMaterial}>
              {props.coursePart.backroundMaterial}
            </a>
          </div>
        </>
      );
    case "special":
      return (
        <>
          <h2>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </h2>
          <div>
            <em>{props.coursePart.description}</em>
          </div>
          <div>required skills: {props.coursePart.requirements.join(", ")}</div>
        </>
      );
    default:
      return assertNever(props.coursePart);
  }
};
