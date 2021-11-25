import React, { useState, useImperativeHandle } from "react";

import PropType from "prop-types";

const Togglable = React.forwardRef(
  (props: { buttonLabel: string; children: React.ReactNode }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    function toggleVisibility() {
      setVisible(!visible);
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <div>
        <div style={hideWhenVisible}>
          <button type="button" onClick={toggleVisibility}>
            {props.buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button type="button" onClick={toggleVisibility}>
            cancel
          </button>
        </div>
      </div>
    );
  }
);

Togglable.propTypes = {
  buttonLabel: PropType.string.isRequired,
};
export default Togglable;
