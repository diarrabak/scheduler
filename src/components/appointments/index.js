import useVisualMode from "hooks/useVisualMode";
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  //This function is used to save a new or an edited interview in the database
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

  //This function removes an interview from the database
  function destroy() {
    transition(DELETING, true);

    cancelInterview(id)
      .then(() => back())
      .catch((error) => transition(ERROR_DELETE, true));
  }

  // console.log(interview);
  return (
    <article data-testid="appointment" className="appointment">
      <Header time={time} />

      {/* Display the empty view when there no interview */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* how the student and the interviewer when there is an interview ans show mode selected */}
      {mode === SHOW && interview && (
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

      {mode === SAVING && <Status message="Saving" />}

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={destroy}
          message="Are you sure you want to delete?"
        />
      )}

      {mode === DELETING && <Status message="DELETING" />}
      {mode === ERROR_SAVE && <Error message="Error saving" onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message="Error deleting" onClose={() => back()}/>}
    </article>
  );
};

export default Appointment;
