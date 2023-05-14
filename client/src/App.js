import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import router from "./Router/RoutePath";
import { RouterProvider } from "react-router-dom";

function App() {

  return (
    <RouterProvider router={router}/>
  );
  
}

export default App;