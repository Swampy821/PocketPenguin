
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

const style = {
    marginTop: "30px"
};


class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slot: {}
        };
        this._scheduleStoreListen = this._scheduleStoreListen.bind(this);
    }
    componentDidMount() {
        const id = this.props.params.id;
        let savedStoreData = ScheduleStore.getState();
        if(savedStoreData.flat) {
            this.buildData(savedStoreData);
        }
        
        this.setState({
            id
        });
        ScheduleActions.getScheduleById(id);
        

        AuthStore.listen((auth) => {
            this.setState(auth.auth);
        });
        ScheduleStore.listen(this._scheduleStoreListen);

    }
    componentWillUnmount () {
        ScheduleStore.unlisten(this._scheduleStoreListen);
    }

    _scheduleStoreListen() {
            const StoreData = ScheduleStore.getState();
            if(StoreData.flat === undefined) {
                ScheduleActions.getScheduleByDay();
            }else{
                this.buildData(StoreData, this.state.id);
            }
    }

    buildData(StoreData, id) {
        const sched = StoreData[id];
        this.setState({
            sched
        })
    }

    render() {
        return (
            <div style={style}>
                <div>
                <div className="stickier">
                    <HeaderBar />  
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
