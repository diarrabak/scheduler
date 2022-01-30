import "./InterviewerListItem.scss";
import React from "react";
import classnames from "classnames";

//Display of a single interviewer on the screen

const InterviewerListItem = (props) => {
  const {name,avatar, selected, setInterviewer}=props;

  var interClass=classnames("interviewers__item",{
    "interviewers__item--selected":selected
  })

  return (
    <li onClick={setInterviewer} className={interClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
    {selected &&  name}
    </li>
  );
};


export default InterviewerListItem;