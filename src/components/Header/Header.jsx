import React from "react";
import "./Header.css";

/**
 * 
 * We Remove the business logic from the Header Component and we change the props to receive more values 
 * We remove the config prop because it is not one of the best practice to change the config file from component  
 * Adding completedTodosCount to not calculate it into the header 
 */

export const Header = ({
  todos,
  isAllComplete,
  onToggleAll,
  sortValue,
  onSortChange,
  completedTodosCount,
}) => {


  const onChangeHandler = (event) => {
    onSortChange(event.target.value);
  };

  const handleToggleAll = () => {
    onToggleAll(!isAllComplete);
  };

  return (
    <div className="header">
      <span>
        Completed Todos {completedTodosCount} / {todos.length}
      </span>

      <div>
        <span className="header-sort_label">Sort by</span>
        <select
          className="header-sort_select"
          value={sortValue}
          onChange={onChangeHandler}
        >
          <option value="">default</option>
          <option value="title">Title</option>
          <option value="completed">Completed</option>
        </select>

        <span className="header-toggle_label">Complete all</span>
        <input type="checkbox" checked={isAllComplete} onChange={handleToggleAll} />
      </div>
    </div>
  );
};
