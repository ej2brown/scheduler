/* handles queries and mode change display */
/* Appointment component*/
/* builds /appointment */

import React from "react";
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
    const { id, time, interview, interviewers } = props;
    /* visual mode used to change display of card */
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";

    const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

    /* sends to Application component for a PUT request */
    function saveAppointment(name, interviewer) {
        const interview = {
            student: name,
            interviewer,
        };
        transition(SAVING);

        props
            .bookInterview(id, interview)
            .then(() => transition(SHOW))
            .catch(() => transition(ERROR_SAVE, true));
    }

    /* sends to Application component for a DELETE request */
    function deleteAppointment() {
        transition(DELETING, true);
        props
            .cancelInterview(id)
            .then(() => transition(EMPTY))
            .catch(() => transition(ERROR_DELETE, true));
    }
    return (
        <article className="appointment" data-testid="appointment">
            <Header time={time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    id={id}
                    student={interview.student}
                    interviewer={interview.interviewer}
                    onDelete={() => transition(CONFIRM)}
                    onEdit={() => transition(EDIT)}
                />
            )}
            {mode === CREATE && (
                <Form
                    interviewers={interviewers}
                    onCancel={() => back()}
                    onSave={saveAppointment}
                />
            )}
            {mode === SAVING && <Status message="Saving" />}
            {mode === DELETING && <Status message="Deleting" />}
            {mode === CONFIRM && (
                <Confirm
                    onConfirm={deleteAppointment}
                    onCancel={() => back()}
                    message="Are you sure you would like to delete?"
                />
            )}
            {mode === EDIT && (
                <Form
                    id={id}
                    name={interview.student}
                    value={interview.student}
                    interviewer={
                        interview.interviewer ? interview.interviewer.id : ""
                    }
                    interviewers={interviewers}
                    onCancel={() => back()}
                    onSave={saveAppointment}
                />
            )}
            {mode === ERROR_SAVE && (
                <Error
                    message="Error: Could not book appointment."
                    onClose={() => back()}
                />
            )}
            {mode === ERROR_DELETE && (
                <Error
                    message="Error: Could not cancel appointment."
                    onClose={() => transition(SHOW, true)}
                />
            )}
        </article>
    );
}
