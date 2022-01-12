import useVisualMode from "hooks/useVisualMode";
import React from "react";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

const Appointment = (props) => {
  const {
    time,
    interview,
    onEdit,
    interviewers,
    bookInterview,
    cancelInterview,
    message,
  } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(3, interview).then(() => transition(SHOW));
  }

  function remove(){
    transition(CONFIRM);
    cancelInterview(3);
  }
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={onEdit}
          onDelete={remove}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}

      {mode === SAVING && <Status message={message} />}

      {mode === CONFIRM && <Confirm  onCancel={() => transition(SHOW)} onConfirm={() => transition(DELETING)}  message="Are you sure"/>}

      {mode === DELETING && <Status  message="DELETING"/>}

    </article>
  );
};

export default Appointment;
