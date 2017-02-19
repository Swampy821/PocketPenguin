"use strict";


import alt  from "../alt";
import PartiesActions from "../actions/PartiesActions";


class PartiesStore {
    constructor() {


        this.state = {
            parties: []
        };

        this.bindListeners({
            handleParties: PartiesActions.PARTIES_SUCCESS,
            handleSearch: PartiesActions.SEARCH
        });
    }

    componentWillMount() {

    }
    
    componentDidUpdate() {
    }


    handleParties(data) {
        data.parties.forEach((item) => {
            item.show = true;
        });
        this.setState({
            parties: data.parties
        });
    }

    handleSearch(val) {
       let parties = this.state.parties;
        parties = parties.map((party) => {
            if(
                party.Name.indexOf(val) > -1 ||
                party.Location.indexOf(val) > -1 ||
                party.Description.indexOf(val) > -1 ||
                party.Tags.indexOf(val) > -1 ||
                party.Time.indexOf(val) > -1
            ) {
                party.show = true;
            } else {
                party.show = false;
            }
            return party;
        });
        this.setState({
            parties: parties
        });
    }


}

module.exports = alt.createStore(PartiesStore, "PartiesStore");