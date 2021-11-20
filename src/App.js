import axios from "axios";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { v4 as uuidv4 } from "uuid";

import Swal from "sweetalert2";

function App() {
  const YOUR_APP_ID = process.env.REACT_APP_YOUR_APP_ID;
  const YOUR_APP_KEY = process.env.REACT_APP_YOUR_APP_KEY;

  const [recipies, setRecipies] = useState([]);
  const [query, setQuery] = useState("");
  const [healthLabel, setHealthLabel] = useState("vegan");

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;
  // console.log(url);

  const getRecipiesInfo = async () => {
    try {
      const data = await axios.get(url);
      // console.log(data);
      // console.log(data.data.hits);

      setRecipies(data.data.hits);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Algo salió mal en la busqueda!",
      });
      console.log("ERROR NO ESPERADO");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (query === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Ingresa el producto de una receta!",
      });
    }

    if (healthLabel === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Selecciona un filtro valido!",
      });
    }
    getRecipiesInfo();
  };

  // return
  return (
    <div className="App app">
      <div className="container">
        <div className="row mt-4">
          <div className="col">
            <div className="text-center">
              <h1 className="pb-2"> Food Recipe Plaza 🍔 </h1>
            </div>

            <div>
              <form className="app__searchForm" onSubmit={onSubmit}>
                <div className="row g-3 px-5 justify-content-center align-items-center">
                  <div className="col-md-5">
                    <div className="form-floating mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Recipe to search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <label htmlFor="floatingInput"> Recipe to search </label>
                    </div>
                  </div>

                  <div className="col-md-2 text-center">
                    <div className="">
                      <input
                        type="submit"
                        value="Search"
                        className="btn btn-primary btn-lg mb-2 app__input"
                      />
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="form-floating mb-2">
                      <select
                        className="form-select app__recipes"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => setHealthLabel(e.target.value)}
                      >
                        <option value=""> select filter ... </option>
                        <option value="wheat-free">wheat-free</option>
                        <option value="vegetarian">vegetarian</option>
                        <option value="vegan">vegan</option>
                        <option value="tree-nut-free">tree-nut-free</option>
                        <option value="sulfite-free">sulfite-free</option>
                        <option value="sugar-conscious">sugar-conscious</option>
                      </select>
                      <label htmlFor="floatingSelect"> select filter </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* listado */}

            {recipies && (
              <div className="row mt-2">
                {recipies.length > 0 ? (
                  recipies.map(
                    (recipe) =>
                      recipe["recipe"]["image"].match(
                        /\.(jpeg|jpg|gif|png)$/
                      ) != null && (
                        <div className="col-md-4 mb-1 tarjeta" key={uuidv4()}>
                          <div className="card h-100">
                            <div className="card-body">
                              <div
                                className="recipeTile"
                                onClick={() =>
                                  window.open(recipe["recipe"]["url"])
                                }
                              >
                                <img
                                  className="recipeTile__img w-100"
                                  src={recipe["recipe"]["image"]}
                                  alt={recipe["recipe"]["label"]}
                                />
                                <p className="recipeTile__name">
                                  {recipe["recipe"]["label"]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div className="text-center text-danger">
                    <h5> No hay recetas en esta busqueda </h5>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
