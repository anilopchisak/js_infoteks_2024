import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './app/App';
import UserStore from "./pages/TableUsersPage/store/userStore";


export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
    }}>
        <App />
    </Context.Provider>
);
