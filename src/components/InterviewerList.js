import React from "react";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
    const { id, name, avatar, selected, onChange, interviewers} = props;


    const InterviewerList = interviewers.map((interviewer) => {
        return <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar= {interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterview={(event) => onChange(interviewer.id)}
         />;
        });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerList}
      </ul>
    </section>
  );
}
