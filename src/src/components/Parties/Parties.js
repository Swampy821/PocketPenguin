
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import HeaderBar from "./../HeaderBar";
import Party from "./Party";
import PartySearch from "./PartySearch";

const mock = [
    {
        name: "Jurassic Party!",
        description: "Come party like a dinosaur",
        image: "/assets/parties/jp.png",
        tags: [ "loud", "dance", "carnivorous" ],
        likes: 4,
        createdBy: 34234234242
    }
]



class Parties extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="stickier">
                    <HeaderBar />  
                    <PartySearch />
                </div>
                {mock.map((item, index) => {
                    return <Party key={index} {...item}/>
                })}
            </div>
        );
    }
}


export default Parties;
