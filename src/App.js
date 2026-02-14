import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    desc: ""
  });

  // Fetch topics
  const fetchTopics = () => {
    axios.get("http://localhost:8080/topics")
      .then(response => {
        setTopics(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id.replace("topic", "").toLowerCase()]: e.target.value
    });
  };

  // Submit form
  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/topics", formData)
      .then(response => {
        fetchTopics();   // refresh topics without reload
        setFormData({ id: "", name: "", desc: "" }); // clear form
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="page-header">Welcome to Course App!</h1>

      <h3>Available Topics</h3>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {
          topics.map(topic => (
            <div key={topic.id} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
              <h5><b>{topic.name}</b></h5>
              <p>{topic.desc}</p>
            </div>
          ))
        }
      </div>

      <br />
      <hr />

      <h3>Register Topic</h3>
      <div style={{ padding: '10px', margin: '20px' }}>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label>ID</label>
            <input
              className="form-control"
              type="text"
              id="topicId"
              value={formData.id}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              id="topicName"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              id="topicDesc"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>

          <br />
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
