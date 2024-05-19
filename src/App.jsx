import "./App.css";
import Calendar from "./Components/Calendar";
import { ToastContainer } from 'react-toastify';
import "./index.css";

export default function App() {
  return (
    <main>
         <ToastContainer />
      <Calendar />
    </main>
  );
}
