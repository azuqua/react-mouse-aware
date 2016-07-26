import { createElement, Component } from 'react';
import hoist from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export const mouseAware = ({
    inDelay = 0,
    outDelay = 0,
    inHandler = 'onMouseEnter',
    outHandler = 'onMouseLeave',
    openFunction = 'forceOpen',
    closeFunction = 'forceClose',
    key = 'isOver',
} = {}) => (OriginalComponent) => {
    // create higher order component to track state
    class WrappedComponent extends Component {

        static displayName = `MouseAware(${getDisplayName(OriginalComponent)})`;

        constructor() {
            super();
            this.timeout = null;
            this.state = {
                active: false,
            };
        }

        componentWillUnmount() {
            if (this.timeout) clearTimeout(this.timeout);
        }

        onEnter = (...args) => {
            if (this.props[inHandler]) this.props[inHandler](...args);
            if (this.timeout) clearTimeout(this.timeout);

            if (inDelay) {
                this.timeout = setTimeout(this.open, inDelay);
            } else {
                this.open();
            }
        };

        onLeave = (...args) => {
            if (this.props[outHandler]) this.props[outHandler](...args);
            if (this.timeout) clearTimeout(this.timeout);

            if (outDelay) {
                this.timeout = setTimeout(this.close, outDelay);
            } else {
                this.close();
            }
        };

        open = () => {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            if (!this.state.active) this.setState({ active: true });
        };

        close = () => {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            if (this.state.active) this.setState({ active: false });
        };

        render() {
            const props = {
                ...this.props,
                [key]: this.state.active,
                [inHandler]: this.onEnter,
                [outHandler]: this.onLeave,
            };

            if (openFunction) props[openFunction] = this.open;
            if (closeFunction) props[closeFunction] = this.close;

            return createElement(OriginalComponent, props);
        }
    }

    return hoist(WrappedComponent, Component);
};
