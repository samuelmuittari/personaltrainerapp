import React, {useState, useEffect} from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";


function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        console.log("OLLAAN HOOK FUNKTIOSSA");
        fetchData();
      }, []);

    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then((response) => response.json())
        .then((data) => setTrainings(data))
    }

    const [columnDefs, setColumnDefs] = useState ([
        {
            headerName:"Date", 
            field: "date", 
            sortable: true, 
            filter: true, 
            floatingFilter: true,
            cellRendererFramework: (params) => {
                const date = dayjs(params.value); 
                const formattedDate = date.format('DD.MM.YYYY HH:mm'); 
                return <div>{formattedDate}</div>;
              }
        },
        {headerName:"Duration", field: "duration", sortable: true, filter: true, floatingFilter: true},
        {headerName:"Activity", field: "activity", sortable: true, filter: true, floatingFilter: true},
        {   
            headerName: "Customer",
            field: "customer",
            sortable: true,
            filter: true,
            floatingFilter: true,
            cellRendererFramework: (params) => (
              <div>
                {params.value.firstname} {params.value.lastname}
              </div>
            ),
          },
    ])

    return (
        <>
        <div style={{height: "100%", boxSizing:"border-box"}}>
        <div style={{ height: 600, width: "90%"}} className="ag-theme-material">
        <AgGridReact 
        rowData={trainings}
        columnDefs={columnDefs}
        paginationPageSize={10}
        pagination={true}
        />
        </div>
        </div>
        </>
    )
}

export default Traininglist;