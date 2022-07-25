import Router from './utils/router'
import './App.scss';
import { useRoutes } from 'react-router-dom';

function App() {
    // const element = useRoutes(<Router/>);
    // return element;
    return (
        <div className='app'>
            <Router />
        </div>
    );
}

export default App;
