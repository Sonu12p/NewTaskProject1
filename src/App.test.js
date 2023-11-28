import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // You'll need to install redux-mock-store
import { MemoryRouter } from "react-router-dom";
import NewTaskAdd from "../src/component/NewTaskAdd";
import { addNewTask } from "../reduxe/dataslice";
import Home from "./component/Home";
import { deleteTaskFromStore, editTaskInStore } from "../reduxe/dataslice";

const mockStore = configureStore([]);

describe("NewTaskAdd Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      catogories: {
        value: ["Category 1", "Category 2"], // Mocked categories data
      },
      // Other relevant mock state for redux
    });
  });

  test("Submitting the form adds a new task", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <NewTaskAdd />
      </Provider>
    );

    // Simulate form inputs
    fireEvent.change(getByPlaceholderText("Task"), {
      target: { value: "New Task" },
    });

    fireEvent.change(getByPlaceholderText("Description"), {
      target: { value: "Task Description" },
    });

    // Select an option from the category dropdown
    fireEvent.change(getByPlaceholderText("Select Category"), {
      target: { value: "Category 1" },
    });

    // Submit the form
    fireEvent.click(getByText("Add"));

    // Check if the addNewTask action was dispatched
    const actions = store.getActions();
    expect(actions).toEqual([addNewTask(/* expected task object */)]);
  });

  // You can add more test cases to cover edge cases, form validations, etc.
  test("Home Component", () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        tasks: {
          value: [
            {
              taskName: "Task 1",
              description: "Description 1",
              category: "Category 1",
              lastEdit: "2023-11-28",
            },
            {
              taskName: "Task 2",
              description: "Description 2",
              category: "Category 2",
              lastEdit: "2023-11-27",
            },
            // Mocked tasks array
          ],
        },
        // Other relevant mock state for redux
      });
    });
    beforeEach(() => {
      // Mock a larger list of tasks for pagination testing
      const tasks = [];
      for (let i = 1; i <= 20; i++) {
        tasks.push({
          taskName: `Task ${i}`,
          description: `Description ${i}`,
          category: `Category ${i}`,
          lastEdit: `2023-11-${i < 10 ? "0" + i : i}`,
        });
      }
      store = mockStore({
        tasks: {
          value: tasks,
        },
        // Other relevant mock state for redux
      });
    });
    test("Renders tasks correctly", () => {
      const { getByText } = render(
        <Provider store={store}>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </Provider>
      );

      expect(getByText("Task 1")).toBeInTheDocument();
      expect(getByText("Task 2")).toBeInTheDocument();
      // Check for other expected elements or content
    });
    // Sorting
    test("Sorting tasks works correctly", () => {
      const { getByText, getByTestId } = render(
        <Provider store={store}>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </Provider>
      );
      // Click on the sorting dropdown/select element
      const sortingDropdown = getByTestId("sorting-dropdown"); // Assuming there's a test ID for the sorting dropdown
      fireEvent.change(sortingDropdown, { target: { value: "Name" } }); // Change the sorting option to 'Name'

      // Get the task elements after sorting
      const tasksAfterSorting =
        getByTestId("task-list").querySelectorAll(".task_div");

      // Validate if the tasks are arranged in the expected order after sorting by 'Name'
      expect(tasksAfterSorting[0]).toHaveTextContent("Task 1");
      expect(tasksAfterSorting[1]).toHaveTextContent("Task 2");

      // Check if UI reflects the chosen sorting option
      expect(getByText("Sort By :")).toHaveValue("Name"); // Assuming the selected option is reflected in a UI element

      test("Deleting a task dispatches deleteTaskFromStore action", () => {
        const { getByText, queryByText } = render(
          <Provider store={store}>
            <MemoryRouter>
              <Home />
            </MemoryRouter>
          </Provider>
        );

        fireEvent.click(getByText("Delete", { exact: false })); // Click on delete button

        expect(store.getActions()).toContainEqual(
          deleteTaskFromStore("Task 1")
        );
        expect(queryByText("Task 1")).toBeNull(); // Check if the task is removed from UI
      });

      test("Editing a task dispatches editTaskInStore action", () => {
        const { getByText } = render(
          <Provider store={store}>
            <MemoryRouter>
              <Home />
            </MemoryRouter>
          </Provider>
        );

        fireEvent.click(getByText("Edit", { exact: false })); // Click on edit button

        expect(store.getActions()).toContainEqual(
          editTaskInStore(/* task object */)
        ); // Assert dispatched action
        // Add assertions for the updated UI state after editing if necessary
        test("Pagination works correctly", () => {
          const { getByText, queryByText } = render(
            <Provider store={store}>
              <MemoryRouter>
                <Home />
              </MemoryRouter>
            </Provider>
          );
          expect(queryByText("Task 11")).toBeInTheDocument(); // Assuming 'Task 11' should be on the second page

          // Validate the presence of pagination elements
          expect(getByText("1")).toBeInTheDocument();
          expect(getByText("2")).toBeInTheDocument();
        });
      });
    });
  });
});

