
import React, {Component} from "react";
import HeaderBar from "./../HeaderBar"
import ScheduleStore from "./../../stores/ScheduleStore";
import AuthStore from "./../../stores/AuthStore";
import ScheduleActions from "./../../actions/ScheduleActions";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import List from "./../List";
import Search from "./../Search";
import AuthActions from "./../../actions/AuthActions";

const style = {
    marginTop: "30px"
};


class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slot: {}
        };
        this.scheduleStoreListen = this._scheduleStoreListen.bind(this);
    }
    componentDidMount() {
        const id = this.props.params.id;
        this.setState({
            id
        });
        ScheduleActions.getScheduleById(id);
        AuthActions.getInfo(id);

        AuthStore.listen((auth) => {
            this.setState(auth.auth);
        });
        ScheduleStore.listen(this.scheduleStoreListen);

    }
    componentWillUnmount () {
        ScheduleStore.unlisten(this.scheduleStoreListen);
    }

    _scheduleStoreListen() {
            const StoreData = ScheduleStore.getState();
            if(StoreData.flat === undefined) {
                ScheduleActions.getScheduleByDay();
            }else{
                this.buildData(StoreData, this.state.id);
            }
            if (StoreData.myCalDataPulled) {
                this.setState({
                    myCalInfo: StoreData.myCalData
                });
            }
    }

    buildData(StoreData, id) {
        const sched = StoreData[id];
        this.setState({
            sched
        })
    }

    getTitle() {
        if (this.state.myCalInfo) {
            return `${this.state.myCalInfo.name}'s Pocket Penguin`;
        }
        return false;
    }

    render() {
        return (
            <div style={style}>
                <div>
                <div className="stickier">
                    <HeaderBar title={this.getTitle()}/>  
                    <Search />
                </div>
                {this.state.sched && this.state.sched.length ? 
                <List filter={this.state.sched} goFilter={true} calID={this.props.params.id}/> : "" 
                }

            </div>
            </div>
        );
    }
}


export default MyCalendar;
