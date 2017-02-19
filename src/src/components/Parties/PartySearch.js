
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SearchIcon from "material-ui/svg-icons/action/search";
import PartiesActions from "./../../actions/PartiesActions";

const style = {
    textAlign: "center",
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

class PartySearch extends Component {
    constructor(props) {
        super(props);
    }
    onChange(e, val) {
        PartiesActions.search(val);
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Paper style={style} zDepth={1} >
                    <SearchIcon style={searchStyle}/>
                    <TextField style={textStyle}
                        hintText="Search Party"
                        onChange={this.onChange.bind(this)}
                    />
                </Paper>
            </MuiThemeProvider>
        );
    }
}


export default PartySearch;
