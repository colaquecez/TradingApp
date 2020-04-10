import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import fire from 'react-native-firebase'
import { StackActions, NavigationActions } from 'react-navigation'
import { BarIndicator } from 'react-native-indicators'
import { BackButton } from '../../../components';
import styles from './create-account.style'
import { colors, fonts } from '../../../helpers'

class CreateAccountScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            confirmPassword: null,
            animating: false,
            passwordError: false,
            emailError: false,
            messageEmailError: '',
            name: null,
            isLoading: false,
        }

    }

    cadastrarHandle = () => {
        this.setState({ isLoading: true })
        if (this.state.email != null && this.state.senha != null && this.state.confirmPassword != null && this.state.name != null) {
            if (this.state.senha == this.state.confirmPassword) {
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
                    .then(() => {
                        let user = firebase.auth().currentUser
                        let cloud = firebase.firestore()

                        user.updateProfile({
                            displayName: this.state.name
                        })
                        fire.firestore().collection("usuarios").doc(user.uid).set({
                            uid: user.uid,
                            email: user.email,
                            nome: this.state.name,
                            apelido: this.state.name,
                            cep: null,
                            cidade: null,
                            bairro: null,
                            genero: null,
                            tipoConta: 'Regular',
                        })
                    })
                    // .then(() => {
                    //     let user = firebase.auth().currentUser
                    //     firebase.database().ref('users/' + user.uid).set({ nome: this.state.name, uid: user.uid })
                    // })

                    .then(() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'CategoriesScreen' })],
                        });
                        this.props.navigation.dispatch(resetAction);

                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/weak-password') {
                            alert('A senha está muito fraca :(');
                        }
                        if (errorCode == 'auth/email-already-in-use') {
                            alert('Esse e-mail já está cadastrado')
                        }
                        if (errorCode == 'auth/invalid-email') {
                            alert('E-mail inválido')
                        }
                        if (errorCode == 'auth/operation-not-allowed') {
                            alert('Error')
                        } else {
                            alert(errorMessage);
                        }
                        this.setState({ isLoading: false })

                    });


            } else {
                this.setState({ passwordError: true })
                this.setState({ isLoading: false })
                // alert('As senhas não estão iguais')

            }
        } else {
            this.setState({ isLoading: false })
            alert('Preencha todos os campos')
        }


    }

    componentDidMount() {
        // {db}
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={styles.backButton}>

                    <BackButton navigation={this.props.navigation.goBack} />

                </View>


                <View style={{ flex: 1, padding: fonts.smaller }}>

                    <View style={{ paddingBottom: fonts.font40, alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: fonts.bigger, color: 'black', fontFamily: 'AvenirNextLTPro-Regular', textAlign: 'left' }}>Bem vindo(a),{'\n'}vamos começar?</Text>
                    </View>


                    {this.state.emailError == true ?
                        <Text style={{ marginBottom: fonts.font10, color: 'red' }}>{this.state.messageEmailError}</Text>
                        : <View></View>}
                        
                            <TextInput
                                style={[styles.inputText, styles.font]}
                                keyboardType={'default'}
                                placeholderTextColor={colors.greyDark}
                                autoCorrect={false}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                placeholder="Nome"

                            />

                            <TextInput
                                style={[styles.inputText, styles.font]}
                                placeholderTextColor={colors.greyDark}
                                keyboardType={'email-address'}
                                clearTextOnFocus={false}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                placeholder="Email"

                            />

                            <TextInput
                                style={[styles.inputText,styles.font, this.state.passwordError == true ? { borderColor: 'red' } : {}]}
                                keyboardType={'default'}
                                placeholderTextColor={colors.greyDark}
                                autoCorrect={false}
                                onChangeText={(senha) => this.setState({ senha })}
                                secureTextEntry={true}
                                value={this.state.senha}
                                placeholder="Senha"
                            />

                            {this.state.passwordError == true ?
                                <Text style={{ marginBottom: fonts.font10, color: 'red' }}>* Essas senhas não coincidem. {'\n'} Tente novamente</Text>
                                : <View></View>}

                            <TextInput
                                style={[styles.inputText, styles.font,this.state.passwordError == true ? { borderColor: 'red' } : {}]}
                                autoCorrect={false}
                                placeholderTextColor={colors.greyDark}
                                keyboardType={'default'}
                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                secureTextEntry={true}
                                value={this.state.confirmPassword}
                                placeholder="Confirme a senha"
                            />
                   
                </View>

                <View>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, marginBottom: fonts.font20 }}>
                        <View style={{ marginLeft: fonts.font19, marginRight: fonts.font19 }}>
                            <TouchableOpacity disabled={this.state.isLoading} onPress={() => { this.cadastrarHandle() }} style={{ alignItems: 'center', marginTop: fonts.font20, backgroundColor: colors.primary, height: fonts.buttonHeight, alignItems: 'center', justifyContent: 'center' }}>

                                {this.state.isLoading ?
                                    <BarIndicator color={'white'} count={4} size={fonts.bigger} />
                                    :
                                    <Text style={styles.registerText}>Registrar</Text>

                                }

                            </TouchableOpacity>
                        </View>

                        <View style={{ width: Dimensions.get('window').width - fonts.font20, alignItems: 'center', padding: fonts.font10 }}>
                            <Text style={{ color: '#CACACA', fontWeight: 'bold' }}>Ou</Text>
                        </View>

                        <View style={{ marginLeft: fonts.font19, marginRight: fonts.font19 }}>
                            <TouchableOpacity style={{ height: fonts.buttonHeight, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#3C5A99' }}>
                                <Text style={{ fontSize: fonts.font20, marginTop: fonts.smallest, color: '#3C5A99', fontFamily: 'AvenirNextLTPro-Demi', }}>Registrar com o Facebook</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (CreateAccountScreen)