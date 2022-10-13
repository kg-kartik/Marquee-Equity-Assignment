import React from 'react'
import { useTable } from 'react-table'

import makeData from './makeData';

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
            Header: 'First Name',
            accessor: 'firstName',
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
        },
    ],
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <>
      <p className='list-title'>List of the companies</p>
      <Table columns={columns} data={data} />
    </>
  )
}

export default Details
