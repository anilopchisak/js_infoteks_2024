import React, {useContext, useEffect, useState} from 'react';
import SearchInput from "./features/SearchInput";
import SearchSelect from "./features/SearchSelect";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Search = ({columns, setSearch}) => {
    const {user} = useContext(Context);

    return (
        <div>
            <SearchInput setSearch={setSearch}/>
            <SearchSelect columns={columns}/>
        </div>
    );
};

export default Search;