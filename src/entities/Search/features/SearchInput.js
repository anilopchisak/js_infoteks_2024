import React from 'react';
import '../ui/SearchInput.scss';

const SearchInput = ({setSearch}) => {
    return (
        <div className={"search-input"}>
            <input
                type={"search"}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;