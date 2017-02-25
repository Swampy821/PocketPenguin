
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


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slot: {}
        };
    }
    componentDidMount() {

        AuthStore.listen((auth) => {
            this.setState(auth.auth);
        });
        ScheduleStore.listen(() => {
            if(ScheduleStore.getState()[this.props.params.id]) {
                this.setState({
                    slot: ScheduleStore.getState()[this.props.params.id]
                });
            }
            if(ScheduleStore.getState()[this.props.params.id] === undefined) {
                ScheduleActions.getScheduleSlot(this.props.params.id);
            }
            
        });
        ScheduleActions.getScheduleByDay(this.state.auth)
        // ScheduleActions.getScheduleSlot(this.props.params.id);

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
                </div>
                <DetailsHead slot={this.state.slot}/>
                <hr />
                <DetailsDescription description={this.state.slot.Blurb} />
            </div>
        );
    }
}


export default Details;
