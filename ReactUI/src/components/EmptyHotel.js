import React from "react";

export default function EmptyHotel(props) {
  console.log('EmptyHotel', props);
  return (
    
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title text-capitalize">
          <h1>
             {
               !props.hotels.length && props.searchKey ? (<span>No Result Found!</span>) :
               (<span>Search and Book Best Hotel!!</span>)
             }

          </h1>
        </div>
      </div>
    </div>
  );
}