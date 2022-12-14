import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import Notification from '../src/index'

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button
                    onClick={() => setValue((v) => v + 1)}>+</button>
                <button
                    onClick={() => setVisible(false)}>hide</button>
                <PlanetInfo id={value} />
            </div>
        );
    } else {
        return <button
            onClick={() => setVisible(true)}>show</button>
    }
};

const PlanetInfo = ({ id }) => {
    return (
        <div>{id} - Planet Name</div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root'));