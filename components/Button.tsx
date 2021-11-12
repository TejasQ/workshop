import {
  CSSProperties,
  FunctionComponent,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import { Spinner } from "./Spinner";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyPress?: KeyboardEventHandler<HTMLButtonElement>;
  className: string;
  loading?: boolean;
  style?: CSSProperties;
};

export const Button: FunctionComponent<Props> = ({
  className,
  onClick,
  children,
  loading,
  style,
}) => {
  return (
    <button
      style={style}
      disabled={loading}
      onKeyPress={(e) => e.stopPropagation()}
      onClick={onClick}
      className={"text-xs p-1 rounded" + ` ${className}`}
    >
      {loading ? <Spinner size="8" /> : children}
    </button>
  );
};
