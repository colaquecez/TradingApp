import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './menu-bar.style'
import { fonts, colors } from '../../helpers'

export const MenuBar = ({

    location,
    state

}) => (
        <View style={styles.container}>

            {/* <TouchableHighlight underlayColor={null} onPress={() => { }}>
                <View style={styles.menu}>
                    <Text style={styles.fontFamily}> <Icon size={fonts.bigger} name={'language'} color={'#BEBFC1'} ></Icon></Text>
                    <Text style={styles.fontFamily}>Anuncios</Text>
                </View>
            </TouchableHighlight> */}

            <TouchableHighlight underlayColor={null} onPress={() => { location('TopAdvertisementScreen') }}>
                <View style={styles.menu}>
                    <Text style={styles.fontFamily}> <Icon size={fonts.bigger} name={'show-chart'} color={state === 'TopAdvertisementScreen'? colors.primary :'#BEBFC1' } ></Icon></Text>
                    {/* <Text style={styles.fontFamily}>Em Alta</Text> */}
                </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor={null} onPress={() => { location('CategoriesScreen') }}>
                <View style={styles.menu}>
                    <Text style={styles.fontFamily}> <Icon size={fonts.bigger} name={'map'} color={state === 'CategoriesScreen' || state === 'CategoriesFilterScreen' ? colors.primary : '#BEBFC1'} ></Icon>
                    </Text>
                    {/* <Text style={styles.fontFamily}>Explorar</Text> */}
                </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor={null} onPress={() => { location('ChatGroupScreen') }}>
            <View style={styles.menu}>
                <Text style={styles.fontFamily}> <Icon name={'chat'} color={state === 'ChatGroupScreen' ? colors.primary: '#BEBFC1'} size={fonts.bigger} /></Text>
                {/* <Text style={styles.fontFamily}>Mensagens</Text> */}
            </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor={null} onPress={() => { location('PerfilScreen') }}>
                <View style={styles.menu}>
                    <Text style={styles.fontFamily}> <Icon size={fonts.bigger} name={'person'} color={state === 'PerfilScreen' ? colors.primary : '#BEBFC1'} ></Icon>
                    </Text>
                    {/* <Text style={styles.fontFamily}>Perfil</Text> */}
                </View>
            </TouchableHighlight>


        </View>
    )