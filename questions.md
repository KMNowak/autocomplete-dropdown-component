# 1. What is the difference between Component and PureComponent? give an example where it might break my app

# 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
By design `Context` is used to prevent from prop drilling and passing state to deeply nested components. Each component
that is nested in `Context.Provider` and subscribed to a given `Context`, updates and rerenders on `Context` `value` change. 
However, `shouldComponentUpdate` can prevent from updating subscribed to `Context` children even if `Context` `value` change.
As a result we may have different `value` in `Context` than the one existing in subscribed `children`.
# 3. Describe 3 ways to pass information from a component to its PARENT.
TODO: examples
- lifting the state up with a function passed to a children component props
- using `Context API`
- using external state store e.g. redux updating global state in a Children and reading it current value in a Parent
# 4. Give 2 ways to prevent components from re-rendering
1. `React.memo(Component, comparisonFunction)` is a HOC used to prevent from component rerendering function components on parent rerender as long as it returns the same JSX when props do not change according to passed optionally `comparisonFunction`. It is not mandatory to define `comparisonFunction`. By default, it provides shallow comparison of passed props.
2. `React.PureComponent` for class components. It memoizes props and state and if they do not change in a shallow comparison _pure_ children does not rerender even if parent rerenders.

# 5. What is a fragment and why do we need it? Give an example where it might break my app
Fragment is provided by React _fake_ DOM Node used to group elements without modifying the DOM in the final output. Thanks to that we can group and 
render DOM elements without unnecessary DOM nodes e.g. wrapper `<div>`.

Syntax:
```typescript jsx
<React.Fragment key={'some-key'}>other nodes</React.Fragment>
```
And if we do not need define key explicitly:
```typescript jsx
<>other nodes</>
```

I'd be careful returning `React.Fragment` directly from the component, but rather prefer returning single container to make sure that when we reuse the component it does not 
populate parent with many children and e.g. break it's styling.
# 6. Give 3 examples of the HOC pattern.

# 7. what's the difference in handling exceptions in promises, callbacks and async...await.

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
`setState` is asynchronous because if it changes, it is taken by React Reconciliation algorithm and it's calculated whether 
the component has to rerender due to state changes.
In React 18. `setState` function calls are grouped by React and applied in batches when possible. As a result it's not recommended 
to sequentially call `setState` depending one on another.
# 9. List the steps needed to migrate a Class to Function Component

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
