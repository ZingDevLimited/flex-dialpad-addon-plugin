import * as React from "react";
import { IconButton } from "@twilio/flex-ui";
import AddressBookDialog from "../AddressBook/AddressBookDialog";

export default class AddressBookLauncher extends React.Component {
  state = {
    isOpen: false,
  };

  openAddressBook = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closeAddressBook = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <>
        <IconButton
          icon={this.state.isOpen ? "DirectoryBold" : "Directory"}
          onClick={() => this.openAddressBook()}
        />
        <AddressBookDialog
          key={`address-book-icon-${this.state.isOpen}`}
          isOpen={this.state.isOpen}
          openAddressBook={this.openAddressBook}
          closeAddressBook={this.closeAddressBook}
        />
      </>
    );
  }
}
