import * as React from "react";
import { connect } from "react-redux";
import { IconButton, Icon, Manager, Actions } from "@twilio/flex-ui";
import AddressBookSelectDial from "../AddressBook/AddressBookSelectDial";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  addressBookSidePanel: {
    display: "flex",
    position: "fixed",
    height: "100%",
    right: "0px",
    zIndex: "12",
    marginTop: "45px",
  },
  addressBookSidePanelContainer: {
    display: "flex",
    flexDirection: "column",
    flexShrink: "0",
    webkitBoxFlex: "1",
    flexGrow: "1",
    width: "276px",
  },
  addressBookSidePanelBody: {
    color: "rgb(34, 34, 34)",
    display: "flex",
    flexWrap: "nowrap",
    flexGrow: "1",
    flexShrink: "0",
    flexDirection: "column",
    borderWidth: "0px 0px 0px 1px",
    borderStyle: "solid",
    background: "rgb(255, 255, 255)",
    borderColor: "rgb(204, 204, 204)",
  },
  addressBookSidePanelHeader: {
    height: "44px",
    paddingLeft: "11px",
    paddingRight: "11px",
    webkitBoxAlign: "center",
    alignItems: "center",
    color: "rgb(34, 34, 34)",
    display: "flex",
    flexWrap: "nowrap",
    flexGrow: "0",
    flexShrink: "0",
    flexDirection: "row",
    borderColor: "rgb(204, 204, 204)",
    background: "rgb(255, 255, 255)",
  },
  addressBookSidePanelHeaderTitle: {
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "bold",
    display: "flex",
    flexWrap: "nowrap",
    flexShrink: "1",
    flexGrow: "1",
    textTransform: "uppercase",
    letterSpacing: "3px",
    flexDirection: "row",
    justifyContent: "center",
  },
  addressBookSidePanelOffline: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "276px",
    boxSizing: "border-box",
    flexGrow: "1",
    textAlign: "center",
    padding: "0px 11px 80px",
  },
  addressBookSidePanelAvailable: {
    display: "flex",
    flexDirection: "column",
    width: "276px",
    boxSizing: "border-box",
    flexGrow: "1",
    padding: "0px 11px 80px",
  },
  addressBookOfflineInfo: {
    borderStyle: "solid",
    borderWidth: "1px",
    marginBottom: "5px",
    borderRadius: "50%",
  },
});

class AddressBookDialog extends React.Component {
  onPhoneNumberDial = (phoneNumber) => {
    if (phoneNumber) {
      Actions.invokeAction("StartOutboundCall", {
        destination: phoneNumber,
      });
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        {this.props.isOpen && (
          <div className={classes.addressBookSidePanel}>
            <div className={classes.addressBookSidePanelContainer}>
              <div className={classes.addressBookSidePanelBody}>
                <div className={classes.addressBookSidePanelHeader}>
                  <IconButton
                    icon="Close"
                    onClick={this.props.closeAddressBook}
                    title="close"
                  />
                  <div className={classes.addressBookSidePanelHeaderTitle}>
                    <span>Address Book</span>
                  </div>
                </div>
                {this.props.workerActivity === "Offline" ? (
                  <div className={classes.addressBookSidePanelOffline}>
                    <Icon
                      icon="InfoBold"
                      className={classes.addressBookOfflineInfo}
                    />
                    <span>
                      {Manager.getInstance().strings.AddressBookOfflineText}
                    </span>
                  </div>
                ) : (
                  <div className={classes.addressBookSidePanelAvailable}>
                    <AddressBookSelectDial
                      key="addressBookSelectDial-ageUKLocal"
                      isAgeUk={true}
                      onPhoneNumberDial={this.onPhoneNumberDial}
                    ></AddressBookSelectDial>
                    <AddressBookSelectDial
                      key="addressBookSelectDial-addressBook"
                      isAgeUk={false}
                      onPhoneNumberDial={this.onPhoneNumberDial}
                    ></AddressBookSelectDial>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workerActivity: state.flex.worker.activity.name,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(AddressBookDialog));
