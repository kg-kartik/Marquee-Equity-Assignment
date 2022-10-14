import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table'

function Table({ columns, data }) {
  
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function Details() {
  const columns = React.useMemo(
    () => [ 
        {
            Header: 'Cin',
            accessor: 'cin',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
    ],
  )

  const [data,setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
        try {
            const result = await Axios.get("http://localhost:5000/company/getCompanies");

            console.log(result.data.data);

            setData(result.data.data);
        }catch(err){
            console.log(err);
        }
    }
    getData();
  },[])

  return (
    <>
      <p className='list-title'>List of the companies</p>
      <Table columns={columns} data={data} />
    </>
  )
}

export default Details
