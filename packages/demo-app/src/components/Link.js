import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { TodoContext } from "../TodoContext/TodoContext";

const Link = ({ children, filter }) => {
  const { visibilityFilter, setVisibilityFilter } = useContext(TodoContext);

  return (
    <a
      className={classnames({ selected: filter === visibilityFilter })}
      style={{ cursor: "pointer" }}
      onClick={() => setVisibilityFilter(filter)}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  filter: PropTypes.string.isRequired
};

export default Link;
