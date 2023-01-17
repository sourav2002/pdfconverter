import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { getAllEntries } from "../redux/EntryThunkAPI";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DateFilteredTable = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const entries = useSelector((state) => state.entry.entries);
  const loading = useSelector((state) => state.entry.loading);

  const filteredEntries = entries.filter((entry) => {
    const createdAt = new Date(entry.createdAt);
    return createdAt >= startDate && createdAt <= endDate;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEntries());
  }, []);

  const downloadSingle = () => {
    const doc = new jsPDF();
    filteredEntries.forEach((entry) => {
      entry.phoneNumbers.forEach((phoneNumber) => {
        doc.text("Name: " + entry.name, 10, 20);
        doc.text("Token: " + phoneNumber.token, 10, 10);
        doc.text("Phone Number: " + phoneNumber.number, 10, 30);
        doc.addPage();
      });
    });
    doc.save("entries.pdf");
  };

  const downloadInTable = () => {
    console.log("table pdf button working ....");
    const doc = new jsPDF();
    doc.text("Entries", 14, 22);
    let data = filteredEntries.map((entry) => {
      let result = [];
      let name = entry.name;
      entry.phoneNumbers.forEach((phoneNumber) => {
        result.push([phoneNumber.token, phoneNumber.number, name]);
      });
      return result;
    });
    data = [].concat.apply([], data); // flatten the array
    doc.autoTable({
      head: [["Token", "Phone Number", "Name"]],
      body: data,
    });
    doc.save("entry.pdf");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-xl font-bold">Loading...</div>
      </div>
    );
  }
  return (
    <div className="p-12 mx-auto">
      {/* Go back button */}
      <div className="flex w-full text-center justify-between flex-wrap">
        <Link
          to="/admin"
          className=" border my-2 text-white rounded-lg px-8 py-2 bg-blue-500  hover:bg-blue-600"
        >
          Go back
        </Link>
      </div>

      {/* select date 2 buttons */}
      <div className="py-4 mb-1 flex flex-wrap  items-center justify-between">
        <div>
          <span className="text-lg font-bold px-2">Start: </span>
          <DatePicker
            selected={startDate}
            className="bg-gray-700 text-white py-3 rounded-xl text-center"
            onChange={(date) => setStartDate(date)}
            maxDate={new Date()}
            placeholderText="Start date"
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div>
          <span className="text-lg font-bold px-2">End: </span>
          <DatePicker
            className="bg-gray-700 text-white py-3 rounded-xl text-center"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            placeholderText="End date"
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
      </div>

      {filteredEntries.length > 0 && (
        <div className="flex justify-between">
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                downloadInTable();
              }}
              className="bg-blue-500 p-3 font-bold hover:bg-blue-700 text-white rounded-md my-4"
            >
              DOWNLOAD IN TABLE FORMAT
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                downloadSingle();
              }}
              className="bg-blue-500 p-3 font-bold hover:bg-blue-700 text-white rounded-md my-4"
            >
              DOWNLOAD ON SINGLE PAGES
            </button>
          </div>
        </div>
      )}
      {/* table  */}
      <div className="shadow-xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Token
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length != 0 ? (
              filteredEntries.map((data, i) => {
                return data.phoneNumbers.map((phone, ind) => {
                  return (
                    <tr
                      key={i + Math.random() + ind}
                      className="bg-white border-b dark:text-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium dark:text-white text-gray-900 whitespace-nowrap">
                        {phone.token}
                      </td>
                      <td className="px-6 py-4">{phone.number}</td>
                      <td className="px-6 py-4">{data.name.toUpperCase()}</td>
                      <td className="px-6 py-4">
                        {new Date(data.createdAt).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                });
              })
            ) : (
              <tr>
                <td className="px-6 py-4 w-full font-medium dark:text-red-500 text-center text-gray-900 whitespace-nowrap">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DateFilteredTable;
