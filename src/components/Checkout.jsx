import { useCallback, useState } from 'react';
import { sendOrderData } from "../http.js";
import Modal from './Modal.jsx';
import Error from './Error.jsx';

const Checkout = function ({ total, orders, closeModal, checkoutClick, resetEverything }) {
    const [successful, setSuccessful] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(fdata) {

        console.log("HANDLE SUBMITTED", fdata);

        const fd = new FormData(fdata);
        const data = Object.fromEntries(fd.entries());
        const submitFormToBackend = [{
            order: {
                items: orders,
                customer: {
                    name: data.name,
                    email: data.email,
                    street: data.street,
                    city: data.city
                },
                total: total
            }

        }];
        const response = await sendOrderData(submitFormToBackend);
        if (response === 'Order created!') {
            setSuccessful(true);
            setError(true);
        }

    }

    function submitForm() {
        const formElement = document.getElementById('newTrick');
        handleFormSubmit(formElement);
    }


    function handleErrorClose() {
        setError(false);
        resetEverything();
    }


    return (
        <>
            <Modal open={checkoutClick} b1="Close" b2="Submit" close={closeModal} type="submit" utility={submitForm}>
                <div className="control">
                    <h2>Checkout</h2>
                    <p>Total : {total}</p>
                    <form className="control" onSubmit={handleFormSubmit} id="newTrick">
                        <label>Full Name :</label>
                        <input name='name'></input>
                        <br></br>
                        <label>E-Mail Address: </label>
                        <input name='email' type='email'></input>
                        <br></br>
                        <label>Street</label>
                        <input name='street'></input>
                        <br></br>
                        <section className="control-row">
                            <div>
                                <label>Postal Code</label>
                                <input name='zipCode'></input>

                            </div>
                            <div>
                                <label>City</label>
                                <input name='city'></input>
                            </div>
                        </section>
                    </form>
                </div>
            </Modal>
            {successful && <Error message={"Hold Tight! Your order has been placed."} open={error} close={handleErrorClose}></Error>}
        </>
    )
};


export default Checkout;