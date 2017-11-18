### 1. functional React component

The [functional React component](https://reactjs.org/docs/components-and-props.html#functional-and-class-components) can be created by a pure function,

```
const Page = () => (
    <div>Hello</div>
);

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);
```

### 2. stateful React component

A stateful React component can be create by a `class`.

```
class StatefulPage extends Component {
    constructor(...args) {
        super(...args);

        this.state = ...;
    }

    onSomeEvent() {
        ...
    }

    componentDidMount() {
        ...
    }

    render() {
        ...    // state, props or some extra computed data may be used below.
        return <Page {...state} {...props} {...events} {...extraData} />
    }
}
```

### 3. stateful pattern & use case

We found that the different between "functional component" and "stateful component" is,

```
const StatefulPage = statefulTemplate({
    Template: Page,
    state,
    events,
    extra,
})
```

so we can divide a "stateful component" into four part.

(1) the `Template` part is a "functional component"

(2) the `state` part is the "stateful component" `state` field, for example,

```
state =  {
    selectedNumber: null,
}
```

(3) the `events` part is the other methods of a "stateful component" including [React lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle), for example,

```
events = {
    onSomeEvent() {
        // `this` is the instance of the "stateful component"
        // so we can use `this.props`, `this.state` & `this.setState`.
    }

    // lifecycle methods
    componentDidMount() { ... }
};

```

(4) the `extra` part is an *optional* pure function which computes extra data used in the `Template`, for example,

```
extra = function() {
    // `this` is the instance of the "stateful component"
    // so we can get `this.props` & `this.state`.

    // the returned object will be passed to the `Template` as props.
    return {
        ...
    };
}
```

### 4. best practice

With this `statefulTemplate` lib, we can build a tiny front-end framework.

First, let's separate `Template`, `state`, `events` & `extra` into four javascript modules.

And then, we combine these four parts to a stateful component.

```
import Template from './index.template.jsx';
import state from './index.state';
import events from './index.events';
import extra from './index.extra';

export default statefulTemplate({
    Template,
    state,
    events,
    extra,    // optional
});
```

At last, we get a stateful React component gracefully.