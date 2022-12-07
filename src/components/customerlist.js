import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Addcustomer from './addcustomer';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Editcustomer from "./editcustomer";
// import Button from '@mui/material/Button';



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

    const deleteCustomer = (link) => {
        console.log("DELETE FUNKTIO");
        fetch(link, { method: "DELETE" }).then((response) => {
          if (response.ok) {
            fetchData();
          }
        });
      };

    const addCustomer = (customer) => {
        console.log("customerlist.js tiedoston addCar metodissa");
        // REST RAJAPINTAA KÄYTTÄEN PITÄISI SAADA AUTO LISÄTTYÄ
        fetch("https://customerrest.herokuapp.com/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        }).then((response) => {
          if (response.ok) {
            fetchData();
          }
        });
      };

      const editCustomer = (customer, link) => {
        fetch(link, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer)
        })
            .then(response => fetchData())
      }

      const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(training)
        })
            .then(response => {
                fetchData();
            })

      }

    const [columnDefs, setColumnDefs] = useState ([
        {
            headerName: "Delete",
            width: 100,
            field: "links.0.href",
            cellRenderer: (params) => (
              <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
              </IconButton>
            ),
          },  
          {
            headerName: "Edit",
            width: 100,
            field: "links.0.href",
            cellRenderer: (params) => (
                <Editcustomer editCustomer={editCustomer} params={params} />
            )
          },
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
        <Addcustomer addCustomer={addCustomer} />
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
