function Modal({ message, onDismiss, isVisible }) {
    return (
        <div
            className={`relative z-10 w-300 h-100 bg-white text-black ${
                isVisible ? '' : 'hidden'
            }`}
        >
            {message}
        </div>
    );
}

export default Modal;
