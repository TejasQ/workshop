import { FunctionComponent } from "react";

export const HeaderNavItem: FunctionComponent<{ className?: string }> = (
  props
) => (
  <li>
    <button className={"px-2 py-1 rounded" + ` ${props.className || ""}`}>
      {props.children}
    </button>
  </li>
);
