import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";
const Appointment = (props) => {
  const { time, interview, onEdit, onDelete, onAdd } = props;

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
