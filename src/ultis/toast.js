import {toast} from "react-toastify";

const options = {
   position: "bottom-center",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
};

export function Toast(content, type){
   switch(type){
      case 'info': toast.info(content, options); break;
      case 'success': toast.success(content, options); break;
      case 'error': toast.error(content, options); break;
      default: toast.dark(content, options); break;
   }
}