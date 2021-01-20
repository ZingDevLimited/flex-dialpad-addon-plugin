const sharedTheme = (theme) => ({
    root: {
      flexGrow: 1,
      height: 50,
      display: 'flex',
      flexWrap: 'wrap',
    },
    button: {
      margin: '0px'
    },
    functionButton: {
      margin: '10px',
      padding: '0px'
    },
    formControl: {
      margin: theme.spacing.unit,
      width: '250px',
    },
    boxDialpad: {
      marginTop: theme.spacing.unit * 5, 
      paddingTop: theme.spacing.unit * 5, 
      borderTop: '1px solid #eeeeee', 
      height: "300px",
      borderBottom: '1px solid #eeeeee', 
    },  
    titleAgentDialpad: {
      width: '100%',
      textTransform: 'uppercase',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: theme.spacing.unit * 4,
      fontSize: theme.typography.fontSize
    },
    subtitleDialpad: {
      marginLeft: theme.spacing.unit,
      textTransform: 'uppercase'
    },
    buttonAgentDialpad: {
      marginTop: theme.spacing.unit * 2,
      display: 'flex',
      justifyContent: 'center'
    },  
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    backspace: {
      paddingTop: '5px',
      margin: '0px'
    },
    dialPadBtn: {
      borderRadius: '100px',
      padding: '10px',
      minWidth: '0px'
    },
    selectWrapper: {
      width: "100%",
      paddingTop: "10px"
    },
    loadingWrapper: {
      textAlign: "center",
    },
    selectionLabel: {
      display: "block",
      textTransform: "uppercase",
      fontSize: "10px",
      lineHeight: 1.6,
      letterSpacing: "2px",
      marginTop: "3px",
      marginBottom: "8px",
      paddingTop: "0px",
    },
  })
  
export default sharedTheme