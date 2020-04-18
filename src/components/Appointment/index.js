import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, onAdd } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    debugger
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
    console.log('id, interview',props.id, interview)
  }
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />} 
    </article>
  );
}
