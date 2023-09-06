import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../styles/loanlist.css';

export default function LoanList({ rowData, columns }) {

  return (
    (<div className='table-container'  >
      <DataGrid
        rows={rowData}
        columns={columns}
        autoHeight // This allows the table to adjust its height based on content
        pagination
        pageSize={2}
        
        sx={{
          color: '#000',
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#ffffff', // Style for odd rows
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#91abb6', // Style for even rows
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            fontSize:'14px' // Style for even rows
          }, // Font color for all cells (columns)
        }}
      />
    </div>)
  )
}
