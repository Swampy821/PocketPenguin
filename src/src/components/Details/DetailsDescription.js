
import React, {Component} from "react";

class DetailsDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="description-wrapper">
                <div className="description-head">Description</div>
                <div className="description-text">{this.props.description}</div>

            </div>
        )
    }
}


export default DetailsDescription;
