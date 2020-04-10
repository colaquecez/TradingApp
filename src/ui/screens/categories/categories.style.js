import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from '../../helpers/'

const widthValor = Dimensions.get('window').width;

const styles = StyleSheet.create({

    container:{
        flex: 1 
    },

    containerAddNewProduct:{
        alignItems: 'center', 
        justifyContent: 'space-around', 
        flexDirection: 'row',
        marginBottom:fonts.smallsuper,
        marginTop:fonts.smallsuper
        
    },

    containerFlat:{
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 1, 
        position: 'absolute', 
        width: fonts.boxCategories, 
        height: fonts.imageBox, 
        opacity: 0.8 
    },

    textTitle:{
        fontSize: fonts.regular, 
        fontFamily: 'AvenirNextLTPro-Demi', 
    },

    textBox:{
        fontSize: fonts.mediumSmall, 
        color: colors.white , 
        fontWeight: 'bold', 
        fontFamily: 'AvenirNextLTPro-Demi', 
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: -1, height: 1 },                                        
        textShadowRadius: 10
    },

    left:{
        alignItems: 'flex-start',
    },

    right:{
        alignItems: 'flex-end',
    },

    image:{
        height: fonts.imageBox, 
        width: widthValor
    }

    
})

export default styles;