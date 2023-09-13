import { createContext, useContext, useState } from 'react';

const ApiCalledContext = createContext();

export function ApiCalledProvider({ children }) {
    const [apiCalled, setApiCalled] = useState(false);

    return (
        <ApiCalledContext.Provider value={{ apiCalled, setApiCalled }}>
            {children}
        </ApiCalledContext.Provider>
    );
}

export function useApiCalled() {
    return useContext(ApiCalledContext);
}
