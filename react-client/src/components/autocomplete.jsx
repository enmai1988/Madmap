import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from 'material-ui/MenuItem';

export class Autocomplete extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidUpdate(prevProps) {
    const {google} = this.props;
    const map = window.map;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }
  
  componentDidMount() {
    this.renderAutoComplete();
  }
  
  renderAutoComplete() {
    const {google} = this.props;
    const map = window.map;
    if (!google || !map) { return; }
    
    const autocompleteRef = this.refs.autocomplete;
    const autocompleteNode = ReactDOM.findDOMNode(autocompleteRef);
    var autocomplete = new google.maps.places.Autocomplete(autocompleteNode);
    autocomplete.bindTo('bounds', map);
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.props.searchPlace(place, map);
    });
  }
  
  // textChange(event) {
  //   console.log(event.target.value);
  // }
  
  render() {
    return (
      <input
        type="text" 
        ref="autocomplete"/>
    );
  }
}

export default Autocomplete;