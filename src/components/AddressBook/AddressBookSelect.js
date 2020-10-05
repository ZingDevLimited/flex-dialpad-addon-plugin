import * as React from "react";
import { withTheme, Manager } from "@twilio/flex-ui";
import addressBookService from "../../helpers/AddressBookService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "react-select";

class AddressBookSelect extends React.Component {
  mounted = false;
  state = {
    contactList: [],
    selectedContact: null,
    error: undefined,
    loading: false,
  };

  async componentDidMount() {
    this.mounted = true;
    await this.getContactList();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async getContactList() {
    this.setState({ loading: true });
    const res = await addressBookService.getAddressBookContacts(this.props.isAgeUk);
    if (!this.mounted) {
      return;
    }
    if (res.error) {
      this.setState({
        error: `error while fetching addressBook: ${res.error}`,
      });
    } else if (res.responseObj) {
      this.setState({
        contactList: res.responseObj,
      });
    } else {
      this.setState({
        error: `error while getting addressBook: no result!`,
      });
    }
    this.setState({ loading: false });
  }

  handleChange = (contact) => {
    this.setState({ selectedContact: contact });
    this.props.onNumberSelected(contact ? contact.phoneNumber : "");
  };

  formatOptionLabel = (option, metadata) => {
    return (
      <div style={{ display: "flex" }} key={option.phoneNumber}>
        <div>{option.name}</div>
        {metadata.context === "menu" ? (
          <div style={{ marginLeft: "10px", color: "#ccc" }}>
            {option.phoneNumber}
          </div>
        ) : null}
      </div>
    );
  };

  customFilter = (option, searchText) => {
    if (
      option.data.name.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.phoneNumber.includes(searchText)
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div>
        {this.state.error ? (
          <p>{this.state.error}. please refresh the page to try again.</p>
        ) : this.state.loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <p style={{ fontWeight: "bold" }}>
              {this.props.isAgeUk
                ? Manager.getInstance().strings.AddressBookAgeUKLocalBranches
                : Manager.getInstance().strings.AddressBookLocalAddressBook}
            </p>

            <Select
              formatOptionLabel={this.formatOptionLabel}
              options={this.state.contactList}
              onChange={this.handleChange}
              value={this.state.selectedContact}
              isSearchable={true}
              isClearable={true}
              name="addressBook"
              filterOption={this.customFilter}
              noOptionsMessage={() =>
                Manager.getInstance().strings.AddressBookNoOptionsMessage
              }
              getOptionValue={(option) => option["phoneNumber"]}
              placeholder={
                Manager.getInstance().strings
                  .AddressBookSelectPhoneNumberPlaceholder
              }
            />
          </>
        )}
      </div>
    );
  }
}

export default withTheme(AddressBookSelect);
