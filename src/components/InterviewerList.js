import React from "react";

import "components/InterviewerListItem.scss";
import InterviewerListItem from "components/InterviewerListItem.js";

export default function InterviewerList(props) {
  const { id, name, avatar, selected, onChange, interviewers } = props;

  const Interviewers = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterview={(event) => onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>
  );
}
