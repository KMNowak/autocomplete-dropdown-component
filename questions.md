# 1. What is the difference between Component and PureComponent? give an example where it might break my app
`PureComponent` class does not contain `shouldComponentUpdate(nextProps, nextState)` method explicitly as opposed to `Component` class.
As a result we cannot define explicitly when the component should be updated regarding `nextProps` and `nextState`, but the shallow comparison is performed.
Thus, if we pass non-primitive props e.g. objects and some of those objects props change we'd expect the component to rerender. Unfortunately if we
mistakenly use `PureComponent` then despite the fact that new props were passed, the `PureComponent` performing shallow comparison will notice, that the
reference to passed object did not change so since it memorizes it's form there is no rerender.
# 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
By design `Context` is used to prevent from prop drilling and passing state to deeply nested components. Each component
that is nested in `Context.Provider` and subscribed to a given `Context`, updates and rerenders on `Context` `value` change. 
However, `shouldComponentUpdate` can prevent from updating subscribed to `Context` children even if `Context` `value` change.
As a result we may have different `value` in `Context` than the one existing in subscribed `children`.
# 3. Describe 3 ways to pass information from a component to its PARENT.
- lifting the state up with a function passed to a children component props
- using `Context API`, changing its value in a subscribed Children and reading it in a subscribed Parent
- using external state store e.g. redux updating global state in a Children and reading it current value in a Parent
# 4. Give 2 ways to prevent components from re-rendering
1. `React.memo(Component, comparisonFunction)` is a HOC used to prevent from component rerendering function components on parent rerender as long as it returns the same JSX when props do not change according to passed optionally `comparisonFunction`. It is not mandatory to define `comparisonFunction`. By default, it provides shallow comparison of passed props.
2. `React.PureComponent` for class components. It memorizes props and if they do not change in a shallow comparison _pure_ children does not rerender even if parent rerenders.
# 5. What is a fragment and why do we need it? Give an example where it might break my app
Fragment is provided by React _fake_ DOM Node used to group elements without modifying the DOM in the final output. Thanks to that we can group and 
render DOM elements without unnecessary DOM nodes e.g. wrapper `<div>`. Additionally each component should return one node, so if we want to return many of them without adding non needed wrappers, we should use fragment.

Syntax:
```typescript jsx
<React.Fragment key={'some-key'}>other nodes</React.Fragment>
```
And if we do not need define key explicitly:
```typescript jsx
<>other nodes</>
```

I'd be careful returning `React.Fragment` directly from the component, but rather prefer returning single container to make sure that when we reuse the component it does not 
populate parent with many children and e.g. break its styling.
# 6. Give 3 examples of the HOC pattern.
I'm sorry but the question is not clear for me.

If you want me to show which React API HOCs I know, I'd go with
- `React.memo`
- `React.forwardRef` but bearing in mind that it introduces in the component new argument `ref` as a second one just after `props` 
And that's all I know directly from React API.

# 7. what's the difference in handling exceptions in promises, callbacks and async...await.
## Promises
In promises pattern thrown exceptions are handled in `catch`method
```typescript
const someFun = () => someAsyncOperation()
  .then(data => doSthWithData(data))
  .catch(err => {
    // only if someAsyncOperation() threw an error or calls Promise.reject(error)
    return handleTheError(err)
  })
```
## Callbacks
In callbacks error is most often the first argument of given callback function
```typescript
const callback = (error, data) => {
  if (error) {
    return handleTheError(error)
  } else {
    return doSthWithData(data)
  }
}
const someAsyncOperation = (args) => {
  if (!args) {
    callback('args is missing')
  } else {
    callback(null, args)
  }
}
```
## async..await
In `async/await` errors are caught in the `catch` block
```typescript
const someFun = async () => {
  try {
    const res = await someAsyncOperation()
    
    return doSthWithData()
  } catch (e) {
    // only if someAsyncOperation() threw an error
    return handleError(e)
  }
}
```
# 8. How many arguments does setState take and why is it async
`setState` has multiple interfaces
1. When we want to set the value directly
```typescript jsx
setState('new value')
```
2. When we want to set the value regarding previous state. It's a preferred way if we have to take into consideration previous state to prevent stale state update.
```typescript jsx
setState(prevState => !prevState)
```
3. In class components:
```typescript jsx
this.setState((prevState, props) => ({
}));
```
`setState` is asynchronous because if it changes, it is taken by React Reconciliation algorithm and it's calculated whether 
the component has to rerender due to state changes.
In React 18. `setState` function calls are grouped by React and applied in batches when possible. As a result it's not recommended 
to sequentially call `setState` depending one on another.
# 9. List the steps needed to migrate a Class to Function Component
1. In perfect scenario firstly we should define snapshot and unit tests for the component that is being rewritten. For all interactions that cause rerenders. Thanks to that we'll be 100% certain that new `React.FC` is 1:1 with the old one.
2. `render()` content is `return` in FC
3. replace `this.setState` and `constructor() { this.state = {} }` with `useState` accordingly
4. replace `componentDidMount(){ cdmContent() }` and `componentWillUnmount() { cwuContent() }` with 
```typescript jsx
import { useEffect } from 'react'

useEffect(() => {
    cdmContent()
    return () => cwuContent() 
  }, [])
```
5. Replace `componentDidUpdate() { cduContent() }` with

```typescript jsx
import { useEffect } from 'react'

useEffect(() => {
  cduContent()
}, [...propsThatShouldFireEffect])
```
6. If necessary replace `shouldComponentUpdate()` with `React.memo(Component, comparisonMethod)`
# 10. List a few ways styles can be used with components.
1. `className` is a property to pass names of classes e.g. from imported
```typescript jsx
import { FunctionComponent } from 'react'

import './styles.css'

const MyComponent: FunctionComponent = () => {
  return <div className={'someClassFromImportedStyles'}>Some content</div>
}
```
2. We can pass inline `style` property of type `React.CSSProperties`. It has higher precedence than styles passed by classes in a `className` property.

```typescript jsx
import { CSSProperties, FunctionComponent } from 'react'

import './styles.css'

interface Props {
  styles?: CSSProperties
}

const MyComponent: FunctionComponent<Props> = ({ styles }) => {
  return <div className={'someClassFromImportedStyles'} style={{ ...styles, height: '100px' }}>
    Some content with style overriden by 'styles' property and declared directly height of 100px.
  </div>
}
```

3. We can use external library called `styled-components`. It utilizes Template Literals mechanism passing new styles to the component.
```typescript jsx
import styled from 'styled-components'

const UnstyledDiv = () => <div>sth</div>

export const StyledDiv = styled(UnstyledDiv)`
  height: 100px;
`
```

# 11. How to render an HTML string coming from the server.
One of the way to render HTML string coming from the server is using `dangerouslySetInnerHTML` property

```typescript jsx
<span dangerouslySetInnerHTML={{ __html: dataFromServer }}/>
```

It might be useful while rendering content from CMSes that outputs plain HTML while editing content. However, it may 
put us in danger of XSS e.g. by passing malicious `<script>` to the rendered content
