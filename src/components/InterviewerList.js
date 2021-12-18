import React , { useState } from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
const InterviewerList = (props) => {
  const { interviewers } = props;

 let [interviewer, setInterviewer]=useState(1);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((currentInterviewer, key) => (
          <InterviewerListItem
            name={currentInterviewer.name}
            avatar={currentInterviewer.avatar}
            setInterviewer={()=>setInterviewer(currentInterviewer.id)}
            selected={currentInterviewer.id===interviewer}
            key={currentInterviewer.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList;
