import Toast from "react-native-toast-message";


interface ToastProps {
    title: string;
    message: string;
    type?: string;
}

function showToast({ title, message, type = "success" }: ToastProps) {
    Toast.show({
        type: type,
        text1: title,
        text2: message,
    });
}



export default showToast;