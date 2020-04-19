import React from "react";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
    const { id, name, avatar, setInterview, selected } = props;

    const interviewerClass = `interviewers__item ${
        selected ? "interviewers__item--selected" : ""
    }`;

    return (
        <li
            className={interviewerClass}
            selected={selected}
            onClick={setInterview}
        >
            <img className="interviewers__item-image" src={avatar} alt={name} />
            {selected && name}
        </li>
    );
}
