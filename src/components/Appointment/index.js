import React from "react";

import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Application(props) {
  const { time, interview } = props;
  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {interview ? (
          <Show
            student={interview.student}
            interviewer={interview.interviewer.name}
          />
        ) : (
          <Empty />
        )}
      </article>
    </>
  );
}
