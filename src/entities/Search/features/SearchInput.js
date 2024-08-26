import React, {useContext, useState} from 'react';
import '../ui/SearchInput.scss';
import { CiSearch } from "react-icons/ci";
import {Context} from "../../../index";

const SearchInput = ({setSearch}) => {
    const {user} = useContext(Context);
    const [value, setValue] = useState('');

    const onChangeInput = (input) => {
        if (input == null) {
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
            <CiSearch className={'icon'} onClick={() => setSearch(value)}/>
        </div>
    );
};

export default SearchInput;