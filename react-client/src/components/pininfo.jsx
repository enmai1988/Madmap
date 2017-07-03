import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class PinInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.text || ''
    };
    this.textChange = (e) => (this.setState({text: e.target.value}));
    this.styles = {
      paper: {
        postition: 'relative',
        marginTop: '31em',
        marginLeft: '10%',
        width: '80%'
      },
      textBox: {
        width: '80%',
        marginLeft: '3em'
      }
    };
  }
  render() {
    return (
      <Paper
        style={this.styles.paper}
        children={
          <TextField
            hintText="Information about this pin"
            floatingLabelText="Pin Info"
            multiLine={true}
            rows={1}
            onChange={this.textChange}
            defaultValue={this.state.text}
            style={this.styles.textBox}
          />
        }
      >
      </Paper>
    );
  }
}


export default PinInfo;
