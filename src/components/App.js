import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(questions => setQuestions(questions))
  }, [])

  function onDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => setQuestions(questions.filter((question) => question.id !== id)))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" 
        ? <QuestionForm 
          onSubmit={(newQuestion) => setQuestions([...questions, newQuestion])} 
          /> 
        : <QuestionList questions={questions} onDelete={onDelete} />
      }
    </main>
  );
}

export default App;
