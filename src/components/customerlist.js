import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function Customerlist() {
    const [customers, setCustomers] = useState([]);
    
    useEffect(() => {
        console.log("OLLAAN HOOK FUNKTIOSSA");
        fetchData();
        
      }, []);   

    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content));
    }

    const [columnDefs, setColumnDefs] = useState ([
        {headerName: "First name", field: "firstname", sortable: true, filter: true, floatingFilter: true},
        {headerName: "Last name", field: "lastname", sortable: true, filter: true},
        {headerName: "Street address", field: "streetaddress", sortable: true, filter: true, floatingFilter: true },
        {headerName: "Postcode", field: "postcode", sortable: true, filter: true, floatingFilter: true},
        {headerName: "City", field: "city", sortable: true, filter: true, floatingFilter: true},
        {headerName: "Email address", field: "email", sortable: true, filter: true, floatingFilter: true},
        {headerName: "Phone number",field: "phone", sortable: true, filter: true, floatingFilter: true},
    ]);


    return (
        <>
        <div style={{height: "100%", boxSizing:"border-box"}}>
        <div style={{ height: 600, width: "90%"}} className="ag-theme-material">
        <AgGridReact 
        rowData={customers}
        columnDefs={columnDefs}
        paginationPageSize={10}
        pagination={true}
        />
        </div>
        </div>
        </>
    )

}
export default Customerlist;
