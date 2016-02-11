import { createElement, Component } from 'react';
import hoist from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export const mouseAware = ({
    inDelay = 0,
    outDelay = 0,
    inHandler = 'onMouseEnter',
    outHandler = 'onMouseLeave',
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

            const commit = () => {
                this.timeout = null;
                this.setState({ active: true });
            };

            if (inDelay) {
                this.timeout = setTimeout(commit, inDelay);
            } else {
                commit();
            }
        };

        onLeave = (...args) => {
            if (this.props[outHandler]) this.props[outHandler](...args);
            if (this.timeout) clearTimeout(this.timeout);

            const commit = () => {
                this.timeout = null;
                this.setState({ active: false });
            };

            if (outDelay) {
                this.timeout = setTimeout(commit, outDelay);
            } else {
                commit();
            }
        };

        render() {
            const props = {
                ...this.props,
                [key]: this.state.active,
                [inHandler]: this.onEnter,
                [outHandler]: this.onLeave,
            };

            return createElement(OriginalComponent, props);
        }
    }

    return hoist(WrappedComponent, Component);
};
