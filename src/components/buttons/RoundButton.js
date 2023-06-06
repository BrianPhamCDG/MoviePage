import React from "react";

const RoundButton = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`movie-list-card-icon-play flex cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default RoundButton;
