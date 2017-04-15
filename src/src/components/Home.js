
import React, {Component} from "react";
import HeaderBar from "./HeaderBar"
import ProgramList from "./ProgramList";
import Search from "./Search";
import Cookie from 'react-cookie';

class Home extends Component {
    constructor(props) {
        super(props);
    }


    handleScroll() {
        if(window.scrollY) {
            Cookie.save("lastScrollY", window.scrollY, { path: '/' });
        }
    }
    componentWillMount() {
        window.removeEventListener("scroll", this.handleScroll, false);
        window.addEventListener("scroll", this.handleScroll, false);
    }

    componentDidMount() {
        const lastScroll = Cookie.load("lastScrollY");
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
