import React from "react";

function DropdownItem(props) {
    return <div onClick={() => props.onClick()} className="menu-item">
      {props.children}
    </div>
  }

export default DropdownItem;