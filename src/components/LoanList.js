import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../styles/loanlist.css';

export default function LoanList({ rowData, columns }) {

  return (
    (<div className='table-container'>
      <DataGrid
        rows={rowData}
        columns={columns}
        autoHeight // This allows the table to adjust its height based on content
        pagination
        pageSize={2}
        sx={{
          color: '#f1f1f1cc',
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#1c2f44', // Style for odd rows
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#2a3342', // Style for even rows
          }, // Font color for all cells (columns)
        }}
      />
    </div>)
  )
}
