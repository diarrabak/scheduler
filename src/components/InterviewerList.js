import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import { useState } from "react";
const InterviewerList = (props) => {
  const { interviewers, interviewer, setInterviewer } = props;

 // let [interviewer, setInterviewer]=useState(1);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((currentInterviewer, key) => (
          <InterviewerListItem
            name={currentInterviewer.name}
            avatar={currentInterviewer.avatar}
            setInterviewer={setInterviewer}
            selected={currentInterviewer.id===interviewer}
            key={currentInterviewer.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList;
