import useVisualMode from "hooks/useVisualMode";
import React from "react";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import Error from "./Error";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

const Appointment = (props) => {
  const {
    time,
    interview,
    interviewers,
    bookInterview,
    cancelInterview,
    message,
    id,
  } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview_ = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview_)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => back(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  // console.log(interview);
  return (
    <article className="appointment">
      <Header time={time} />

      {/* Display the empty view when there no interview */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* how the student and the interviewer when there is an interview ans show mode selected */}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(CREATE)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {/* Creation of a new interview when create mode is selected */}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          interview={interview}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {/* When edit mode is selected, display current interview information */}
      {mode === EDIT && (
        <Form
          interview={interview}
          name={interview.student}
          interviewer={interview.interviewer.name}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === SAVING && <Status message={message} />}

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={destroy}
          message="Are you sure"
        />
      )}

      {mode === DELETING && <Status message="DELETING" />}
      {mode === ERROR_SAVE && <Error message="Error saving" />}
      {mode === ERROR_DELETE && <Error message="Error deleting" />}
    </article>
  );
};

export default Appointment;
