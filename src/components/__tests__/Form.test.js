import React from "react";

import { render, cleanup } from "@testing-library/react";
import Form from "components/appointments/Form";

import { fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  // const { getByTestId } = render(
  //   <Form interviewers={interviewers} name="Lydia Miller-Jones" />
  // );
  // it("renders with initial student name", () => {
  //   expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  // });

  //This test doesnt work with the next one
  it("validates that the student name is not blank", () => {

    //Creation of a mock function called onSave
    const onSave = jest.fn();

    //Rendering the form component with its props
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

   //Click on the Save button
    fireEvent.click(getByText("Save"));

    //Since the name is empty, we should see the error message

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    //The onSave function has not been called because of the validation error
    expect(onSave).not.toHaveBeenCalled();
  });

//This test doesnt not work with the preious one //Use props.name instead of name in the validate function Form component for this test
  xit("calls onSave function when the name is defined", () => {

    //Creation of a mock function called onSave
    const onSave = jest.fn();
    
    //Rendering the form component with its props
    const { getByText,queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} name="Lydia Miller-Jones"/>
    );

     //Click on the Save button
     fireEvent.click(getByText("Save"));

   
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

     //The onSave function has been called once
    expect(onSave).toHaveBeenCalledTimes(1);

    // onSave is called with the correct arguments 
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  

  xit("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  xit("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  

});
