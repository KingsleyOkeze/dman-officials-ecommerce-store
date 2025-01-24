import { useContext } from "react";
import "../styles/components-styles/Alert.css";
import { AlertContext } from "../contexts/AlertContext";
import { LiaTimesSolid } from "react-icons/lia";

function Alert() {
    const { customAlert, setCustomAlert } = useContext(AlertContext);

    // Don't render anything if there's no message
    if (!customAlert.message) return null;

    return (
        <div
            className="alert-container"
            role="alert"
            aria-live="assertive"
            style={{
                background: customAlert.type === "success" ? "#008C00" : "#B80000",
            }}
        >
            <p>{customAlert.message}</p>
            <LiaTimesSolid 
                onClick={() => {
                    setCustomAlert({ type: null, message: null })
                }}
                className="alert-close-icon"
            />
        </div>
    );
}

export default Alert;
