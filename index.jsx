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

export default ({ Template, state, events, extras = {}, fields = {} }) => class extends Component {
    constructor(...args) {
        super(...args);

        this.state = state;

        this._fields = {};
        Object.keys(fields).forEach(name => {
            const fieldCreator = fields[name];
            this._fields[name] = fieldCreator.call(this);
        });

        this._events = {};
        Object.keys(events).forEach(name => {
            const handler = events[name];

            const isLifecycleMethod = LIFECYCLE_METHODS.some(methodName => methodName === name);
            if (isLifecycleMethod) {
                this[name] = handler.bind(this);
                return;
            }

            this._events[name] = handler.bind(this);
        });
    }

    render() {
        const { state, props, _events, _fields } = this;
        const extraData = Object.keys(extras).reduce((memo, name) => {
            const extraDataCreator = extras[name];
            memo[name] = extraDataCreator.call(this);
            return memo;
        }, {});

        return <Template {...props} {...state} {..._fields} {..._events} {...extraData} />
    }
};