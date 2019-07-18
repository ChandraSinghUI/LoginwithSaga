import React, { Component } from 'react';
import '../app.css';
import {
  PageHeader,
  Form,
  FormGroup,
  Col,
  FormControl,
  InputGroup,
  Glyphicon,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchAction } from './search-store';
import { searchDetailsRoute } from '../navigation/route-constants';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResult: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      const { isLoading, error } = nextProps.search;
      if (!isLoading && !error) {

      }
    }
  }

  handleSearch = async e => {
    this.props.searchAction(e.target.value)
  };

  showSearchDetails = (item) => {
    this.props.history.push({
      pathname: `/${searchDetailsRoute}`,
      params: item
    })
  }

  render() {
    let size=30;
    let loader = (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>);
    let searchResultList = [];
    let noResult;
    if(this.props.searchResults!==null){
       noResult = <h6>No Data Found...</h6>
    } else {
      noResult = '';
    }
    if (this.props.searchResults) {
      let result = this.props.searchResults;
      
      let newArr = result.filter((el)=> el.population!=='unknown'
       );
      
      let sortedResults = newArr.sort((a,b) => b.population-a.population);

      searchResultList = sortedResults.map((item, i) => {
        size-=2;
        return (<ListGroupItem onClick={() => this.showSearchDetails(item)} key={i}>
          <div style={{fontSize:`${size}px`}}>
            <span>{item.name}</span>
            <span className="pull-right"><Glyphicon glyph="user" /> {item.population}</span>
          </div>
        </ListGroupItem>);
        
      });
    }
    return (
      <div className="search">
        <PageHeader className="text-center" style={{fontSize:'12px'}}>Search</PageHeader>
        <Form>
          <FormGroup controlId="formUsername">
            <Col sm={12}>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Enter search here ..."
                  autoComplete="off"
                  onChange={this.handleSearch}
                />
                <InputGroup.Addon>
                  <Glyphicon glyph="search" />
                </InputGroup.Addon>
              </InputGroup>
            </Col>
          </FormGroup>
        </Form>
      {this.props.isLoading && loader}
        {searchResultList.length > 0 ?  <Col sm={12}>
            <ListGroup>
              {searchResultList}
            </ListGroup>
          </Col>: noResult        
        }
      </div>
    );
  }
}

const mapStateToProps = ({ search: { searchResults, isLoading } }) => ({
  searchResults,
  isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
