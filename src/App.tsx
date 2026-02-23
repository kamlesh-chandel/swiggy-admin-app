import { ToastContainer } from 'react-toastify';
import Routes from './routes';

function App() {
  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnHover
      />
    </>
  );
}
export default App;
