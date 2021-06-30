const CourseHeader = (props) => (
    <h2>{props.name}</h2>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Content = (props) => (
    <div>
        {props.parts.map(part => <Part part={part.name} exercises={part.exercises} />)}
    </div>
)

const Total = (props) => (
    <b> Total of {props.parts.reduce((result, part) => result + part.exercises, 0)} exercises</b>
)

const Course = (props) => (
    <div>
        <CourseHeader name={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div >
)

export default Course