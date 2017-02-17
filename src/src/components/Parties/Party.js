
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {white, indigo500} from 'material-ui/styles/colors';
import StarIconEmpty from "material-ui/svg-icons/toggle/star-border";
import StarIcon from "material-ui/svg-icons/toggle/star";
import Chip from "material-ui/Chip";


const chipStyle = {
    float: "left"
};

class Party extends Component {
    constructor(props) {
        super(props);

        this.state = {
            star: false,
            likes: 5,
            chips: [
                "Party",
                "Dinosaurs"
            ],
            show: true
        };
    }


    onClick() {
        let likes = this.state.likes;
        if(!this.state.star) {
            likes++;
        } else {
            likes--;
        }
        this.setState({
            star: !this.state.star,
            likes: likes
        });
    }

    render() {
        if(!this.state.show) {
            return <span></span>;
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="slot party-slot"> 
                    <div className="party-image">
                        <img src={this.props.image} />
                    </div>
                    <div className="slot-title">
                        {this.props.name}
                    </div>
                    
                    <div className="slot-description">
                        {this.props.description}
                    </div>
                    <div className="slot-chips">
                        {this.state.chips.map((item, index) => {
                            return <Chip key={index} style={chipStyle}>{item}</Chip>
                        })}
                    </div>
                    <div className="slot-likes">
                        {this.state.likes} Stars
                    </div>
                    <div className="slot-like-button">
                        <FloatingActionButton backgroundColor={indigo500} mini={true} onClick={this.onClick.bind(this)}>
                            {this.state.star ? <StarIcon /> : <StarIconEmpty />}
                        </FloatingActionButton>
                    </div>


                </div>
            </MuiThemeProvider>
        );
    }
}


export default Party;
