import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  white, 
  darkBlack,
  blue500,
  blue700,
  blueGrey100,
  blueGrey500,
  lightBlue100,
  grey300,
  lightBlack,
  purpleA200,
  pink100
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  // palette: {
  //   // primary1Color: white,
  //   // primary2Color: darkBlack,
  //   // primary3Color: darkBlack,
  //   // textColor: darkBlack,
  //   // secondaryTextColor: fade(darkBlack, 0.54),
  //   // alternateTextColor: white
  // },
  palette: {
    primary1Color: lightBlue100,
    primary2Color: blue700,
    primary3Color: lightBlack,
    accent1Color: purpleA200,
    accent2Color: blueGrey100,
    accent3Color: blueGrey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade( darkBlack, 0.3 ),
    pickerHeaderColor: blue500,
  },
  appBar: {
    height: 50,
    textColor: darkBlack
  }
});


export default muiTheme;