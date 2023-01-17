import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import DateFilteredTable from './components/DateFilteredTable';
import EntryForm from './components/EntryForm';
import Login from './components/Login';


const App = () =>{
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/" element={<EntryForm />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/filterByDate" element={<DateFilteredTable />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
