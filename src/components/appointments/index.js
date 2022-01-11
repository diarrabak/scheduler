import useVisualMode from "hooks/useVisualMode";
import React from "react";
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = (props) => {
  const { time, interview, onEdit, onDelete, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  // console.log(interviewers);
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={()=>back(EMPTY)} />}
    </article>
  );
};

export default Appointment;
