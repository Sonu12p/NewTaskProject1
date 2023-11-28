import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import { deleteTaskFromStore } from "../reduxe/dataslice";
import { editTaskInStore } from "../reduxe/edittaskslice";
import { CiSearch } from "react-icons/ci";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const itemsPerPage = 10;

export default function Home() {
  const [alltaskList, setAllTaskList] = useState(
    useSelector((state) => state.tasks.value)
  );
  const [taskList, setTaskList] = useState(
    useSelector((state) => state.tasks.value)
  );
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [sortvalue, setSortvalue] = useState(
    localStorage.getItem("sortvalue") || ""
  );
  //   const taskList = useSelector((state) => state.tasks.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newTaskPage = () => {
    navigate("/add-new-task");
  };
  const category = () => {
    navigate("/category");
  };

  const deleteTask = (task) => {
    dispatch(deleteTaskFromStore(task.taskName));
    setTaskList(taskList.filter(t=>t.taskName != task.taskName))
  };

  const editTask = (task) => {
    dispatch(editTaskInStore(task));
    deleteTask(task);
    navigate("/edit-task");
  };

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = taskList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(taskList.length / itemsPerPage);

  useEffect(() => {
    const filteredItems = alltaskList.filter((task) => {
      const taskNameMatch = task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return taskNameMatch || descriptionMatch;
    });

    const sortCriteria = sortvalue;
    let sortedList = [...filteredItems];

    if (sortCriteria === "Name") {
      sortedList = sortedList.sort((a, b) =>
        a.taskName.localeCompare(b.taskName)
      );
    } else if (sortCriteria === "Category") {
      sortedList = sortedList.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    } else if (sortCriteria === "Last Date Edited") {
      // Assuming lastEdit is a string in the format "YYYY-MM-DD"
      sortedList = sortedList.sort(
        (a, b) => new Date(b.lastEdit) - new Date(a.lastEdit)
      );
    } else if (sortCriteria === "Default") {
      // Assuming lastEdit is a string in the format "YYYY-MM-DD"
      sortedList = filteredItems;
    }

    setTaskList(sortedList);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSortChange = (e) => {
    localStorage.setItem("sortvalue", e.target.value);
    setSortvalue(e.target.value);
    const filteredItems = alltaskList.filter((task) => {
      const taskNameMatch = task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return taskNameMatch || descriptionMatch;
    });

    const sortCriteria = e.target.value;
    let sortedList = [...filteredItems];

    if (sortCriteria === "Name") {
      sortedList = sortedList.sort((a, b) =>
        a.taskName.localeCompare(b.taskName)
      );
    } else if (sortCriteria === "Category") {
      sortedList = sortedList.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    } else if (sortCriteria === "Last Date Edited") {
      // Assuming lastEdit is a string in the format "YYYY-MM-DD"
      sortedList = sortedList.sort(
        (a, b) => new Date(b.lastEdit) - new Date(a.lastEdit)
      );
    } else if (sortCriteria === "Default") {
      // Assuming lastEdit is a string in the format "YYYY-MM-DD"
      sortedList = filteredItems;
    }

    setTaskList(sortedList);
  };
  const handleSearchChange = (e) => {
    localStorage.setItem("searchQuery", e.target.value);
    setSearchQuery(e.target.value);
    const filteredItems = alltaskList.filter((task) => {
      const taskNameMatch = task.taskName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const descriptionMatch = task.description
        .toLowerCase()
        .includes(e.target.value.toLowerCase());

      return taskNameMatch || descriptionMatch;
    });
    const sortCriteria = sortvalue;
    let sortedList = [...filteredItems];

    if (sortCriteria === "Name") {
      sortedList = sortedList.sort((a, b) =>
        a.taskName.localeCompare(b.taskName)
      );
    } else if (sortCriteria === "Category") {
      sortedList = sortedList.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    } else if (sortCriteria === "Last Date Edited") {
      // Assuming lastEdit is a string in the format "YYYY-MM-DD"
      sortedList = sortedList.sort(
        (a, b) => new Date(b.lastEdit) - new Date(a.lastEdit)
      );
    } else if (sortCriteria === "Default") {
      // Assuming lastEdit is a string in the format "YYYY-MM-DD"
      sortedList = filteredItems;
    }

    setTaskList(sortedList);
  };

  return (
    <>
      <div className="main_page_haeader">
        <div className="header_section_searchicon">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <CiSearch />
        </div>
        <div className="header_section" id="newTask">
          <button onClick={newTaskPage}>New Task</button>
        </div>
        <div className="header_section">
          <button onClick={category}>Manage Category</button>
        </div>
        <div className="header_section">
          Sort By :
          <select onChange={handleSortChange} defaultValue={sortvalue}>
            <option value={"Default"}>Default</option>
            <option value={"Name"}>Name</option>
            <option value={"Category"}>Category</option>
            <option value={"Last Date Edited"}>Last Date Edited</option>
          </select>
        </div>
      </div>
      <div className="task_div_main_area">
        {currentItems.map((task) => (
          <div className="task_div">
            <div className="task_div_header">
              <h3>{task.taskName}</h3>
              <i>{task.lastEdit}</i>
            </div>
            <b>{task.category}</b>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
      <div className="table_area">
        <table className="table text-center">
          <thead>
            <tr>
              <th>Sr. no.</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((task, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  {task.taskName}
                  <br />
                  <i>Last Edit : {task.lastEdit}</i>
                </td>
                <td>{task.category}</td>
                <td>{task.description}</td>
                <td>
                  <button onClick={() => editTask(task)}>
                    <MdModeEditOutline />
                  </button>{" "}
                </td>
                <td>
                  <button onClick={() => deleteTask(task)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
