const Header = ({course}) => {
    return (
      <h2>{course}</h2>
    );
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map( part => <Part key={part.id} part={part}/>)}
        </div>
    );
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    );
}

const Total = ({parts}) => {
    const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);
    return (
        <p>Number of exercises {total}</p>
    );
}

const Course = ({courses}) => {
    return (
        <>
        {courses.map( course => {
            return(
            <div key={course.id}>
                <Header course={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts}/>
            </div>
            )
        })}
        </>
    );
}

export default Course;
