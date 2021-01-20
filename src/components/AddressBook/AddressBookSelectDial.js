import * as React from "react";
import { IconButton } from "@twilio/flex-ui";
import AddressBookSelect from "../AddressBook/AddressBookSelect";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  addressBookSelectContent: {
    marginTop: "15px",
  },
  dialButtonContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    flexGrow: "1",
    textAlign: "center",
  },
  dialButton: {
    backgroundColor: "rgb(25, 118, 210)",
    width: "40px",
    height: "40px",
    alignSelf: "center",
    color: "rgb(255, 255, 255)",
    outline: "none",
    borderRadius: " 100px",
    padding: "8px",
    marginTop: "20px",
    "&:hover": {
      backgroundImage: "linear-gradient(to top, rgb(25, 118, 210), rgb(25, 118, 210))",
    },
  },
});

class AddressBookSelectDial extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPhoneNumber: "",
      isPhoneNumberSelected: false,
    };
  }

  onNumberSelected = (phoneNumber) => {
    this.setState({
      selectedPhoneNumber: phoneNumber,
      isPhoneNumberSelected: phoneNumber ? true : false,
    });
  };

  onPhoneNumberDial = () => {
    this.props.onPhoneNumberDial(this.state.selectedPhoneNumber);
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.addressBookSelectContent}>
        <AddressBookSelect
          isAgeUk={this.props.isAgeUk}
          onNumberSelected={this.onNumberSelected}
        ></AddressBookSelect>

        <div className={classes.dialButtonContent}>
          <IconButton
            className={classes.dialButton}
            icon="Call"
            disabled={!this.state.isPhoneNumberSelected}
            title="Call"
            onClick={() => this.onPhoneNumberDial()}
          ></IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddressBookSelectDial);
