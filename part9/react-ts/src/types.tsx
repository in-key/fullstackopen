interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartLite extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartLite {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackround extends CoursePartLite {
  backroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartLite {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartSpecial;
