import React, { Component } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, AsyncStorage } from 'react-native';
import styles from './intro.style'
import Swiper from "react-native-web-swiper"
import { SliderCard } from '../../components'
import { intro, introHouse, introAmbiente } from '../../images/'
import { db } from '../../../../assets/config/'
import { colors } from '../../helpers'


export default class IntroScreen extends Component {

    state = {
        isLoading: true
    }

    componentDidMount() {
        { db }
    }

    render() {

        return (

            <SafeAreaView style={styles.container}>


                <View style={styles.spaceContainer}>


                    <Swiper controlsProps={{ prevTitle: '', nextTitle: '', dotActiveStyle: { backgroundColor: colors.primary } }} >

                        <SliderCard
                            image={intro}
                            header={'Vamos começar!'}
                            body={'Um jeito viavel de adquirir objetos sem gastar!'}
                        />

                        <SliderCard
                            image={introHouse}
                            body={'Um jeito prático de encontrar um novo lar para objetos que voce não usa mais'}
                            padding={true} />

                        <SliderCard
                            image={introAmbiente}
                            body={'Reutilizar é uma forma de evitar que vá para o lixo aquilo que não é lixo.'}
                            padding={true} />

                    </Swiper>

                    <View style={styles.buttonsContainer}>

                        <TouchableOpacity style={styles.createButton} onPress={() => { this.props.navigation.navigate('CreateAccountScreen') }}  >
                            <Text style={styles.createText}>Criar uma conta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.signInButton} onPress={() => { this.props.navigation.navigate('LoginScreen') }}  >
                            <Text style={styles.signInText}>Entrar</Text>
                        </TouchableOpacity>


                    </View>
                </View>


            </SafeAreaView>
        )
    }
}