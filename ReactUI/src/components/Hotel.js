import React, { Component } from 'react';
import styled from 'styled-components';

class Hotel extends Component {
    render() {
       const {averagePrice, images, bedrooms, bathrooms, propertyType, 
        propertyMetadata, sleeps, averageRating, detailPageUrl} = this.props.hotel;
        
        return (
            <HotelWraper className="col-9 col-md-6 col-lg-3 mx-auto">
                <div className="card">
                        {
                                <div>
                                    <div className="img-container p-2" >
                                        {/* //TODO: list all images, added only one  */}
                                            <img src={images[0].c6_uri} alt={images[0].altText} className="card-img-top" />
                                        <div className="card-footer">
                                            <h5 className="text-blue font-italic mb-0">
                                                <span className="mr-1">{averagePrice ? averagePrice.currencyUnits : ''}</span>
                                                {averagePrice? averagePrice.value: 'N.A.'}
                                                <span className="fa fa-star px-2"> {averageRating? averageRating : 'new'}</span>
                                            </h5>                                                                       
                                        
                                             <h6 className="align-self-center my-2">Title : {propertyMetadata.propertyName}</h6> 
                                             <h6 className="align-self-center my-2">Type : {propertyType}</h6> 
                                             <h6 className="align-self-center my-2">Number of bedrooms : {bedrooms}</h6>
                                             <h6 className="align-self-center my-2">Number of bathrooms : {bathrooms.full} + {bathrooms.half} + {bathrooms.toiletOnly}</h6> 
                                             <h6 className="align-self-center my-2">Number of guests : {sleeps}</h6> 

                                             <h5 className="text-blue font-italic mb-0">
                                                <span className="mr-1"><a target="_blank" rel="noopener noreferrer" href={"https://www.vrbo.com" + detailPageUrl}>View Details</a></span>                                            
                                            </h5>                                                                       
                                        
                                           
                                        </div>

                                    </div>
                                </div>
                        
                        }

                </div>

            </HotelWraper>
        )
    }
}

const HotelWraper = styled.div`
    .card {
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer: {
        border-top: transparent;
        background: transparent;
        transition: all 1s linear;
    }
    &:hover {
        .card {
          border: 0.04rem solid rgba(0,0,0,0.2);
          box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2)
        }
        .card-footer {
          background: rgba(247, 247, 247);
        }      
    }
    .img-container {
        position: relative;
        overflow: hidden;
    }
    .card-img-top {
        transition: all 1s linear;
    }
    .img-container:hover .card-img-top{
    transform: scale(1.2);
    }
   }
   .book-btn{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2 rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color:var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s linear;
    }
    .img-container: hover .book-btn {
    transform: translate(0,0);
    }
    .book-btn:hover{
    color: var(--mainBlue);
    cursor: pointer;
    }
`;

export default Hotel;