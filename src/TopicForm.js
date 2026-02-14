import React, { useState } from "react";

function TopicForm({ onTopicAdded }) {
  const [topic, setTopic] = useState({
    id: "",
    name: "",
    desc: "",
  });

  const handleChange = (e) => {
    setTopic({
      ...topic,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });

    setTopic({ id: "", name: "", desc: "" });
    onTopicAdded(); // refresh list
  };

  return (
    <div style={styles.container}>
      <h2>Add New Topic</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={topic.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={topic.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={topic.desc}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Topic</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "30px",
  },
};

export default TopicForm;
