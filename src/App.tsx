import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <AppRoutes />
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
