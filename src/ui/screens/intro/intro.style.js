import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from '../../helpers'

const styles = StyleSheet.create({ 

    container: {
        flex: 1, 
        backgroundColor: colors.greyBackground,
        padding:10,
    },

    backGround:{
      backgroundColor: colors.greyBackground
    },

    spaceContainer:{
        flex: 1, 
        padding:10,
    },

    buttonsContainer: {

        // marginBottom: 20,
        padding:9,
    },

    slidesContainer: {
        flex:1,
        alignItems: "center",
        padding: 20,
    },

    signInButton:{
        backgroundColor: 'transparent', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 3
    },

    signInText:{
        fontSize: fonts.regular, 
        color: colors.primary, 
        fontFamily: 'AvenirNextLTPro-Demi'
    },

    createButton:{
        backgroundColor: colors.primary, 
        marginBottom: 20, 
        height: fonts.buttonHeight, 
        // borderRadius: fonts.smallsuper, 
        justifyContent: 'center', 
        alignItems: 'center' ,
    },

    createText:{
        marginTop:fonts.smallest,
        fontSize: fonts.regular, 
        color: 'white', 
        fontFamily: 'AvenirNextLTPro-Demi',  
    }


})

export default styles;