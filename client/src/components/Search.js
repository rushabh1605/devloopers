import React from 'react';
import '../App.css';

function Search(props) {
    const handleChange = (e) => {
        props.searchValue(e.target.value);
      };
      return (
        <form
          method='POST'
          onSubmit={(e) => {
            e.preventDefault();
          }}
          name='formName'
          className='center '
        >
          <label>
            <span className='searchbar'> Search Players: &nbsp;
            </span>
          </label>
          <input
              autoComplete='off'
              className="form-control"
              type='text'
              name='searchTerm'
              onChange={handleChange}
          />
        </form>
      );
    
}
export default Search;