import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white, darkBlack} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: white,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white
  },
  appBar: {
    height: 50,
    textColor: darkBlack
  }
});


export default muiTheme;