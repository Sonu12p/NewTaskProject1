import { useNavigate } from "react-router-dom"
import css from "./NewTaskAdd.css"
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import { addNewTask } from "../reduxe/dataslice"

export default function NewTaskAdd(){
    const categoryList = useSelector((state)=>state.catogories.value)
    const dispatch = useDispatch();

    const taskNameBox = useRef();
    const taskCatogoryBox = useRef();
    const taskDescriptionBox = useRef();

    const navigate = useNavigate()
    const backToHome=()=>{
        navigate("/")
    }

    const addTask=(event)=>{
        event.preventDefault();
        const currentDate = new Date()
        const taskObject = {
            taskName : taskNameBox.current.value,
            description : taskDescriptionBox.current.value,
            category : taskCatogoryBox.current.value,
            lastEdit : currentDate.toLocaleDateString()
        }
        dispatch(addNewTask(taskObject));
        event.target.reset()
    }
    return(
        <div className="newTask" id="box">
            <button onClick={backToHome}>Home</button>
            <h1>New TaskData</h1>
            <div className="container">
            <form onSubmit={addTask}>
                <div className="form_area">
                    <div className="input_area">
                        <label >Task Name :</label>
                        <input type="text" ref={taskNameBox} placeholder="Task" required/>
                    </div> 

                    <div className="input_area">
                        <label >Category :</label>
                            <select ref={taskCatogoryBox} >
                                <option value={""}>Select Category</option>
                                {categoryList.map(cat=><option value={cat}>{cat}</option>)}
                            </select>
                    </div> 

                    <div className="input_area"> 
                        <label >Description :</label>
                            <textarea ref={taskDescriptionBox} placeholder="Description" required/>
                    </div> 
                    <div className="input_area"> 
                        <button>Add</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}