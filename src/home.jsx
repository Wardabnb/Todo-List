import { CirclePlus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import DateObject from "react-date-object";
import { Link } from "react-router-dom";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ name: "", description: "" });

  useEffect(() => {
    // Récupérer les todos depuis localStorage
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Fonction pour supprimer une tâche
  function deleteTodo(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  // Fonction pour démarrer l'édition d'une tâche
  function startEditing(index) {
    setEditingTodoIndex(index);
    setUpdatedTask(todos[index]); // Pré-remplir le formulaire avec les détails de la tâche
  }

  // Fonction pour gérer les modifications dans le formulaire
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  // Fonction pour enregistrer les modifications
  function saveUpdatedTask() {
    const updatedTodos = [...todos];
    updatedTodos[editingTodoIndex] = updatedTask;
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Mettre à jour localStorage
    setEditingTodoIndex(null); // Sortir du mode édition
  }

  var date = new DateObject();
  return (
    <>
      <div className="flex justify-center gap-80 mt-5 ">
        <h1 className="text-4xl font-extrabold text-purple-700">Hello!!</h1>
        <div className="mt-10 font-bold text-xl text-gray-600">
          {date.format()}
        </div>
        <Link to="/add">
          <CirclePlus className="w-14 h-14 text-purple-600" />
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center mt-24 p-5 px-28 mx-60 rounded-lg gap-5 bg-slate-500">
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div
              key={index}
              className="flex flex-col justify-between px-10 items-center p-5 w-full rounded-lg "
            >
              {editingTodoIndex === index ? (
                // Formulaire de modification
                <div className="w-full">
                  <input
                    type="text"
                    name="name"
                    value={updatedTask.name}
                    onChange={handleInputChange}
                    className="border border-gray-500 w-full p-2 rounded-md mb-4"
                  />
                  <textarea
                    name="description"
                    value={updatedTask.description}
                    onChange={handleInputChange}
                    className="border border-gray-500 w-full p-2 rounded-md mb-4"
                    rows="4"
                  />
                  <button
                    onClick={saveUpdatedTask}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                // Affichage normal de la tâche
                <div className="w-full ">
                  <h1
                    className="font-bold text-xl text-purple-800 cursor-pointer "
                    onClick={() => startEditing(index)}
                  >
                    {todo.name}
                  </h1>
                  <p
                    className="text-gray-600 text-justify cursor-pointer"
                    onClick={() => startEditing(index)}
                  >
                    {todo.description}
                  </p>
                </div>
              )}
              <Trash2
                className="text-red-700 p-5 w-16 h-16 cursor-pointer"
                onClick={() => deleteTodo(index)}
              />
            </div>
          ))
        ) : (
          <p className="text-center mt-5  text-2xl">No todos yet!</p>
        )}
      </div>
    </>
  );
}
