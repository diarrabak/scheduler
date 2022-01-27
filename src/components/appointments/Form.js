import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  const { interviewers, interview, onSave, onCancel } = props;

  let [name, setName] = useState(interview ? interview.student : "");  //Name of the current student
  let [interviewer, setInterviewer] = useState(interview?interview.interviewer.id : null); //id of the current interviewer
  const [error, setError] = useState("");

  function validate() {
    if (name === "") {  //Use props.name for the testing
      setError("Student name cannot be blank");
      return;
    }
  
    onSave(name, interviewer); //Use props.name for the testing
  }
  

  const reset = () => {
    setInterviewer(null);
    setName("");
  };

  const cancel = () => {
    reset();
    onCancel();

  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>

        </form>
        <InterviewerList
          interviewers={interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
