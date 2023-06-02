import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import router from "./Router/RoutePath";
import { RouterProvider } from "react-router-dom";
import Main from './Components/Main/Main';


function App() {
  return (
    <RouterProvider router={router}>
      <Main />
    </RouterProvider>
  );
}

export default App;


