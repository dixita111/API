import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [fname, setFname] = useState("");
  const [resData, setResponseData] = useState([]);

  useEffect(() => {
    console.log("hello");
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data);
        setResponseData(res.data);
      })
      .catch((e) => console.log(e));
  }, [fname]);

  const handleSubmit = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { firstName: fname })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleDelete = (idx) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${idx}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleEdit = (idx) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${idx}`, {
        firstName: "Updated",
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <input
        type="text"
        name="fname"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
      />
      <button onClick={() => handleSubmit()}>Submit</button>
      <table>
        <thead>
          <th>id</th>
          <th>Body</th>
          <th>Title</th>
          <th>userId</th>
        </thead>
        <tbody>
          {resData?.map((item, index) => {
            return (
              <tr>
                <td>{item?.id}</td>
                <td>{item?.body}</td>
                <td>{item?.title}</td>
                <td>{item?.userId}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
