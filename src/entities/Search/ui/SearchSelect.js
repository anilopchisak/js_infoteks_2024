import React, {useContext, useEffect, useState} from 'react';
import { PiSortAscending } from "react-icons/pi";
import { PiSortDescending } from "react-icons/pi";
import {PiCaretDown} from "react-icons/pi";
import {Context} from "../../../index";

const SearchSelect = ({columns}) => {
    const {user} = useContext(Context);
    // столбец по которому сортируем
    const [select, setSelect] = useState('Select');
    // порядок сортировки: по возр - asc, по убыв - desc, без -none
    const [order, setOrder] = useState('none');

    useEffect(() => {
        if (select === 'Select') {
            setOrder('none');
        }
        else {
            setOrder('asc');
        }
    }, [select]);

    useEffect(() => {
        const value = [select, order];
        user.setSort(value);
    }, [order, select]);

    return (
        <div className={'search-select'}>
            <div className={"dropdown-wrapper"}>
                <div><label>Sort by</label></div>
                <select className={"dropdown"}
                        onChange={(event) => setSelect(event.target.value)}>
                    <option value={'Select'} name={"col"}>
                        Select
                    </option>
                    {columns !== null && columns.map((col, colID) =>
                            <option
                                value={col}
                                key={colID}>
                                {col}
                            </option>
                    )}
                </select>

                <div className={"dropdown-icon"}>
                    <PiCaretDown />
                </div>
            </div>

            <div>
                {select !== 'Select' &&
                    <div>
                        {order === 'asc' &&
                            <PiSortAscending className={'icon-order'} onClick={() => setOrder('desc')}/>
                        }
                        {order === 'desc' &&
                            <PiSortDescending className={'icon-order'} onClick={() => setOrder('asc')}/>
                        }
                    </div>

                }
            </div>
        </div>
    );
};

export default SearchSelect;