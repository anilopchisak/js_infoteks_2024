import React, {useContext, useEffect, useState} from 'react';
import SearchInput from "./ui/SearchInput";
import SearchSelect from "./ui/SearchSelect";
import {Context} from "../../index";
import './ui/Search.scss';

const Search = ({columns, setSearch}) => {
    return (
        <div className={'search'}>
            <SearchInput setSearch={setSearch}/>
            <SearchSelect columns={columns}/>
        </div>
    );
};

export default Search;