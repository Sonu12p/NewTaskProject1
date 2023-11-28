import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addNewTask } from "../reduxe/dataslice";
import { useNavigate } from "react-router-dom";

export default function EditTask() {

    const categoryList = useSelector((state)=>state.catogories.value)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let currTask = useSelector(state=>state.currEditTask.value)

    const taskNameBox = useRef();
    const taskCatogoryBox = useRef();
    const taskDescriptionBox = useRef();

    const update = (event) =>{
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
        navigate("/")
    }

    return(
        <div>
            <h1>Edit Slice</h1>
            <form onSubmit={update}>
                <div className="form_area">
                <div className="input_area">
                        <label for="taskName" >Task Name :</label>
                        <input defaultValue={currTask.taskName} type="text" id="taskName" ref={taskNameBox} placeholder="Task" required/>
                    </div> 

                    <div className="input_area">
                        <label for="taskCat" >Category :</label>
                            <select defaultValue={currTask.description} ref={taskCatogoryBox} id="taskCat">
                                <option value={""}>Select Category</option>
                                {categoryList.map(cat=><option value={cat}>{cat}</option>)}
                            </select>
                    </div> 

                    <div className="input_area"> 
                        <label for="taskDisc" >Description :</label>
                            <textarea defaultValue={currTask.description} id="taskDisc" ref={taskDescriptionBox} placeholder="Description" required/>
                    </div> 
                    <div className="input_area"> 
                        <button>Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}