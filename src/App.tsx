import React from "react";
import "./App.css";
import SimpleTable from "./DataGrids/SimpleTables/SimpleTable";
import {
  GridColDef,
  GridRowClassNameParams,
  GridRowParams,
} from "@mui/x-data-grid";
const columns: GridColDef[] = [
  {
    field: "#",
    headerName: "#",
    filterable: false,
    renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
  },
  { field: "id", headerName: "ID", width: 110, filterable: false },
  { field: "title", headerName: "Title", width: 300 },
  { field: "price", headerName: "Price", width: 150, type: "number" },
  {
    field: "availabilityStatus",
    headerName: "Availability Status",
    width: 250,
  },
  { field: "brand", headerName: "Brand", width: 150 },
  { field: "category", headerName: "Category", width: 150 },
  { field: "description", headerName: "Description", width: 400 },
  {
    field: "dimensions",
    headerName: "Dimensions",
    width: 150,
    valueGetter: (params) => `NA`,
  },
  {
    field: "discountPercentage",
    headerName: "Discount Percentage",
  },
  {
    field: "minimumOrderQuantity",
    headerName: "Minimum Order Quantity",
  },
  { field: "rating", headerName: "Rating", width: 100 },
  { field: "returnPolicy", headerName: "Return Policy", width: 200 },
  {
    field: "shippingInformation",
    headerName: "Shipping Information",
    width: 200,
  },
  { field: "sku", headerName: "SKU", width: 150 },
  { field: "stock", headerName: "Stock", width: 100 },
  {
    field: "tags",
    headerName: "Tags",
    width: 200,
    valueGetter: (params) => "jai",
  },
  {
    field: "warrantyInformation",
    headerName: "Warranty Information",
    width: 200,
  },
];

function App() {
  return (
    <div className="App">
      <SimpleTable
        mode="server"
        apiEndpoint="https://dummyjson.com/products"
        docTitle="Report for DR. D.K. VATSAL from 08/06/2024 to 14/06/2024" //for excel title
        columns={columns}
        onRowClick={(data: any) => console.log("row clicked", data)} //on row click
        isRowSelectable={(params: GridRowParams) => {
          let id:string|number = params.id;
          if (typeof id ==="string") {
            id = parseInt(id);
          }
          return id % 2 !== 0;
        }} //callbak for row selectable or not callback
        onCellClick={(data) => {
          console.log({ data });
        }}
        getRowClassName={(params: GridRowClassNameParams) => {
          if (params.row.id === 2) {
            return "custom_row";
          }
          return "";
        }} //with this callback we return classname for row by conditons
        defaultSelection={(params: GridRowParams) => {
          let id:string|number = params.id;
          if (typeof id ==="string") {
            id = parseInt(id);
          }
          return id % 2 === 0;
        }}
      />
    </div>
  );
}

export default App;
