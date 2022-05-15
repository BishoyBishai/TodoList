import React, { useState, useEffect } from "react";
import { useGetTodos } from "./http";
import { Header, Todo, TodoModal, LoadMore } from "./components";
import { Error, Loading } from "./components/ui/";
var config = require("./config.json");
import "./App.css";

export default function App() {
  /**
   * Declare state
   */
  const [pageIndex, setPageIndex] = useState(0); // this value to add more chunks each time we ask for more data
  const { data, error, isLoading, isFetching } = useGetTodos(pageIndex); // we pass pageIndex to useGetTodos hooks to load more chunk of date on number of this page index changes
  const [todos, setTodos] = useState([]); // we use this state to carry our todos
  const [sortValue, setSortValue] = useState(""); // we use this state to carry the sort criteria
  const [selectedTodo, setSelectedTodo] = useState(); // to know which Todo has been selected to open modal with its data
  const [completedTodosCount, setCompletedTodosCount] = useState(
    config.completed_all ? todos.length : 0
  ); // to save how much todos has been selected and the default value base on the configuration

  /**
   * Handling state
   */

  // on Sort dropdown changes
  const handleChangeSortValue = (newValue) => {
    setSortValue(newValue);
  };

  // on Click on todo checkbox change status of todo with selected todoIdx
  const handleChangeTodoState = (todoIdx) => {
    setSortValue(""); // we have to remove this line we apply change of line #85
    setTodos((curr) => {
      return curr.map((item) =>
        item.login.uuid === todoIdx
          ? { ...item, completed: !item.completed }
          : item
      );
    });
  };

  // on Click on select all checkbox toggle the status of all to do
  const handleToggleAll = (state) => {
    const newState = todos.map((todo) => ({
      ...todo,
      completed: state,
    }));
    setTodos([...newState]);
  };

  // on Click on load more change page index
  const handleLoadMoreDate = () => {
    setPageIndex(pageIndex + 1);
  };

  // on Click on one of todo select this one and open the modal
  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo);
  };

  // on Click on close modal reset selected to with null
  const handleClosesShowModal = () => {
    setSelectedTodo(null);
  };

  /**
   * Side Effects
   */

  // with any change with the sortValue state resort orders of todo with the new criteria
  useEffect(() => {
    let sortedTodo = [...todos];
    switch (sortValue) {
      case "title":
        sortedTodo = todos.sort(
          (a, b) =>
            a.name && a.name.title && a.name.title.localeCompare(b.name.title)
        );
        break;
      case "completed":
        sortedTodo = todos.sort((a, b) => !!b.completed - !!a.completed);
        break;
    }
    setTodos([...sortedTodo]);
  //}, [sortValue, todo]); // if we want to apply the current sort with next todos changes 
  }, [sortValue]); // if we want to apply the current sort with  

  // when we get data start to add a new prop for this data to check completed state base on config value completed_all
  useEffect(() => {
    if (!data) return;
    const formattedResult = data.results.map((r) => ({
      ...r,
      completed: !!config.completed_all,
    }));
    setTodos([...todos, ...formattedResult]);
  }, [data]);

  // with any change with the todo state recalculate the completed ones
  useEffect(() => {
    const completedTodo = todos.filter((todo) => todo.completed).length;
    setCompletedTodosCount(completedTodo);
  }, [todos]);

  /**
   * Rendering
   */

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="app">
      <Header
        todos={todos}
        data={data}
        isAllComplete={
          completedTodosCount && completedTodosCount === todos.length
        }
        sortValue={sortValue}
        completedTodosCount={completedTodosCount}
        onSortChange={handleChangeSortValue}
        onToggleAll={handleToggleAll}
      />
      <div className="grid">
        {todos.map((todo) => (
          <Todo
            key={todo.login.uuid}
            todo={todo}
            isComplete={todo.completed}
            onChange={handleChangeTodoState}
            onSelectTodo={handleSelectTodo}
          />
        ))}
      </div>
      <LoadMore isLoading={isFetching} onClick={handleLoadMoreDate} />
      <TodoModal
        todo={selectedTodo}
        onClose={handleClosesShowModal}
        show={!!selectedTodo}
      />
    </div>
  );
}
