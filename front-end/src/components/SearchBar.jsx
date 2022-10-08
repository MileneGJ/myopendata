import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "./SearchBarStyles";

export default function SearchBar () {
    const navigate = useNavigate()
    const [search, setSearch] = useState({
        content: '',
        field: 'keyword'
    })

    function goToSearch(e) {
        e.preventDefault()
        navigate(`/search?${search.field}=${search.content}`)
    }

    return (
        <SearchForm onSubmit={goToSearch}>
        <input
            type='text'
            placeholder='Search'
            value={search.content}
            onChange={e => setSearch({ ...search, content: e.target.value })}
        />
        <select
            onChange={e => setSearch({ ...search, field: e.target.value })}
        >
            <option value='keyword'>Keyword</option>
            <option value='title'>Title</option>
            <option value='user'>Author</option>
        </select>

    </SearchForm>
    )

}