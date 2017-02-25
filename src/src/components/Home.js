
import React, {Component} from "react";
import HeaderBar from "./HeaderBar"
import ProgramList from "./ProgramList";
import Search from "./Search";

class Home extends Component {
    constructor(props) {
        super(props);
    }


    handleScroll() {
        if(window.scrollY) {
            localStorage.setItem("lastScrollY", window.scrollY);
        }
    }
    componentWillMount() {
        window.removeEventListener("scroll", this.handleScroll, false);
        window.addEventListener("scroll", this.handleScroll, false);
    }

    componentDidMount() {
        const lastScroll = localStorage.getItem("lastScrollY");
        setTimeout(() => {
            window.scroll(0, lastScroll);
        },5);
    }

    render() {
        return (
            <div>
                <div className="stickier">
                    <HeaderBar />  
                    <Search />
                </div>
                <ProgramList />

            </div>
        );
    }
}


export default Home;
