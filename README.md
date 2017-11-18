### 1. Use case

With `stateful-template`, we can create a tiny front-end framework based on React.

Firstly we divide a normal React component into 5 parts, and then, rebuild it.

```
import Template from './index.template.jsx';
import state from './index.state';
import events from './index.events';
import extras from './index.extras';
import fields from './index.fields';

export default statefulTemplate({
    Template,
    state,
    events,
    extras,    // optional
    fields,    // optional
});
```

### 2. Elements

#### 2.1 Template

The `Template` part is a [functional React component](https://reactjs.org/docs/components-and-props.html#functional-and-class-components).

#### 2.2 state

The `state` part is the React component's `state` field, for example,

```
state =  {
    someState: null,
}
```

#### 2.3 events

The `events` are the component's public methods including [lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle), for example,

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

#### 2.4 extras

The `extras` part is *optional*, if given, it would provide extra data appears in `Template`. 

```
extras = {
    // it's return value will be passed to the `Template` as props.
    someExtraData() {
        // `this` is the instance of the "stateful component"
        // so we can get `this.props` & `this.state`.
    }
};
```

#### 2.5 fields

The `fields` part is also *optional*, if given, it would provide some other public fields of the component.

```
fields = {
    // it's return value will be set to be the public field of the "stateful component".
    someField() {
        // `this` is the instance of the "stateful component"
        // so we can get `this.props` & `this.state`.
    }
};
```

### 3. Stateful component 

```
class StatefulComponent extends Component {
    constructor(...args) {
        super(...args);

        this.state = ...;

        this.someField = ...;
    }

    onSomeEvent() {
        ...
    }

    componentDidMount() {
        ...
    }

    render() {
        ...    // state, props or some extra computed data may be used below.
        return <Template {...props} {...state} {...fields} {...events} {...extraData} />
    }
}
```
