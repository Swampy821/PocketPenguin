
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './../styles/style';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';

const style = {
    textAlign: 'center',
    paddingTop: "2px"
};

const searchStyle = {
    marginRight: "9px",
    top: "6px",
    position: "relative"
};

const textStyle = {
    width: "80%"
};

class ProgramList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Paper style={style} zDepth={2} >
                    <SearchIcon style={searchStyle}/>
                    <TextField style={textStyle}
                        hintText="Enter Program Name"
                    />
                </Paper>
            </MuiThemeProvider>
        );
    }
}


export default ProgramList;
