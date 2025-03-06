import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const recipes = [
  { name: "Butter Chicken", time: "45 Minutes", photo: "src/assets/img2.jpg" },
  { name: "Thai Curry", time: "35 Minutes", photo: "src/assets/img3.jpg" },
  {
    name: "Margherita Pizza",
    time: "20 Minutes",
    photo: "src/assets/img4.jpg",
  },
  { name: "Focaccia", time: "40 Minutes", photo: "src/assets/img5.jpg" },
  { name: "Caeser Salad", time: "20 Minutes", photo: "src/assets/img6.jpg" },
  { name: "Brownies", time: "50 Minutes", photo: "src/assets/img7.jpg" },
  { name: "Tomato Soup", time: "15 Minutes", photo: "src/assets/img8.jpg" },
  { name: "Hummus", time: "45 Minutes", photo: "src/assets/img9.jpg" },
  { name: "Fish Fingers", time: "30 Minutes", photo: "src/assets/img10.jpg" },
  { name: "Avocado Tacos", time: "45 Minutes", photo: "src/assets/img11.jpg" },
];

let likedRecipes = [];

localStorage.setItem("likedRecipes", likedRecipes);

function App() {
  return (
    <div className="container">
      <Hero />
      <RecipeList />
      <Footer />
    </div>
  );
}

function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${"/src/assets/hero-img.jpg"})` }}
    >
      <div className={`header ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav-bar">
          <h1 className="nav-bar-logo">QuickBytes</h1>
          <ul>
            <li>Liked Recipes</li>
            <li>Filters</li>
          </ul>
        </nav>
      </div>
      <h1 className="hero-text">
        Delicious Recipes
        <br />
        All at your Fingertips!
      </h1>
    </div>
  );
}

function RecipeList() {
  function handleClick(recipeObj) {
    console.log(recipeObj);
  }

  return (
    <>
      <h2 className="recipes-heading">RECIPES</h2>
      <ul className="recipes">
        {recipes.map((recipeObj) => (
          <Recipe
            recipeObj={recipeObj}
            key={recipeObj.name}
            onClick={() => handleClick(recipeObj)}
          />
        ))}
      </ul>
    </>
  );
}

function Recipe({ recipeObj, onClick }) {
  const [like, setLike] = useState(false);

  let likeBtn = like ? "heart" : "heart-outline";

  function filteringLikes(el) {
    if (el.name !== recipeObj.name) {
      return el;
    }
  }

  function handleLike() {
    if (likedRecipes.includes(recipeObj)) {
      likedRecipes = likedRecipes.filter(filteringLikes);
    } else {
      likedRecipes.push(recipeObj);
    }
    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
    console.log(JSON.parse(localStorage.getItem("likedRecipes")));
    setLike(!like);
  }

  return (
    <li className="recipe" onClick={() => onClick(recipeObj)}>
      <div className="recipe-img-container">
        <img className="recipe-img" src={recipeObj.photo} alt="recipeimg" />
      </div>
      <div className="recipe-preview-text">
        <h3>{recipeObj.time}</h3>
        <h2>{recipeObj.name}</h2>
      </div>
      <ion-icon
        className="btn--like"
        onClick={handleLike}
        name={likeBtn}
      ></ion-icon>
    </li>
  );
}

function Footer() {
  return (
    <div className="footer">
      <h3>Follow Us</h3>
      <ul>
        <li>
          <ion-icon name="logo-instagram"></ion-icon>
        </li>
        <li>
          <ion-icon name="logo-youtube"></ion-icon>
        </li>
        <li>
          <ion-icon name="logo-pinterest"></ion-icon>
        </li>
        <li>
          <ion-icon name="logo-facebook"></ion-icon>
        </li>
        <li>
          <ion-icon name="logo-twitter"></ion-icon>
        </li>
      </ul>
      <h3>Made With &hearts;</h3>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
