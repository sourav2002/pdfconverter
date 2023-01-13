import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEntries, searchByName } from "../redux/EntryThunkAPI";

const Admin = () => {
  const dispatch = useDispatch();
  const entry = useSelector((state) => state.entry.entries);
  console.log(entry);
  const [filter, setFilter] = useState();
  useEffect(() => {
    dispatch(getAllEntries());
  }, []);

  const searchName = (name) => {
    if (name.length < 1) dispatch(getAllEntries());
    else dispatch(searchByName(name));
  };

  const downloadPDF = (token) => {
    console.log(token);
  };

  return (
    <div className="p-12 mx-auto">
      <Link
        to="/"
        className="w-full border my-2 text-white rounded-lg px-8 py-2 bg-blue-500  hover:bg-blue-600"
      >
        Go back to form
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="py-4 relative mt-1">
          <input
            type="text"
            id="table-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by name"
            onChange={(e) => {
              searchName(e.target.value);
              setFilter(e.target.value);
            }}
            value={filter}
          />
        </div>
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
              <th scope="col" className="px-6 py-3">
                Downlaod
              </th>
            </tr>
          </thead>
          <tbody>
            {entry.length != 0 ? entry.map((data, i) => {
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
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => downloadPDF(phone.token)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                );
              });
            }) :
              <tr> <td className="px-6 py-4 w-full font-medium dark:text-red-500 text-center text-gray-900 whitespace-nowrap">
                No Data Found
              </td></tr>


            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Admin;
