import React, { Component } from 'react';

const LIFECYCLE_METHODS = [
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
    'componentDidCatch'
];

export default ({ Template, state, events, extra }) => class extends Component {
    constructor(...args) {
        super(...args);

        this.state = state;
        this.events = {};
        Object.keys(events).forEach(name => {
            const handler = events[name];

            const isLifecyleMethod = LIFECYCLE_METHODS.some(methodName => methodName === name);
            if (isLifecyleMethod) {
                this[name] = handler.bind(this);
                return;
            }

            this.events[name] = handler.bind(this);
        });
    }

    render() {
        const { state, props, events } = this;
        const extraData = extra.call(this);

        return <Template {...state} {...props} {...events} {...extraData} />
    }
};