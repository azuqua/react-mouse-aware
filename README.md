# react-mouse-aware [![Build Status](https://travis-ci.org/azuqua/react-mouse-aware.svg?branch=master)](https://travis-ci.org/azuqua/react-mouse-aware)

A tiny higher order component to track mouse state.

### Example
```js
import { Component } from 'react';
import { mouseAware } from 'react-mouse-aware';

@mouseAware({ // same as default options
    inDelay: 0,
    outDelay: 0,
    inHandler: 'onMouseEnter',
    outHandler: 'onMouseLeave',
    key: 'isOver'
})
@mouseAware({
    inDelay: 300,
    outDelay: 100,
    inHandler: 'onMouseDown',
    outHandler: 'onMouseUp',
    key: 'isPressed'
})
class CustomComponent extends Component {

    render() {
        // props will include the in and out handlers
        let { isOver, isPressed, className, ...props } = this.props;

        if (isOver) className += ' hovered'; // mouse is over component
        if (isPressed) className += ' active'; // mouse has been held down for 300ms or was just released

        return (
            <div {...props} className={className}>

            </div>
        )
    }
};
```

### API

##### As a decorator
```js
@mouseAware(options)
export default class Test extends React.Component {
    /* your code */
}
```

##### As a function

```js
class Test extends React.Component {
    /* your code */
}

export default mouseAware(options)(Test);
```
#### Options

##### `inDelay` defaults to `0`
Time in `ms` to wait before setting the `active` status to `true`.

##### `outDelay` defaults to `0`
Time in `ms` to wait before setting the `active` status to `false`.

##### `inHandler` defaults to `'onMouseEnter'`
Property name to expose the `inHandler` as.

##### `outHandler` defaults to `'onMouseLeave'`
Property name to expose the `outHandler` as.

##### `openFunction` no default
Property name to expose the force open function as.
This function will ignore the in delay

##### `closeFunction` no default
Property name to expose the force close function as.
This function will ignore the out delay.

##### `key` defaults to `'isOver'`
Property name to expose the `active` status as.
