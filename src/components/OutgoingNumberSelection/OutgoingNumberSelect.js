import * as React from "react";
import { Manager } from "@twilio/flex-ui";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "react-select";
import { connect } from 'react-redux';
import { Actions } from '../../states/OutgoingNumberState';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import flexService from "../../helpers/FlexService";
import sharedTheme from '../../styling/theme.js';

const styles = theme => (sharedTheme(theme));

class OutgoingNumberSelect extends React.Component {
  mounted = false;

  async componentDidMount() {
    this.mounted = true;
    if (!this.props.isFetched) {
      await this.getOutgoingNumberList();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async getOutgoingNumberList() {
    try {
      this.props.setLoading(true);
      const res = await flexService.getOutgoingNumbers();
      if (!this.mounted) {
        return;
      }
      if (res.error) {
        this.props.setError(
          `error while fetching outgoing numbers: ${res.error}`
        );
      } else if (res.responseObj) {
        this.props.setOutgoingNumbers(res.responseObj);
        if (res.responseObj?.length) {
          this.props.setSelectedOutgoingNumber(res.responseObj[0]);
        }
        this.props.setFetched();
      } else {
        this.props.setError(
          "error while getting outgoing numbers: no result!"
        );
      }
    } catch (err) {
      this.props.setError(
        `error while fetching outgoing numbers: ${err}`
      );
    } finally {
      this.props.setLoading(false);
    }
  }

  handleChange = (outgoingNumber) => {
    this.props.setSelectedOutgoingNumber(outgoingNumber);
  };

  formatOptionLabel = (option, metadata) => {
    return (
      <div style={{ display: "flex" }} key={option.phoneNumber}>
        <div>{option.friendlyName}</div>
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
      option.data.friendlyName.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.phoneNumber.includes(searchText)
    ) {
      return true;
    } else {
      return false;
    }
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.selectWrapper}>
        {this.props.error ? (
          <p>{this.props.error}. please refresh the page to try again.</p>
        ) : this.props.loading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress />
          </div>
        ) : (
              <>
                {
                  this.props.outgoingNumbers?.length > 1 && (
                    <>
                      <p className={classes.selectionLabel}>
                        {Manager.getInstance().strings.OutgoingNumberSelectionLabel}
                      </p>

                      <Select
                        formatOptionLabel={this.formatOptionLabel}
                        options={this.props.outgoingNumbers}
                        onChange={this.handleChange}
                        value={this.props.selectedOutgoingNumber}
                        isSearchable={true}
                        name="outgoingNumberSelection"
                        filterOption={this.customFilter}
                        getOptionValue={(option) => option["phoneNumber"]}
                        noOptionsMessage={() => Manager.getInstance().strings.OutgoingNumberSelectionNoOptionsMessage}
                        placeholder={Manager.getInstance().strings.OutgoingNumberSelectionPlaceholder}
                      />
                    </>
                  )
                }
              </>
            )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    outgoingNumbers: state.dialpad.outgoingNumber.outgoingNumbers,
    selectedOutgoingNumber: state.dialpad.outgoingNumber.selectedOutgoingNumber,
    isFetched: state.dialpad.outgoingNumber.isFetched,
    error: state.dialpad.outgoingNumber.error,
    loading: state.dialpad.outgoingNumber.loading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setOutgoingNumbers: bindActionCreators(
      Actions.setOutgoingNumbers,
      dispatch
    ),
    setSelectedOutgoingNumber: bindActionCreators(
      Actions.setSelectedOutgoingNumber,
      dispatch
    ),
    setFetched: bindActionCreators(
      Actions.setFetched,
      dispatch
    ),
    setError: bindActionCreators(
      Actions.setError,
      dispatch
    ),
    setLoading: bindActionCreators(
      Actions.setLoading,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OutgoingNumberSelect));