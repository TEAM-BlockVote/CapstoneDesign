import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Store/auth-context';

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <AuthContextProvider>
    <App />    
  </AuthContextProvider>  
);
