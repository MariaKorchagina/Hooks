import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// useState - управление состоянием
// useEffect - регистрирует ф-цию, у к-й могут быть побочные эффекты
// useEffect  - появляется когда компонент впервые отрисовывается на страниуе и когда обновляется
const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button
                    onClick={() => setValue((v) => v + 1)}> +</button>
                <button
                    onClick={() => setVisible(false)}>hide</button>
                <ClassCounter value={value} />
                <HookCounter value={value} />
            </div>
        );
    } else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
};

const HookCounter = ({ value }) => {

    useEffect(() => {
        console.log('useEffect()');
        return () => console.log('clear')
    }, [value])
    return <p> {value}</p>
}

class ClassCounter extends Component {
    componentDidMount() {
        console.log('class: mount');
    }
    // показать счетчики

    componentDidUpdate() {
        console.log('class:update')
    }
    //увеличение кол-ва счетчиков

    componentWillUnmount() {
        console.log('class: unmount')
    }
    // скрывать счетчики

    render() {
        return <p>{this.props.value}</p>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));