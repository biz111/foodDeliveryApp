import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';

function Error({ open, children, close, message }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        }
        else {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <div>
            <dialog className='modal' ref={dialog} >{open ? children : null}
                <div className='control'><h3>{message}</h3></div>
                <section className='modal-actions'>
                    <button onClick={close} className='button'>Close</button>
                </section>
            </dialog></div>, document.getElementById('modal')

    )
}

export default Error;