import React from 'react';

function SearchForm(props) {
    return (
        <main>
          <form onSubmit={props.handleSubmit}>
            <div className="form-row align-items-center">              
              <div className="col-auto">
                <input 
                  type="text" 
                  autoComplete="off"
                  name="searchKey"
                  value={props.data.searchTerm}
                  placeholder="Search Hotel"
                  onChange={props.handleChange}
                  className="form-control mb-2"
                />
              </div>  
              <div className="col-auto">          
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox"
                    name="priceFilter"
                    checked={props.data.priceFilter}
                    onChange={props.handleChange}
                  />
                  <label className="form-check-label" htmlFor="priceFilter">Price</label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check form-check-inline">
                  <select className="form-control form-control-sm" name="noOfBedrooms" value={props.data.noOfBedrooms} onChange={props.handleChange} >
                    <option defaultValue="0">BedRooms (No Selection)</option>
                    <option defaultValue="1">1</option>
                    <option defaultValue="2">2</option>
                    <option defaultValue="3">3</option>
                    </select>
                </div>
              </div>

              <div className="col-auto">
                <input type="submit" value="Submit" />
              </div> 

            </div>
          </form>
      </main>
    )
}

export default SearchForm;