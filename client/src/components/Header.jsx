
import logoImage from '../assets/logo.jpg';

export default function Header({ counter, clickCart }) {

    return (
        <main id="main-header">
            <header id="title">
                <img src={logoImage}></img>
                <h1>REACT FOOD</h1>
            </header>
            <button onClick={clickCart}>Cart ({counter})</button>
        </main>
    )
}