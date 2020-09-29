import React from "react";
import AddressBookLauncher from "../AddressBook/AddressBookLauncher";

export const loadAddressBookInterface = (flex, manager) => {
  var translationStrings = {
		AddressBookAgeUKLocalBranches: "Age UK Local Branches",
		AddressBookLocalAddressBook: "Address Book",
		AddressBookSelectPhoneNumberPlaceholder: "Select Phone Number",
		AddressBookNoOptionsMessage: "No contacts available.",
		AddressBookOfflineText: "To make a call using Address Book, please change your status from 'Offline'"
	  }
  
	//add translationStrings into manager.strings, preserving anything thats already there - this allows language to be updated outside of updating this plugin
	manager.strings = { ...translationStrings, ...manager.strings }

  flex.MainHeader.Content.add(
    <AddressBookLauncher key="sidebar-addressBook-button" />,
    {
      align: "end",
      sortOrder: -1,
    }
  );
};
