import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom/client"

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

const getPlanet = (id) => {
    return fetch(`http://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        // .then(data => console.log(data.name));
        .then(data => data);
}

const useRequest = (request) => {

    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: null
    }), []);

    //useMemo - работает как useCallback, только useCallback - кэширует само значение, а useMemo кэширует результат работы этой ф-ции

    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        setDataState(initialState)
        let cancelled = false;
        //cancelled - очищает данные, если с ними больше не нужно работать
        request()
            .then(data => !cancelled && setDataState({
                data,
                loading: false,
                error: null
            }))
            // .then(data => console.log(data.name));

            .catch(error => !cancelled && setDataState({
                data: null,
                loading: false,
                error
            }))
        return () => cancelled = true;
    }, [request, initialState]);

    return dataState;
}

//useRequest - хук, к-й может получать данные из любой асинхронной ф-ции (любая ф-ция , к-я возвращает промис)

const usePlanetInfo = (id) => {
    //useCallback - делает так, чтобы ф-ция не пересоздавалась заново, если id не изменилось
    const request = useCallback(() => getPlanet(id), [id])
    // const request = () => getPlanet(id);
    return useRequest(request);
    // const [name, setName] = useState(null);

    // useEffect(() => {
    //     let cancelled = false;
    //     //cancelled - очищает данные, если с ними больше не нужно работать
    //     fetch(`http://swapi.dev/api/planets/${id}`)
    //         .then(res => res.json())
    //         // .then(data => console.log(data.name));
    //         .then(data => !cancelled && setName(data.name));
    //     return () => cancelled = true;
    // }, [id]);

    // return name;
}

const PlanetInfo = ({ id }) => {
    const { data, loading, error } = usePlanetInfo(id);

    if (error) {
        return <div>Something is wrong</div>
    }

    if (loading) {
        return <div>loading...</div>
    }
    return (
        <div>{id} - {data.name}</div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);