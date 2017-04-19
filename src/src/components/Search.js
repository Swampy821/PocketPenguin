
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SearchIcon from "material-ui/svg-icons/action/search";
import ScheduleActions from "./../actions/ScheduleActions";
import debounce from "debounce";
import Cookie from "react-cookie";

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

class Search extends Component {
    constructor(props) {
        super(props);
        
    }
    componentWillMount() {
        this.updateField();
    }
    componentDidMount() {
        this.updateField();
    }

    updateField() {
        const val = Cookie.load("search");
        if (val) {
            setTimeout(() => {
                document.getElementById("searchId").value = val;
                ScheduleActions.search(val);
            });
        }
    }

    onChange(e, val) {
        ScheduleActions.search(val);
        Cookie.save("search", val);
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Paper style={style} zDepth={1} >
                    <SearchIcon style={searchStyle}/>
                    <TextField style={textStyle}
                        id="searchId"
                        onChange={debounce(this.onChange.bind(this), 200)}
                    />
                </Paper>
            </MuiThemeProvider>
        );
    }
}


export default Search;
