import React from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import { fonts,colors} from '../../../helpers'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
        justifyContent:'space-between'
    },

    containerNavigation:{
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row', 
        marginRight: 20,
        marginBottom:fonts.smallsuper,
        marginTop:fonts.smallsuper
    },


    textNavigation: {
        fontSize: fonts.regular,
        fontFamily: 'AvenirNextLTPro-Demi',
        marginTop:3
    },
    

})