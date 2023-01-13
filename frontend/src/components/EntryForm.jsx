import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEntry } from "../redux/EntryThunkAPI";

function EntryForm() {
  const [name, setName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [submitButton, setSubmitButton] = useState(false);
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setSubmitButton(false);
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (index) => (event) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = event.target.value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can send the form data to the server here using the `fetch()` function or XMLHttpRequest
    if (phoneNumbers.length < 1) {
      window.alert("Please add a phone number.");
    } else {
      setSubmitButton(true);
      const entryData = {
        name: name,
        phoneNumbers: [{phoneNumbers}],
      };
      console.log(entryData);
      dispatch(createEntry(entryData));
      setName("");
      setPhoneNumbers([]);
    }
  };
  const handleRemovePhoneNumber = (index) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  return (
    <div className="flex flex-col mx-auto w-full justify-center items-center lg:flex-row">
      <div className="border relative px-1 pt-7 pb-8 bg-white shadow-xl w-1/2 max-w-xl m-12 sm:px-10 rounded-b-md">
        <h2 className="text-lg w-full flex justify-center items-center font-bold text-blue-500">
          Add Entries with name and phone number
        </h2>
        <form onSubmit={handleSubmit} className="bg-white py-6 rounded-lg">
          <label className="block font-medium text-lg mb-2">
            Name:
            <input
              className="border p-2 rounded-lg w-full"
              type="text"
              required
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <br />
          <label className="block font-medium text-lg mb-2">
            Phone Numbers:
            {phoneNumbers.map((phoneNumber, index) => (
              <div className="flex my-2" key={index}>
                <input
                  className="border p-2 rounded-lg mb-2 w-full"
                  type="number"
                  required
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange(index)}
                />
                <button
                  className="bg-red-500 text-white mx-8 rounded-lg px-2 hover:bg-red-600"
                  type="button"
                  onClick={() => handleRemovePhoneNumber(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </label>
          <button
            className="bg-blue-500 text-white rounded-lg my-4 p-2 hover:bg-blue-600"
            type="button"
            onClick={handleAddPhoneNumber}
          >
            Add Phone Number
          </button>
          <br />
          <input
            className="bg-green-500 w-full text-white rounded-lg p-2 hover:bg-green-600"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      <div className="border relative px-1 pt-7 pb-8 bg-white shadow-xl w-1/2 max-w-xl m-12 sm:px-10 rounded-b-md">
        {submitButton && (
          <div className="p-4 font-bold ">
            <p className="text-red-600 text-xl mb-4">
              Please Login to see and download data.
            </p>
          </div>
        )}
        <Link
          to="/login"
          className="w-full border my-2 text-white rounded-lg px-8 py-2 bg-blue-500  hover:bg-blue-600"
        >
          Login
        </Link>

        <p className="mt-4">Name: </p>
        <h1 className="text-xl mt-1 mb-3 font-bold">{name}</h1>
        <p>Phone Numbers: </p>
        {phoneNumbers.map((phoneNumber, index) => (
          <div key={index} className="flex">
            <div className="flex my-2 text-md color-blue-500">
              <p className="inline-block font-bold mr-4">{index}: </p>
              <p>{phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntryForm;
