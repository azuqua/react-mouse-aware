# react-mouseAware

A tiny decorator to track mouse state on a component.

### Example
```js
import { Component } from 'react';
import { mouseAware } from 'react-mouseAware';

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

            </diV>
        )
    }
};
```

### Options

##### `inDelay` defaults to `0`
Time in `ms` to wait before setting the `active` status to `true`.

##### `outDelay` defaults to `0`
Time in `ms` to wait before setting the `active` status to `false`.

##### `inHandler` defaults to `'onMouseEnter'`
Property name to expose the `inHandler` as.

##### `outHandler` defaults to `'onMouseLeave'`
Property name to expose the `outHandler` as.

##### `key` defaults to `'isOver'`
Property name to expose the `active` status as.
