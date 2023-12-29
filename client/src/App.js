import React, { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import { createTodo, readTodos, updateTodo, deleteTodo } from "./functions";
import './App.css'

function App() {
  const [todo, setTodo] = useState({ title: "", content: "", contentType: "" });
  const [todos, setTodos] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [contentType, setContentType] = useState('');
  // const [showImageViewer, setShowImageViewer] = useState(false);
  // const [selectedImageUrl, setSelectedImageUrl] = useState('');

  useEffect(() => {
    let currentTodo =
      currentId !== 0
        ? todos.find((todo) => todo._id === currentId)
        : { title: "", content: "", contentType: "" };
    setTodo(currentTodo);
  }, [currentId, todos]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
    };
    fetchData();
  }, [currentId]);

  const clear = () => {
    setCurrentId(0);
    setTodo({ title: "", content: "", contentType: ""});
    setContentType('');
  };

  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearField);
    return () => window.removeEventListener("keydown", clearField);
  }, []);

  const onSubmitHandler = async (e) => {
    
    e.preventDefault();

    if (!todo.title || !todo.content || !todo.contentType) {
      alert('Title,Content and contentType are required.');
      return;
    }
    if (currentId === 0) {
      const result = await createTodo(todo);
      console.log("result", result);
      setTodos((prevTodos) => [result, ...(prevTodos || [])]);
      clear();
    } else {
      await updateTodo(currentId, { ...todo });  // change to todo
      const index = todos.findIndex((t) => t._id === currentId);

      // Update the todo at that index with the edited todo
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        updatedTodos[index] = { ...todo, _id: currentId }; // Update the edited todo
        return updatedTodos;
      });
       clear();
    }
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    const todosCopy = [...todos];
    const filteredTodos = todosCopy.filter((todo) => todo._id !== id);
    setTodos(filteredTodos);
    clear();
  };

  // const editTodo = (id) => {
  //   setCurrentId(id);
  // };

  const editTodo = (id) => {
    const currentTodo = todos.find((todo) => todo._id === id);
    setCurrentId(id);
    setTodo({
      ...currentTodo,
      contentType: currentTodo.contentType || '',
    });
    setContentType('')
  };
  

  const handleContentTypeChange = (event) => {
    // setTodo({ ...todo, contentType: event.target.value });
    setTodo((prevTodo) => ({
      ...prevTodo,
      contentType: event.target.value,
    }));
  };
  
  const handleContentTypeChangeForEdit = (event) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      contentType: event.target.value,
    }));
  };

  // const ImageViewer = ({ imageUrl, onClose }) => {
  //   return (
  //     <div className="image-viewer">
  //       <div className="image-container">
  //         <img src={imageUrl} alt="Preview" />
  //       </div>
  //       <button onClick={onClose}>Close</button>
  //     </div>
  //   );
  // };

  // const openImageViewer = (imageUrl) => {
  //   setSelectedImageUrl(imageUrl);
  //   setShowImageViewer(true);
  // };

  // const closeImageViewer = () => {
  //   setShowImageViewer(false);
  //   setSelectedImageUrl('');
  // };
  

  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <h1 className="heading">Todo Application</h1>
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input
                id="description"
                type="text"
                className="validate"
                value={todo.content}
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          {/* <div className="select-container"> */}
            {/* <div className="input-field col s12"> */}

            <label htmlFor="select">Content Type</label>
           
            <div className="input-field col s12">
            
            <select onChange={currentId === 0 ? handleContentTypeChange : handleContentTypeChangeForEdit} value={todo.contentType || ''} >
                  <option value="" disabled >select content type</option>
                  <option value="Text">Text</option>
                  <option value="Url">Url</option>
                  <option value="Image">Image</option>
                </select>
              
            </div>
            {/* <div className="input-field col s12">
              <select className="select" onChange={handleContentTypeChange}>

                <option value="1">Text</option>
                <option value="2">Url</option>
                <option value="3">Image</option>
              </select>

            </div> */}
            {/* <select className="select" id="select" name="select">
              
              <option value="1" >Text</option>
              <option value="2" >Image</option>
              <option value="3">Url</option>
            </select> */}
          {/* </div> */}
          {/* </div> */}
          <div className="row right-align">
            <button className="waves-effect waves-light btn" type="submit">
              {currentId === 0 ? "Add Todo" : "Save Edit"}
            </button>
          </div>
        </form>

        {!todos ? (
          <Preloader />
        ) : todos.length > 0 ? (
          <ul className="collection">
            {todos.map((todo) => (
              <li key={todo._id} className="collection-item">
                <div>
                  {todo?.title && <h5>{todo.title}</h5>}
                  {todo?.content && <p>{todo.content}</p>}
                  {/* {todo?.contentType === "image" && (
                    <img

                    />
                  )} */}
                 {todo?.contentType=== "Text" && <p style={{fontWeight:"bold", color: "#4ccdd9"}}>Content Type: {todo.contentType}</p>}
                 {todo?.contentType === 'Image' && (
                   <a href={todo.content} target="_blank" rel="noopener noreferrer" style={{fontWeight:"bold"}}>
                   Image Url
                 </a>
                  )}
                  {todo?.contentType === 'Url' && (
                   <a href={todo.content} target="_blank" rel="noopener noreferrer" style={{fontWeight:"bold"}}>
                   Website Url
                 </a>
                  )}
                  <div>
                    <button
                      className="waves-effect waves-light btn"
                      onClick={() => editTodo(todo._id)}
                    >
                     <i className="material-icons">create</i>
                    </button>
                    <a
                      href="#!"
                      onClick={() => removeTodo(todo._id)}
                      className="secondary-content"
                    >
                      <i className="material-icons">delete</i>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h5>Nothing to do</h5>
          </div>
        )}
      </div>
      {/* {showImageViewer && (
        <ImageViewer imageUrl={selectedImageUrl} onClose={closeImageViewer} />
      )} */}
    </div>
  );
}

export default App;