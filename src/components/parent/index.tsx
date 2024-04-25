import { useRef } from "react";

import { ChildComponent, ChildRef } from "../child";

export const App: React.FC = () => {
  const childRef = useRef<ChildRef>(null);

  const triggerChild = () => {
    childRef.current?.onClick();
  };

  return (
    <div className="app">
      <header>
        Demonstrate usage of forwardRef.{" "}
        <a onClick={triggerChild}>Click here</a> to trigger the click event on
        the button in the child component.
      </header>

      <div className="child">
        <ChildComponent ref={childRef} />
      </div>
    </div>
  );
};
