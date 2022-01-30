import React from "react";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

//List of all the interviewer from the database
import InterviewerListItem from "./InterviewerListItem";
const InterviewerList = (props) => {
  const { interviewers, interviewer, setInterviewer } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((currentInterviewer, key) => (
          <InterviewerListItem
            name={currentInterviewer.name}
            avatar={currentInterviewer.avatar}
            setInterviewer={() => setInterviewer(currentInterviewer.id)}
            selected={currentInterviewer.id === interviewer}
            key={currentInterviewer.id}
          />
        ))}
      </ul>
    </section>
  );
};



InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


export default InterviewerList;
