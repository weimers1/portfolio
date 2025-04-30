function Modal({ message, onDismiss, isVisible }) {
    return (
        <div
            className={`fixed top-0 z-2 w-full h-full bg-slate-900/35 ${
                isVisible ? '' : 'hidden'
            }`}
        >
            <div className="fixed left-1/2 -translate-x-1/2 bottom-1/2 z-3 w-80 lg:w-210 h-45 lg:h-30 bg-white rounded-lg p-3">
                <div className="text-center mt-8 text-black">{message}</div>
                <div className="fixed right-5 bottom-5">
                    <button
                        type="button"
                        className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-lg hover:cursor-pointer hover:"
                        onClick={onDismiss}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
