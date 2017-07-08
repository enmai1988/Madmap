import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import style from './style.js';

class PinInfo extends React.Component {

  constructor(props) {
    super(props);
    // this.textChange = (e) => (this.props.updateCurrPinInfo(e.target.value));
    this.state = {
      friends: [],
      textFieldValue: ''
    };

    this.handleEventNameChange = this.handleEventNameChange.bind(this);
    this.handleFriendSelection = this.handleFriendSelection.bind(this);
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    this.handleChangeTimePicker = this.handleChangeTimePicker.bind(this);
    this.handleCreateButton = this.handleCreateButton.bind(this);
  }

  handleEventNameChange(e) {
    this.setState({ textFieldValue: e.target.value });
  }

  handleFriendSelection(event, index, friends) {
    this.setState({ friends });
  }

  handleChangeDatePicker(e, date) {
    this.setState({ datePicked: date });
  }

  handleChangeTimePicker(e, time) {
    this.setState({ timePicked: time });
  }

  handleCreateButton() {
    // should send a request to server to save the event and invite other people
    console.log('clicked');
  }

  menuItems(values) {
    return this.props.friends.map(friend => (
      <MenuItem
        key={friend.id}
        insetChildren={true}
        checked={values && values.indexOf(friend) > -1}
        value={friend}
        primaryText={`${friend.firstName} ${friend.lastName}`}
      />
    ));
  }

  render() {
    const raisedButtonStyle = { margin: 8, height: '22px' };

    return (
      <div id="event_text_field" style={style.pinTextField}>
        <TextField
          floatingLabelText="Event name"
          value={this.state.textFieldValue}
          fullWidth={false}
          style={style.pinInfo}
          onChange={this.handleEventNameChange}
        />
      </div>
    );
  }
}


export default PinInfo;
