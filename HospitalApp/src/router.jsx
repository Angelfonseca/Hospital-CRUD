import {createBrowserRouter} from 'react-router-dom';

// Layouts
import Layout from './layouts/Layout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

//Views
import Login from './views/Login.jsx';
import Inicio from './views/Inicio.jsx';
import Reportes from './views/Reportes.jsx';
import Editar from './views/Editar.jsx';
import Añadir from './views/Añadir.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { 
                index:true,
                element: <Inicio/> 
            },
             {
                 path: '/reportes',
                 element: <Reportes/>
            },
            {
                path: '/editar',
                element: <Editar/>
            },
            {
                path: '/añadir',
                element: <Añadir/>
            
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { 
                index:true, 
                element: <Login/> 
            },
        ]
    }
])

export default router