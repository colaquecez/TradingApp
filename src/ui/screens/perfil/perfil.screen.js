import React, { Component } from 'react'
import { View, Text, Image, Dimensions, SafeAreaView, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native'
import { MenuBar } from '../../components'
import Icons from 'react-native-vector-icons/MaterialIcons'
import firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation'
import styles from './perfil.style'
import { fonts } from '../../helpers'

export default class Perfil extends Component {

    state = {
        notificacao: true,
        user: {
            nome: null,
        },
    }

    logoff() {
        firebase.auth().signOut()

        .then(async () => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'IntroScreen' })],
            });
            this.props.navigation.dispatch(resetAction);

            })
   
            .catch((error) => {
                alert('Houve um erro, por favor tente novamente')
            })
    }

    renderCard = (name, text, color, press) => (

        <TouchableOpacity onPress={()=>this.props.navigation.navigate(`${press}`)}>
            <View style={styles.containerNotifications}>

                <View style={[{ backgroundColor: color }, styles.containerBorder]}>
                    <Icons name={name} size={fonts.medium} color={'white'} />
                </View>

                <View >
                    <Text style={styles.textNotifications}>{text}</Text>
                </View>

                <View style={styles.switchContainer}>
                    <Icons name={'chevron-right'} size={fonts.mediumSmall} color={'#D6D6D6'} />
                </View>
            </View>

        </TouchableOpacity>

    )

    render() {
        return (

            <SafeAreaView style={styles.safeAreaView}>

                <View style={styles.containerColor}>

                    <ScrollView>

                        <View style={styles.containerPerfil}>
                            <View style={styles.imageContainer}>


                                <Image style={styles.imageStyle}
                                    source={{ uri: 'https://www.vbout.com/images/persona/buyer-persona-image1.png' }} />

                            </View>

                            <Text style={styles.textDisplayName}>{firebase.auth().currentUser.displayName}</Text>
                            <Text style={styles.textEmail}>{firebase.auth().currentUser.email}</Text>

                        </View>

                        <View>
                            <Text style={styles.textAccount}>Conta</Text>
                        </View>

                        <View style={styles.containerAccount}>

                            {this.renderCard('face', 'Editar Perfil', '#4AD764')}
                            {this.renderCard('favorite', 'Favoritos', 'red')}

                            {this.renderCard('flag', 'Meus Anúncios', '#3A79FF', 'MyAdvertisementScreen')}
                            {this.renderCard('grade', 'Conquistas', '#FFBC36')}

                        </View>

                        <View>
                            <Text style={styles.textAccount}>Outros</Text>
                        </View>

                        <View style={styles.contarAmigo}>

                            {this.renderCard('info', 'Ajuda', '#4A9FFF')}
                            {this.renderCard('favorite-border', 'Contar a um amigo', '#bf54a6')}

                        </View>


                        <TouchableOpacity onPress={() => this.logoff()}>

                            <View style={styles.containerLogoff}>

                                <View style={styles.containerNotifications}>

                                    <View style={styles.iconLogoff}>
                                        <Icons name={'exit-to-app'} size={fonts.medium} color={'white'} />
                                    </View>

                                    <View >
                                        <Text style={styles.textLogoff}>Sair da conta</Text>
                                    </View>

                                    <View style={styles.switchContainer}>
                                        <Icons name={'chevron-right'} size={fonts.mediumSmall} color={'#D6D6D6'} />
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>



                    </ScrollView>

                    <View style={styles.flexEnd}>
                        <MenuBar state={this.props.navigation.state.routeName} location={this.props.navigation.navigate} />
                    </View>

                </View>

            </SafeAreaView>
        )
    }
}