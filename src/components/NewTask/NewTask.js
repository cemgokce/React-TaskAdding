import React from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: SendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name;
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };
  
  const enterTaskHandler = async (taskText) => {
    SendTaskRequest(
      {
        url: "https://custom-hooks-5f85f-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: JSON.stringify({ text: taskText }),
        headers: { "Content-Type": "application/json" },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
