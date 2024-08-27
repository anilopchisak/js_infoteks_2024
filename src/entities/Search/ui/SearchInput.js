import React, {useContext, useState} from 'react';
import { CiSearch } from "react-icons/ci";
import {Context} from "../../../index";

const SearchInput = ({setSearch}) => {
    const {user} = useContext(Context);
    const [value, setValue] = useState('');

    // если строка поиска пустая, удаляем отфильтрованный список, выводим исходный
    const onChangeInput = (input) => {
        if (input === '') {
            setSearch(input);
            user.removeFilter();
        }
        else {
            setValue(input);
        }
    }




    return (
        <div className={"search-input"}>
            <input
                type={"search"}
                onChange={(e) => onChangeInput(e.target.value)}
                placeholder={'Search...'}
            />
            <CiSearch className={'icon-search'} onClick={() => setSearch(value)}/>
        </div>
    );
};

export default SearchInput;