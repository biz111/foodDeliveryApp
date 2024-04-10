export default function Cart({ orders, addItem, removeItem, total }) {

    return (
        <div className='cart'>
            <h2>Your Cart</h2>
            <ul>
                {orders.map((item) => (<li key={item.id} className='cart-item'>{`${item.name} - ${item.quantity} x ${item.price}`}
                    <div className='cart-item-actions'>
                        <button onClick={() => removeItem(item.id)}>-</button>
                        <p>{item.quantity}</p>
                        <button onClick={() => addItem(item.id)}>+</button>
                    </div>
                </li>))}
                <p className='cart-total'>TOTAL : {total.toFixed(2)}</p>
            </ul>
        </div>
    )
}