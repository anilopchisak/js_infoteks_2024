import React from 'react';
import './ui/Table.scss';

const Table = ({headers, tableContent}) => {

    return (
        <div className={'table-wrapper'}>
            <table className={'table-user'}>
                <thead>
                <tr>
                    {headers.map((text, headerID) => (
                        <th key={headerID}>
                                <span>
                                    {text}
                                </span>
                            <div/>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {tableContent.map((row, rowID) => (
                    <tr key={rowID}>
                        {row.map((cell, cellID) => (
                            <td key={cellID}>
                                    <span>
                                        {cell}
                                    </span>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;