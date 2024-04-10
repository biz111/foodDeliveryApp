const handleMultipleItems = function () {
    // Get unique items based on id
    const uniqueItems = cartItems.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.id === item.id
        ))
    );

    // Calculate quantity for each unique item
    const uniqueOrders = uniqueItems.map(uniqueItem => {
        const quantity = cartItems.reduce((acc, item) => {
            return item.id === uniqueItem.id ? acc + 1 : acc;
        }, 0);
        return { ...uniqueItem, quantity };
    });
    console.log(uniqueOrders);
    return uniqueOrders;
};


const cartItems = [{
    "id": "m1",
    "name": "Mac & Cheese",
    "price": "8.99",
    "description": "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
    "image": "images/mac-and-cheese.jpg"
},
{
    "id": "m2",
    "name": "Margherita Pizza",
    "price": "12.99",
    "description": "A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.",
    "image": "images/margherita-pizza.jpg"
},
{
    "id": "m1",
    "name": "Mac & Cheese",
    "price": "8.99",
    "description": "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
    "image": "images/mac-and-cheese.jpg"
}];

handleMultipleItems();