import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
const Form = (props) => {
  const { interviewers, onSave, onCancel } = props;

  let [name, setName] = useState(props.name || "");
  let [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset=()=>{
    setInterviewer(null);
    setName('');
  }

  const cancel=()=>{
    reset();
    onCancel();

  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={()=>cancel()} danger>Cancel</Button>
          <Button onClick={()=>onSave(name,interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
