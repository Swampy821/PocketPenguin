
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import RoomIcon from "material-ui/svg-icons/action/room";
import FlatButton from "material-ui/FlatButton";
import StarIconEmpty from "material-ui/svg-icons/toggle/star-border";
import StarIcon from "material-ui/svg-icons/toggle/star";
import AuthStore from "./../stores/AuthStore";
import AuthActions from "./../actions/AuthActions";

const iconStyle = {
    height: "15px"
};

class RSVPButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rsvp: this.props.rsvp,
            show: true
        };
        this.buttonStyle = {
            float: "left"
        };

        if(this.props.style) {
            this.buttonStyle = Object.assign(this.buttonStyle, this.props.style);
        }
        this._authListen = this._authListen.bind(this);
       
    }
    componentWillMount(){
        const firstAuth = AuthStore.getState();
        this.setAuthStatus(firstAuth.auth);
        this.setState({
            auth: firstAuth.auth
        });
        AuthStore.listen(this._authListen);
    }

    componentWillUnmount () {
        AuthStore.unlisten(this._authListen);
    }

    _authListen() {
        const auth = AuthStore.getState()
        this.setAuthStatus(auth.auth);
        this.setState({
            auth: auth.auth
        });
    }

    getRSVPStatus() {
        const id = this.props.id;
        if(this.state.auth.SavedScheduleObj) {
            return this.state.auth.SavedScheduleObj[id];
        }else{
            return false;
        }
    }

    setAuthStatus(auth) {
        this.setState({
            show: auth.ID ? true : false
        });
    }

    onClick() {
        AuthActions.updateRSVP(this.props.id, this.state.auth.JWT, !this.getRSVPStatus());
    }
    render() {
        if(!this.getRSVPStatus()) {
            this.buttonStyle.color = "black";
        } else {
            this.buttonStyle.color = "#0288D1";
        }
        if(this.state.show) {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <FlatButton
                        style={this.buttonStyle}
                        onTouchTap={this.onClick.bind(this)}
                        label="RSVP"
                        icon={this.getRSVPStatus() ? <StarIcon /> : <StarIconEmpty  />}
                        />
                </MuiThemeProvider>
            );
        }else{
            return <div />;
        }
    }
}


export default RSVPButton;
