import { Undo2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateObject from "react-date-object";
import { Link } from "react-router-dom";

export default function Formulaire() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Hook pour rediriger

  function addTodo(event) {
    event.preventDefault();

    if (name.trim() !== "" && description.trim() !== "") {
      const newTodo = {
        name: name,
        description: description,
      };

      // Récupérer les todos depuis localStorage
      const todos = JSON.parse(localStorage.getItem("todos")) || [];

      // Ajouter la nouvelle tâche
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

      // Réinitialiser les champs
      setName("");
      setDescription("");

      // Redirection vers la page des tâches
      navigate("/");
    }
  }

  var date = new DateObject();
  return (
    <>
      <div className="flex justify-center gap-80 mt-5">
        <h1 className="text-4xl font-extrabold text-purple-700">Hello!!</h1>
        <div className="mt-10 font-bold text-xl text-gray-600">
          {date.format()}
        </div>
        <Link to="/" className="text-lg text-purple-600 font-bold flex">
          List <Undo2 />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center mt-20 mx-96 rounded-xl">
        <form
          onSubmit={addTodo} // Utilise onSubmit pour soumettre le formulaire
          className="flex flex-col justify-around items-center gap-14 m-20"
        >
          <div className="group">
            <input
              required
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="label font-bold">Name:</label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-bold mb-4">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              className="border border-gray-600"
              rows={5}
              cols={40}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-7 text-white font-bold py-2 rounded-xl"
          >
            ADD
          </button>
        </form>
      </div>
    </>
  );
}
