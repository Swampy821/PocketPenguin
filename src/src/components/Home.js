
import React, {Component} from "react";
import HeaderBar from "./HeaderBar"
import ProgramList from "./ProgramList";
import Search from "./Search";

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="sticky">
                    <HeaderBar />  
                    <Search />
                </div>
                <ProgramList />

            </div>
        );
    }
}


export default Home;
