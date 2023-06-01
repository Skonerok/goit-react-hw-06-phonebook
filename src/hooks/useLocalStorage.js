import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialState) => {
    const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) ?? initialState);
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
        if (localStorage.getItem(key) !== JSON.stringify(state)) {
            setState(JSON.parse(localStorage.getItem(key)))
        }
    }, [state, key])

    return [state, setState];
}
