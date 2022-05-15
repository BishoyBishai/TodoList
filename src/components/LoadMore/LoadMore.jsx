import React from "react";
import "./LoadMore.css";
/**
 * This Button component change its state base on isLoading value
 */
export function LoadMore({ onClick, isLoading }) {
  const handleOnClick = () => {
    !isLoading && onClick();
  };
  return (
    <button className="load-more" onClick={handleOnClick}>
      {isLoading ? "Loading...." : " Load more"}
    </button>
  );
}
