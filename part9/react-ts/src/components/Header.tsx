interface HeaderProps {
  courseName: string;
}

export const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};
