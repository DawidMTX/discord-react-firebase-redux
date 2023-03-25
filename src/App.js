import './App.css';
import RootLayout from './components/RootLayout';
import Hero from './components/Hero';
import Channel from './components/Channel';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const routers = createBrowserRouter([

  {path: '/',
  element: <RootLayout/>, 
  children: [
    {index: true, element:<Hero/>}
  ]
},
{path: '/channels', element: <Home/>},
{path: '/channels/:id', element: <Home/>}
])


function App() {

  return (
    <RouterProvider router={routers}/>
  );
}

export default App;
