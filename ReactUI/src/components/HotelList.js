import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from './Title';
import Hotel from './Hotel';
import SearchForm from './SearchForm';
import EmptyHotel from './EmptyHotel';
import ReactPaginate from 'react-paginate';

const itemPerPage = 20;
class HotelList extends Component {
    constructor() {
        super();
        this.state = {
            hotels: [],
            searchKey: "",
            priceFilter: false,
            noOfBedrooms: 0,
            totalItems: 0,
            totalPageCount: 0,
            hotelsToShow: [],
            offset: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.key) {
            this.props.history.push('/');
        }
        this.setHotels();
    }

    setHotels = () => {
        const key = this.state.searchKey;
        const url = key ? 'hotels' : 'hotels/' + key;
        if (key) {
            fetch('http://localhost:8080/' + url)
            //fetch( 'hotels.json')
                .then(response => response.json())
                .then(data =>
                    this.setState(
                        {
                            hotels: this.filterData(data.listings),
                            //hotels: this.filterData(data.data.results.listings),
                        }));
                        
        } else {
            this.setState(
                {
                    hotels: [],
                    sortBy: 'propertyName',
                    searchKey: "",
                    priceFilter: false,
                    noOfBedrooms: 0,
                    totalItems: 0
                })
        }
    };

    filterData = (hotels) => {
        const _state = this.state;
        let _hotels = [...hotels];

        // TODO : Search hotel should be from server side added here for test
        /*if(_state.searchKey) {
            const key = _state.searchKey.toLowerCase();
            _hotels = _hotels.filter(hotel => {
                const headline = hotel.propertyMetadata.headline? hotel.propertyMetadata.headline.toLowerCase() : "";
                const propertyName = hotel.propertyMetadata.propertyName? hotel.propertyMetadata.propertyName.toLowerCase() : "";
                const propertyType = hotel.propertyType.toLowerCase();
                if (headline.includes(key) || propertyName.includes(key) || propertyType.includes(key)) {
                    return true;
                }
                return false;
            });
        }*/

        if (_state.noOfBedrooms > 0) {
            _hotels = _hotels.filter(hotel => +hotel.bedrooms === +_state.noOfBedrooms);
        }

        if (_state.priceFilter) {
            _hotels = _hotels.sort(function (a, b) {
                const aP = a.averagePrice && a.averagePrice.value ? a.averagePrice.value : 0;
                const bP = b.averagePrice && b.averagePrice.value ? b.averagePrice.value : 0;
                return aP - bP;
            });
        }

        const totalPageCount = Math.ceil(+_hotels.length / 20);
        this.setState({
            totalItems: _hotels.length || 0,
            totalPageCount: totalPageCount,
            hotelsToShow: _hotels.slice(this.state.offset, itemPerPage)    
        })

        return _hotels;
    }

    handleSubmit(event) {
        if (this.state.searchKey) {
            this.props.history.push('/search/' + this.state.searchKey);
        } else {
            this.props.history.push('/');
        }
        this.setState({offset : 0});
        this.setHotels();
        event.preventDefault();
    }

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            this.setState({ [name]: checked })
        } else {
            this.setState({ [name]: value })
        }
    }

    handlePageClick = (data) => {
        const selected = data.selected;
        const offset = Math.ceil(selected * itemPerPage);        
        console.log(offset);
        //TODO: use server side pagination for performance, using client side pagination for now
        const hotels = [...this.state.hotels];
        const hotelsToShow = hotels.splice(offset, itemPerPage);
        this.setState({
            hotelsToShow: hotelsToShow,
            offset: offset
        })         
      };

    render() {
        console.log('rendering', this.state);
        return (
            <React.Fragment>
                <div className="py-2">
                    <div className="container">
                        <Title name="Best" title="Hotels" />
                        <SearchForm
                            handleChange={this.handleChange}
                            data={this.state}
                            handleSubmit={this.handleSubmit}
                        />  
                        {
                            this.state.hotelsToShow.length? 
                            (<div id="react-paginate">
                                <ReactPaginate
                                    previousLabel={'previous'}
                                    nextLabel={'next'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={this.state.totalPageCount}
                                    marginPagesDisplayed={0}
                                    pageRangeDisplayed={3}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
                            </div>) : ''
                        }
                                            
                        <div className="row">
                            {
                                this.state.hotelsToShow && this.state.hotelsToShow.length ?
                                    (this.state.hotelsToShow.map(hotel => { return (<Hotel key={hotel.listingNumber} hotel={hotel} />) }))
                                    : (<EmptyHotel searchKey={this.props.match.params.searchKey} hotels={this.state.hotelsToShow} />)
                            }
                        </div> 

                                    
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HotelList;