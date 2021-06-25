import React from "react";
import "./Breadcrumb.scss";

function Breadcrumb(props) {
  function isLast(index) {
    console.log(">>>index>", index);
    console.log(">>>len>", props.crumbs.length);
    return index === props.crumbs.length - 1;
  }
  return (
    <div>
      <ul class="breadcrumb">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Pictures</a>
        </li>
        <li>
          <a href="#">Summer 15</a>
        </li>
        <li>Italy</li>
      </ul>

      <ul class="breadcrumb">
        {props.crumbs &&
          props.crumbs.map((crumb, ci) => {
            const disabled = isLast(ci) ? "disabled" : "";
            return (
              <li key={ci}>
                <a
                  className={`${disabled}`}
                  onClick={() => props.selected(crumb)}
                >
                  {crumb}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
export default Breadcrumb;
