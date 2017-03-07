
import React, {Component} from "react";
import HeaderBar from "./../HeaderBar"
import ScheduleStore from "./../../stores/ScheduleStore";
import AuthStore from "./../../stores/AuthStore";
import ScheduleActions from "./../../actions/ScheduleActions";
import DetailsHead from "./DetailsHead";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import DetailsDescription from "./DetailsDescription";
import BackButton from "./../BackButton";


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slot: {}
        };
        this._onAuthListen = this._onAuthListen.bind(this);
        this._onListen = this._onListen.bind(this);
    }
    componentDidMount() {

        AuthStore.listen(this._onAuthListen);
        ScheduleStore.listen(this._onListen);
        ScheduleActions.getScheduleByDay(this.state.auth)

    }


    componentWillUnmount () {
        ScheduleStore.unlisten(this._onListen);
        AuthStore.unlisten(this._onAuthListen);
    }

    _onAuthListen(auth) {
        this.setState(auth.auth);
    }

    _onListen() {
        if(ScheduleStore.getState()[this.props.params.id]) {
            this.setState({
                slot: ScheduleStore.getState()[this.props.params.id]
            });
        }
        if(ScheduleStore.getState()[this.props.params.id] === undefined) {
            ScheduleActions.getScheduleSlot(this.props.params.id);
        }
    }
    onBackClick() {

    }

    render() {
        const buttonStyle = {
            width: "100%"
        };

        return (
            <div>
                <div className="stickier">
                    <HeaderBar />  
                    <BackButton />
                </div>
                <DetailsHead slot={this.state.slot}/>
                <hr />
                <DetailsDescription description={this.state.slot.Blurb} />
            </div>
        );
    }
}


export default Details;
