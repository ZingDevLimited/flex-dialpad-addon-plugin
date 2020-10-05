import * as React from "react";
import { withTheme, Manager } from "@twilio/flex-ui";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class PhoneNumberField extends React.Component {
  state = {
    error: undefined,
    loading: false,
    conferenceTo: "",
  };

  handleKeyPress = e => {
    const key = e.key;

    if (key === 'Enter') {
      this.props.onNumberSelected(this.formatNumber(this.state.conferenceTo));
    }
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState({ conferenceTo: value });
  }

  handleBlur = e => {
    const value = e.target.value;
    this.setState({conferenceTo: value});
    this.props.onNumberSelected(this.formatNumber(this.state.conferenceTo))
  }

  formatNumber = number => {
    if (number) {
        if (number.indexOf('0') === 0) {
          number = `+44${number.substr(1)}`;
        } else if (number.indexOf('+44') !== 0 && number.indexOf('0') !== 0) {
          number = `+44${number}`;
        }
      }
      return number;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <p style={{ fontWeight: "bold" }}>Phone Number</p>
        <TextField
          autoFocus
          margin="dense"
          id="conferenceNumber"
          className={classes.textField}
          variant="outlined"
          label={Manager.getInstance().strings.DIALPADExternalTransferPhoneNumberPopupTitle}
          fullWidth
          value={this.state.conferenceTo}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default withTheme(withStyles(styles)(PhoneNumberField));
