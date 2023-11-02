import { toast } from 'react-toastify';

export const successToast = (text) => {
    toast.success(text, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: 'dark',
    });
};

export const errorToast = (text) => {
    toast.error(text, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: 'dark',
    });
};