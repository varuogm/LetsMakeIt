import React,{useEffect , useState} from 'react';
import Recipe from './Recipe';
import "./App.css";
import Loading from './Loading';



const App= () => {
  const APP_ID =  process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_RECIPE_KEY;

  const [isLoading ,setIsLoading]  = useState(true);

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState('chicken');
  const [darkMode, setDarkMode] = useState(false);

  
useEffect(()=>{
  setTimeout(()=>{
  setIsLoading(false);
  }, 2500);
});


useEffect( ()=> {
  getRecipes();
}, [query] );

const getRecipes = async()=>{

  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}` );
  const data   = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
}
 const updateSearch= e=>{
   setSearch(e.target.value);
   //console.log(search);
 }

 const getSearch= e=>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return ( 
     <div>
      { isLoading === true ? <Loading/>:

    <div className="App">
      <div className={darkMode ? "dark-mode" : "light-mode"} >
      <div className="container">
        <span style={{ color: darkMode ? "grey" : "yellow" }}> 🔮 </span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"> </span>
          </label>
        </div>
        <span style={{ color: darkMode ? "#c96dfd" : "grey" }}> ✨ </span>
      </div>
      </div>
      <h1 className="hungry">Feeling  hungry , Try  searching  your FAV dish</h1>
       <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" placeholder="Search your fav dish here 😋" value ={search} onChange ={updateSearch}/>
          <button  className="search-button" typeof="submit">
            Search
          </button>
       </form>

       <div className="recipes">
       {
        recipes.map(recipe =>(
        <Recipe
         key={recipe.recipe.label}
         title ={recipe.recipe.label}
         calories={recipe.recipe.calories}

         image={recipe.recipe.image}
         type={recipe.recipe.dishType}

         ingredients={recipe.recipe.ingredients}
         />
       ))}
      
       </div>
       <a href="#"  className ="topper" onclick="document.body.scrollTop=0;document.documentElement.scrollTop=0;event.preventDefault()">  Back  to  Top  </a>
    </div>}
    </div>
  );
};

export default App;
