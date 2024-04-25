# Mastering forwardRef in React with TypeScript

Accessing DOM elements or invoking methods on child components from their parent component.

## Introduction

In React, handling references (refs) and allowing parent components to interact directly with child components can be complex. Fortunately, React's `forwardRef` feature offers a robust solution for these challenges. When used with TypeScript, `forwardRef` not only facilitates smoother component communication but also enhances code safety and maintainability. This guide will explore the use of `forwardRef` with TypeScript, providing practical examples and sharing best practices.

## Understanding forwardRef

forwardRef in React lets you pass a reference (ref) through a component right to one of its child components. This technique is especially useful for directly accessing DOM elements or invoking methods on child components from their parent component.

## Basic Syntax with TypeScript

Here's a basic example showing how to use `forwardRef` in React with TypeScript:

```typescript
import { forwardRef } from "react";

const MyComponent = forwardRef((props, ref) => {
  return (
    <button ref={ref} onClick={props.onClick}>
      Click Me!
    </button>
  );
});
```

# Simple Example with TypeScript

Let's demonstrate a simple use case of forwardRef to access a DOM element in a child component.

### Child Component with forwardRef

```typescript
import { forwardRef } from "react";

const TextInput = forwardRef<HTMLInputElement, { placeholder: string }>(
  (props, ref) => {
    return <input ref={ref} type="text" placeholder={props.placeholder} />;
  }
);
```

### Parent Component Accessing the Child's DOM Node

```typescript
import { useRef, useEffect } from "react";

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <TextInput ref={inputRef} placeholder="Focus on me" />;
};
```

In this example, the parent component focuses the TextInput component upon mount, showcasing the straightforward use of forwardRef to manipulate DOM elements.

# Advanced Usage: Exposing Child Component Methods

A more complex scenario involves exposing child component methods to the parent. This is where forwardRef truly shines, especially when used with useImperativeHandle.

### Child Component with Exposed Methods

In this scenario, we have a button that will expose the onClick method. This method will be triggered from the parent component.

```typescript
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
```

### Parent Component Controlling the Child

From the parent we will trigger the onClick method from the child. Here we also use ChildRef to type the ref.

```typescript
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
```

This section demonstrates combining forwardRef with useImperativeHandle in TypeScript to control a child component's behavior, you could use this pattern to implement various functionalities, like toggling an accordion or opening a modal.

### Typing Components with forwardRef

When using forwardRef with TypeScript, it's crucial to define proper types for both props and refs to ensure type safety.

#### Defining Types

Start by defining types for your component's props and the ref. This clarifies what props are expected and what methods or properties the ref will expose.

```typescript
interface MyComponentProps {
  label: string;
}

interface MyComponentRef {
  focus: () => void;
}
```

#### Implementing the Types

With types defined, implement your component using forwardRef, ensuring that props and the ref adhere to the specified types.

```typescript
const MyComponent = forwardRef<MyComponentRef, MyComponentProps>(
  (props, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        internalRef.current?.focus();
      },
    }));

    return <input ref={internalRef} aria-label={props.label} />;
  }
);
```

## Source Code

Here's the GitHub repository with the complete source code for the advanced example: (https://github.com/mattdeveloper/mastering-react-forward-ref)

## Best Practices and Considerations

When leveraging forwardRef in your components, especially with TypeScript, consider the following best practices:

- Limit the use of forwardRef to cases where direct access to a child component's DOM node or methods is necessary.
- Utilize useImperativeHandle to expose only the necessary functionalities of a child component, keeping the component's API clean and intentional.
- Ensure to propagate ref properly within your component, especially when dealing with nested components or forwardRefs.

## Conclusion

`forwardRef`, particularly when combined with TypeScript, provides a powerful tool to enhance the flexibility, reusability, and type safety of your React components. By understanding its applications and adhering to best practices, you can create more maintainable and robust applications.
