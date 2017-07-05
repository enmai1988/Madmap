import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class PinInfo extends React.Component {

  constructor(props) {
    super(props);
    // this.textChange = (e) => (this.props.updateCurrPinInfo(e.target.value));
    this.state = {
      friends: [],
      textFieldValue: '',
      datePicked: null,
      timePicked: null
    };

    this.handleEventNameChange.bind(this);
    this.handleFriendSelection.bind(this);
    this.handleChangeDatePicker.bind(this);
    this.handleChangeTimePicker.bind(this);
    this.handleCreateButton.bind(this);
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
      <div id="event_text_field">
        <TextField
          floatingLabelText="Event name"
          value={this.state.textFieldValue}
          onChange={this.handleEventNameChange}
        />
        <SelectField
          multiple={true}
          hintText="Invite friends"
          value={this.state.friends}
          onChange={(e, index, friends) => this.handleFriendSelection(e, index, friends)}
        >
          {this.menuItems(this.state.friends)}
        </SelectField>
        <DatePicker
          hintText="Select a date"
          container="inline"
          autoOk={true}
          value={this.state.datePicked}
          onChange={(e, date) => this.handleChangeDatePicker(e, date)}
        />
        <TimePicker
          format="ampm"
          hintText="Pick a time"
          autoOk={true}
          value={this.state.timePicked}
          onChange={(e, time) => this.handleChangeTimePicker(e, time)}
        />
        <RaisedButton label="Create" style={raisedButtonStyle} onClick={this.handleCreateButton}/>
      </div>
    );
  }
}


export default PinInfo;
