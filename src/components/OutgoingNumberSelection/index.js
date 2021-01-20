import React from "react";
import OutgoingNumberSelect from "./OutgoingNumberSelect.js";

export const loadOutgoingNumberSelectionInterface = (flex, manager) => {
  var translationStrings = {
    OutgoingNumberSelectionLabel: "From",
    OutgoingNumberSelectionNoOptionsMessage: "No phone numbers available.",
    OutgoingNumberSelectionPlaceholder: "Select From Number",
  }

  //add translationStrings into manager.strings, preserving anything thats already there - this allows language to be updated outside of updating this plugin
  manager.strings = { ...translationStrings, ...manager.strings }

  flex.OutboundDialerPanel.Content.add(
    <OutgoingNumberSelect key="outgoing-number-select"/>,
    {
      sortOrder: -1,
    }
  );
};

