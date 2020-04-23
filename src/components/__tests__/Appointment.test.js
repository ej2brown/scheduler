import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment";

afterEach(cleanup);

/*  A test that renders a React Component */
describe("Appointment", () => {
    it("renders without crashing", () => {
        render(<Appointment />);
    });
});
