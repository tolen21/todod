import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

const itemsData = [
  {
    key: uuid(),
    label: "Үй жұмысын орындау",
  },
  {
    key: uuid(),
    label: "Серуенге шығу",
  },
  {
    key: uuid(),
    label: "Достарыма хаабарлама жазу",
  },
];

function App() {
  const [itemToDo, setItemTodo] = useState("");
  const [items, setItems] = useState(itemsData);
  const [type, setType] = useState("all");

  const handleItemToDo = (event) => {
    setItemTodo(event.target.value);
  };

  const handleAddItem = () => {
    const newObj = { key: uuid(), label: itemToDo };

    setItems([newObj, ...items]);
  };

  const handleItemDone = (key) => {
    const newArray = items.map((item) => {
      if (item.key === key) {
        return { ...item, isDone: !item.isDone };
      } else return item;
    });

    setItems(newArray);
  };

  const handleChangeStatus = (type) => {
    setType(type);
  };

  const doneItems = items.filter((item) => item.isDone);
  const notDoneItems = items.filter((item) => !item.isDone);

  const filteredItems =
    type === "active" ? notDoneItems : type === "done" ? doneItems : items;

  return (
    <div className="todo-app">
   
      <div className="app-header d-flex">
        <h1>Жасау керек жумыстар</h1>
        <h2>
          {notDoneItems.length} орындалуы керек, {doneItems.length} орындалды
        </h2>
      </div>

      <div className="top-panel d-flex">
      
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
        />
        <div className="btn-group">
          {buttons.map((itemB) => (
            <button
              key={itemB.type}
              type="button"
              className={`btn btn${type === itemB.type ? "" : "-outline"}-info`}
              onClick={() => handleChangeStatus(itemB.type)}
            >
              {itemB.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="list-group todo-list">
        {filteredItems.map((item) => (
          <li
            key={item.key}
            className="list-group-item"
            onClick={() => handleItemDone(item.key)}
          >
            <span className={`todo-list-item ${item.isDone ? "done" : ""}`}>
              <span className="todo-list-item-label">{item.label}</span>

              <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
              >
                <i className="fa fa-exclamation" />
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
              >
                <i className="fa fa-trash-o" />
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="item-add-form d-flex">
        <input
          value={itemToDo}
          onChange={handleItemToDo}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>
          Add item
        </button>
      </div>
    </div>
  );
}

export default App;
