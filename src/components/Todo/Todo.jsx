import React from "react";
import "./Todo.css";
import { LazyImage } from "./../LazyImage";

/**
 * We divide this component into small components and functions
 * to be easy to test and maintain
 */

/**
 *  its function to return formatted full name with structure title first name, and last name
 */

const getNames = (todo) => {
  if (!todo || !todo.name) return "No name";
  const { title, last, first } = todo.name;
  return `${title} ${first} ${last}`;
};

/**
 * Location Component to display the Location of todo
 */
const Location = ({ location: { street, ...rest } }) => {
  const { name: myStreetName, number: myStreetNumber } = street.name;
  const { postcode: myPostcode } = rest;
  return (
    <div className="todo_location">
      Address: {myStreetName + " " + myStreetNumber}
      <br></br>
      <br></br>
      Postcode: {myPostcode}
    </div>
  );
};

/**
 * It's Just Todo Component as small unit to display component's structure
 * we removed the Modal from this component to not create tons of component for the same logic
 */

export const Todo = ({ todo, onChange, onSelectTodo }) => {

  /**
   * With handleInputChange we can change the selected component in parent state
   */

  const handleSelectTodo = () => {
    onSelectTodo(todo);
  };
  
  /**
   * With handleInputChange we can change the toggle component state in parent state
   */

  const handleInputChange = () => {
    onChange(todo.login.uuid);
  };
  return (
    <div className="todo">
      <div onClick={handleSelectTodo}>
        <div className="todo_title">{getNames(todo)}</div>

        <div className="todo_image">
          <LazyImage src={todo.picture.large} alt={todo.picture.large} />
        </div>

        <Location location={todo.location} />
      </div>

      <span>
        Completed:{" "}
        <input
          type="checkbox"
          checked={todo.completed}
          className="todo_checked"
          onChange={handleInputChange}
        />
      </span>
    </div>
  );
};
