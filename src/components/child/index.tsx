import { forwardRef, useImperativeHandle } from "react";

interface ChildProps {}

/**
 * Interface that will be exposed to the parent component.
 */
export interface ChildRef {
  onClick: () => void;
}

export const ChildComponent = forwardRef<ChildRef, ChildProps>((props, ref) => {
  const onClick = () => {
    alert("Button from child component clicked!");
  };

  /**
   * Expose the `onClick` function to the parent component.
   */
  useImperativeHandle(ref, () => ({
    onClick,
  }));

  return <button onClick={onClick}>Show alert!</button>;
});
