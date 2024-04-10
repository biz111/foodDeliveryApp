import { useEffect, useState } from "react";

export default function FoodItems({ onSelectItem }) {
    const [availableMeals, setAvailableMeals] = useState([]);
    const [fetching, isFetching] = useState(false);

    useEffect(() => {
        isFetching(true);
        fetch('http://localhost:3000/meals')
            .then((response) => {
                return response.json();
            })
            .then((resData) => {
                setAvailableMeals(resData);
                isFetching(false);
            })
    }, []);

    return (
        <section>
            <div className="meal-item">
                {!fetching && (<ul id="meals">{availableMeals.map((meal) => (<li key={meal.id} className="meal-item">
                    <img src={`http://localhost:3000/${meal.image}`}></img><h3>{meal.name}</h3>
                    <p className="meal-item-price">{meal.price}</p>
                    <p className="meal-item-description">{meal.description}</p>
                    <button className="button" onClick={() => onSelectItem(meal)}>Add to Cart</button>
                    <p></p>
                </li>))}
                </ul>)}
            </div>
        </section>
    )
}