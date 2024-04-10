import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';

function Modal({ open, children, b1, b2, close, form, type, onSubmit, utility }) {
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
                <section className='modal-actions'>
                    <button onClick={close} className='text-button'>{b1}</button>
                    <button onClick={utility} className='button' form={form} type={type} onSubmit={onSubmit}>{b2}</button>
                </section>
            </dialog></div>, document.getElementById('modal')

    )
}

export default Modal;