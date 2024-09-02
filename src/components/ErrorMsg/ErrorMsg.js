import Swal from "sweetalert2";
import { resetErrorAction } from "../../Redux/Slices/globalActions/globalActions";
import { useDispatch } from "react-redux";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonColor: "#3085d6",
  });
  dispatch(resetErrorAction());
};

export default ErrorMsg;
