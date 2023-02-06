import { createFilter } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const Filter  = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const action = createFilter(event.target.value)
        dispatch(action)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input  onChange={handleChange}/>
        </div>
    )
}

export default Filter
