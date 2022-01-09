import useVisualMode from "hooks/useVisualMode";
import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

const Appointment = (props) => {
  const { time, interview, onEdit, onDelete, onAdd } = props;
  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <Empty onAdd={onAdd} />
      )}
    </article>
  );
};

export default Appointment;
