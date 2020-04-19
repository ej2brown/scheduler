/* displays form to add/edit interview info */
/* Form component*/
/* builds InterviewerList */
/* builds Buttons */

import React, { useState } from "react";
import Button from "../Button.js";
import InterviewerList from "../InterviewerList.js";

export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const { interviewers, onSave, onCancel } = props;

    const reset = () => {
        setName("");
        return setInterviewer(null);
    };

    const cancel = () => {
        reset();
        return onCancel();
    };

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form
                    autoComplete="off"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </form>
                <InterviewerList
                    interviewers={interviewers}
                    value={interviewer}
                    onChange={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button onClick={cancel} danger>
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            name && interviewer && onSave(name, interviewer)
                        }
                        confirm
                    >
                        Save
                    </Button>
                </section>
            </section>
        </main>
    );
}
