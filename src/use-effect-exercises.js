import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [value, setValue] = useState(1);
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

    const [name, setName] = useState(null);

    useEffect(() => {
        let cancelled = false;
        //cancelled - очищает данные, если с ними больше не нужно работать
        fetch(`http://swapi.dev/api/planets/${id}`)
            .then(res => res.json())
            // .then(data => console.log(data.name));
            .then(data => !cancelled && setName(data.name));
        return () => cancelled = true;
    }, [id])

    return (
        <div>{id} - {name}</div>
    )
}
ReactDOM.render(<App />,
    document.getElementById('root'));