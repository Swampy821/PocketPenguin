
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

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slot: {}
        };
    }
    componentDidMount() {
        const id = this.props.params.id;
        ScheduleActions.getScheduleById(id);
        

        AuthStore.listen((auth) => {
            this.setState(auth.auth);
        });
        ScheduleStore.listen(() => {
            const StoreData = ScheduleStore.getState();
            if(StoreData.flat === undefined) {
                ScheduleActions.getScheduleByDay();
            }else{
                this.buildData(StoreData, id);
            }
        });

    }

    buildData(StoreData, id) {
        const sched = StoreData[id];
        this.setState({
            sched
        })
    }

    render() {

        return (
            <div>
                <div>
                <div className="stickier">
                    <HeaderBar />  
                    <Search />
                </div>
                <List filter={this.state.sched} goFilter={true}/>

            </div>
            </div>
        );
    }
}


export default Details;
