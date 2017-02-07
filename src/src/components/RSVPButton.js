
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import RoomIcon from "material-ui/svg-icons/action/room";
import FlatButton from "material-ui/FlatButton";
import StarIconEmpty from "material-ui/svg-icons/toggle/star-border";
import StarIcon from "material-ui/svg-icons/toggle/star";

const iconStyle = {
    height: "15px"
};

class RSVPButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rsvp: this.props.rsvp
        };
        this.buttonStyle = {
            float: "left"
        };
       
    }
    componentWillMount(){
    }
    onClick() {
        this.setState({
            rsvp: !this.state.rsvp
        });
    }
    render() {
        if(!this.state.rsvp) {
            this.buttonStyle.color = "black";
        } else {
            this.buttonStyle.color = "blue";
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <FlatButton
                    style={this.buttonStyle}
                    onClick={this.onClick.bind(this)}
                    label="RSVP"
                    icon={this.state.rsvp ? <StarIcon /> : <StarIconEmpty  />}
                    />
            </MuiThemeProvider>
        );
    }
}


export default RSVPButton;
