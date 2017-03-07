
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {white, indigo500} from 'material-ui/styles/colors';
import StarIconEmpty from "material-ui/svg-icons/toggle/star-border";
import StarIcon from "material-ui/svg-icons/toggle/star";
import Chip from "material-ui/Chip";
import RoomIcon from "material-ui/svg-icons/action/room";
import ScheduleIcon from "material-ui/svg-icons/action/schedule";
import PartiesActions from "./../../actions/PartiesActions";
import renderHTML from 'react-render-html';


const chipStyle = {
    float: "left",
    marginLeft: "5px"
};


class Party extends Component {
    constructor(props) {
        super(props);

        this.state = {
            star: this.props.Star,
            Stars: this.props.Stars,
            Chips: this.props.Tags,
            show: this.props.show
        };
    }


    onClick() {
        let likes = this.state.likes;
        if(!this.state.star) {
            likes++;
        } else {
            likes--;
        }
        PartiesActions.starParty(this.props.id);
        this.setState({
            star: !this.state.star,
            likes: likes
        });
    }

    render() {
        if(!this.props.show) {
            return <span></span>;
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="slot party-slot"> 
                    {this.props.Image ? 
                        <div className="party-image">
                            <img src={this.props.Image} />
                        </div> : ""
                    }
                    <div className="slot-title">
                        {this.props.Name}
                    </div>
                    
                    <div className="slot-description">
                        {renderHTML(this.props.Description)}
                    </div>
                    <div className="slot-chips">
                        {this.state.Chips.map((item, index) => {
                            return <Chip key={index} style={chipStyle}>{item}</Chip>
                        })}
                    </div>
                    <div className="slot-party-location">
                        <RoomIcon style={{marginBottom: "-8px"}}/> {this.props.Location}<br />
                        <ScheduleIcon style={{marginBottom: "-8px", marginTop: "8px"}}/>   {this.props.Time}
                    </div>
                    <div className="slot-likes">
                        {this.props.Stars} Stars
                    </div>
                    <div className="slot-like-button">
                        <FloatingActionButton backgroundColor={indigo500} mini={true} onClick={this.onClick.bind(this)}>
                            {this.props.Star ? <StarIcon /> : <StarIconEmpty />}
                        </FloatingActionButton>
                    </div>


                </div>
            </MuiThemeProvider>
        );
    }
}


export default Party;
