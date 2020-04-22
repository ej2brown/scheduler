import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";

const InterviewerList = (props) => {
    const { onChange, interviewers, value } = props;
    const Interviewers = interviewers.map((interviewer) => {
        return (
            <InterviewerListItem
                key={interviewer.id}
                name={interviewer.name}
                avatar={interviewer.avatar}
                selected={interviewer.id === value}
                setInterview={() => onChange(interviewer.id)}
            />
        );
    });
    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{Interviewers}</ul>
        </section>
    );
};

InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

export default InterviewerList;
