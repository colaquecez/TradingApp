import React, { Component } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, AsyncStorage } from 'react-native'
import { db } from '../../../../assets/config'
import { BarIndicator } from 'react-native-indicators'
import styles from './login.style'
import firebase from 'firebase'
import { BackButton } from '../../components'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import { fonts, colors } from '../../helpers'

class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            loading: false,
            userData: {},
        }
    }
    componentDidMount() {
        { db }
    }

    loginValid = () => {
        this.setState({ loading: true })
        if (this.state.login != null && this.state.password != null) {
            firebase.auth().signInWithEmailAndPassword(this.state.login, this.state.password)
                .then(() => {
                    setTimeout((() => {

                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'CategoriesScreen' })],
                        });
                        this.props.navigation.dispatch(resetAction);


                    }), 1500);
                })

                .catch((error) => {
                    var errorCode = error.code;
                    this.setState({ loading: false })
                    if (errorCode == 'auth/invalid-email') {
                        alert('Email inválido')
                    }
                    if (errorCode == 'auth/user-not-found') {
                        alert('Email não cadastrado')

                    } else {
                        alert('Erro de conexão')
                    }


                    var errorMessage = error.message;
                })

        } else {
            alert("Preencha todos os campos")
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.backButton}>

                    <BackButton navigation={this.props.navigation.goBack} />

                </View>

                <View style={styles.containerIntro}>
                    <Text style={styles.textIntro}>Olá,{'\n'}bem vindo(a){'\n'}novamente!</Text>
                </View>


                <View style={styles.containerInput}>
                    <View>
                        {/* <Text style={{ fontWeight:'bold',marginBottom: fonts.superSmall, fontSize: fonts.small, color:colors.primary }}>E-mail</Text> */}
                        <TextInput
                            placeholder="E-mail"
                            style={[styles.inputText, styles.font]}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            placeholderTextColor={colors.greyDark}
                            clearTextOnFocus={false}
                            autoCorrect={false}
                            onChangeText={(login) => this.setState({ login })}
                            value={this.state.login}
                        />
                    </View>
                    {/* <View style={{flexDirection:'row', justifyContent:'space-between',marginBottom: fonts.superSmall, alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize: fonts.small, color:colors.primary}}>Senha</Text>
                    </View> */}

                    <TextInput
                        placeholder="Senha"
                        style={[styles.inputText, styles.marginBottom, styles.font]}
                        autoCapitalize={'none'}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholderTextColor={colors.greyDark}
                        autoCorrect={false}
                        secureTextEntry={true} />
                    <View style={styles.textForgot}>
                    </View>
                    {/* <Text style={styles.textPassword}>Esqueceu sua senha?</Text> */}

                    <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, padding: fonts.font20 }}>
                        <TouchableOpacity disabled={this.state.loading} onPress={(() => { this.loginValid() })} style={styles.buttonLogin}>

                            {this.state.loading ?
                                <BarIndicator color={'white'} count={4} size={fonts.bigger} />
                                :
                                <Text style={[styles.buttonsText, styles.white]}>Entrar</Text>
                            }

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonFacebook}>

                            <Text style={[styles.buttonsText, styles.blueFece]}>Continuar com o Facebook</Text>

                        </TouchableOpacity>

                        <View style={styles.containerAccount}>
                            <Text style={styles.footerText}>Não tem conta ainda? Cadastrar</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}


export default connect(null, null)
    (LoginScreen)