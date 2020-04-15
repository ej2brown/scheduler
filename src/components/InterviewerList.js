import React from "react";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
    const { id, name, avatar, selected, setInterview} = props;


    const InterviewerList = id.map((interviewer) => {
        return <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar= {interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterview={(event) => props.setInterview(interviewer.id)}
         />;
        });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
