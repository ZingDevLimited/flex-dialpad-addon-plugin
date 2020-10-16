import * as React from 'react';
import { connect } from 'react-redux';
import { Actions, withTheme, Manager, withTaskContext } from '@twilio/flex-ui';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ConferenceService from '../../helpers/ConferenceService';
import AddressBookSelect from '../AddressBook/AddressBookSelect';
import PhoneNumberField from './PhoneNumberField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  label: {
    fontSize: `16px`,
  },
});

class ConferenceDialog extends React.Component {
  state = {
    conferenceTo: '',
    radioSelection: 'phoneNumber',
  }

  handleClose = () => {
    this.closeDialog();
  }

  closeDialog = () => {
    Actions.invokeAction('SetComponentState', {
      name: 'ConferenceDialog',
      state: { isOpen: false }
    });
  }

  handleRadioChange = event => {
    this.setState({ radioSelection: event.target.value });
  };

  handleDialButton = () => {
    this.addConferenceParticipant();
    this.closeDialog();
  }

  addConferenceParticipant = async () => {
    const to = this.state.conferenceTo;

    const { task } = this.props;
    const conference = task && (task.conference || {});
    const { conferenceSid } = conference;

    const mainConferenceSid = task.attributes.conference ? 
      task.attributes.conference.sid : conferenceSid;

    let from;
    if (this.props.phoneNumber) {
      from = this.props.phoneNumber
    } else {
      from = Manager.getInstance().serviceConfiguration.outbound_call_flows.default.caller_id;
    }

    // Adding entered number to the conference
    console.log(`Adding ${to} to conference`);
    let participantCallSid;
    try {

      participantCallSid = await ConferenceService.addParticipant(mainConferenceSid, from, to);
      ConferenceService.addConnectingParticipant(mainConferenceSid, participantCallSid, 'unknown');

    } catch (error) {
      console.error('Error adding conference participant:', error);
    }
    this.setState({ conferenceTo: '' });
  }
  
  async onNumberSelected(phoneNumber) {
    if(phoneNumber){
      await this.setState({conferenceTo :phoneNumber});
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen || false}
        onClose={this.handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <DialogContentText>
            {Manager.getInstance().strings.DIALPADExternalTransferPopupHeader}
          </DialogContentText>
          <Grid container>
            <Grid item xs={6}>
              <FormControl component="fieldset">
              <RadioGroup
                aria-label="Call Transfer"
                name="transfer"
                value={this.state.radioSelection}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel value="phoneNumber" control={<Radio />} label="Phone Number" key="phoneNumber" />
                <FormControlLabel value="localDirectory" control={<Radio />} label="Age UK Local Branches" key="localDirectory" />
                <FormControlLabel value="addressBook" control={<Radio />} label="Address Book" key="addressBook" />
              </RadioGroup>
            </FormControl>
            </Grid>
            <Grid item xs={6}>
              {
                this.state.radioSelection === "phoneNumber" && (
                  <PhoneNumberField 
                    key="phoneNumber" 
                    onNumberSelected={(e) => this.onNumberSelected(e)} 
                  />
                )
              }
              {
                this.state.radioSelection === "localDirectory" && (
                  <AddressBookSelect
                    key="addressBookSelect-local"
                    isAgeUk={true}
                    onNumberSelected={(e) => this.onNumberSelected(e)} 
                  />
                )
              }
              {
                this.state.radioSelection === "addressBook" && (
                  <AddressBookSelect
                    key="addressBookSelect"
                    isAgeUk={false}
                    onNumberSelected={(e) => this.onNumberSelected(e)} 
                  />
                )
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleDialButton}
            color="primary"
          >
            {Manager.getInstance().strings.DIALPADExternalTransferPhoneNumberPopupDial}
          </Button>
          <Button
            onClick={this.closeDialog}
            color="secondary"
          >
            {Manager.getInstance().strings.DIALPADExternalTransferPhoneNumberPopupCancel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  const componentViewStates = state.flex.view.componentViewStates;
  const conferenceDialogState = componentViewStates && componentViewStates.ConferenceDialog;
  const isOpen = conferenceDialogState && conferenceDialogState.isOpen;
  return {
    isOpen,
    phoneNumber: state.flex.worker.attributes.phone
  };
};

export default connect(mapStateToProps)(withTheme(withTaskContext(withStyles(styles)(ConferenceDialog))));
