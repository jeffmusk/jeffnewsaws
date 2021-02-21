import { ToastContainer, toast } from "react-toastify";

const App = () => {
  notify = () => toast("Wow so easy !");

  return (
    <div>
      <button onClick={notify}>Notify !</button>
      // You can add <ToastContainer /> in root component as well.
      <ToastContainer />
    </div>
  );
};
