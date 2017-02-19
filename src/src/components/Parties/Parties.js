
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import HeaderBar from "./../HeaderBar";
import Party from "./Party";
import PartySearch from "./PartySearch";
import PartiesActions from "./../../actions/PartiesActions";
import PartiesStores from "./../../stores/PartiesStore";

const mock = [
    {
        name: "Jurassic Party!",
        description: "Come party like a dinosaur",
        image: "/assets/parties/jp.png",
        location: "Room 215",
        time: "9 pm",
        tags: [ "Friday"],
        likes: 4
    }
]



class Parties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parties: []
        };

        PartiesStores.listen((state) => {
            this.setState({
                parties: state.parties.sort(function(a, b){
                    return b.Stars>a.Stars
                })
            })
        });

        PartiesActions.getParties();

    }

    render() {

        return (
            <div>
                <div className="stickier">
                    <HeaderBar />  
                    <PartySearch />
                </div>
                {this.state.parties.map((item, index) => {
                    return <Party key={index} {...item}/>
                })}
            </div>
        );
    }
}


export default Parties;
