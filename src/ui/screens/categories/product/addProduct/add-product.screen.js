import React, { Component } from 'react'
import { View, SafeAreaView, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Image, Text, Alert, TouchableOpacity, TextInput } from 'react-native'
import styles from './add-product.style'
import RNPickerSelect from 'react-native-picker-select'
import firebase from 'react-native-firebase'
import fire from 'firebase'
import { BackButton } from '../../../../components/'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text'
import { fonts, colors } from '../../../../helpers'
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import { productRequest } from '../../../../../state/categories/categories.action'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'



const options = {
    title: 'Selecione uma imagem',
    storageOptions: {
        path: 'images'
    }
}
class AddProductScreen extends Component {
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    state = {
        categoria: null,
        description: '',
        nameProduct: '',
        dateCategoria: '',
        cep: '',
        cidade: null,
        bairro: null,
        cepCarregado: false,
        imgSource: '',
        uploading: false,
        progress: 0,
        images: '', 
        send: false
    }


    componentDidMount() {

        let cloud = fire.firestore()
        let user = fire.auth().currentUser
        let array = []

        cloud.collection("Categorias")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    array.push(doc.data())

                })
            }).then(() => {
                this.setState({ dateCategoria: array })
            })

            .catch(function (error) {
                alert('Houve um erro, tente novamente');
            });
    }

    cepCheck(cep) {

        if (cep == null || cep.length != 8) {
            alert('Cep inválido')
        }
        else {
            let ceps = `https://viacep.com.br/ws/${cep}/json/`
            return fetch(ceps)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ cidade: responseJson.localidade })
                    this.setState({ bairro: responseJson.bairro })
                }).then(() => {
                    this.setState({ cepCarregado: true })
                })
                .catch((error) => {
                    alert('Cep não encontrado')
                });
        }
    }

    destaque = (item) => {
        this.props.dispatch(productRequest(item))
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'PremiumScreen' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    anunciar() {
        if (this.state.nameProduct != null && this.state.description != null && this.state.categoria != null && this.state.cidade != null && this.state.bairro != null && this.state.cep.length == 8) {

            if (this.state.progress >= 100 && this.state.send == true) {
                let dNow = new Date();
                let localdate = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear()
                let localHour = dNow.getHours() + ':' + dNow.getMinutes()

                let cloud = fire.firestore()
                cloud.collection("Produto").add({
                    categoria: this.state.categoria,
                    data: localdate,
                    hora: localHour,
                    descricao: this.state.description,
                    favoritos: null,
                    cep: this.state.cep,
                    cidade: this.state.cidade,
                    bairro: this.state.bairro,
                    nome: this.state.nameProduct,
                    uidDono: fire.auth().currentUser.uid,
                    uri: this.state.images,
                    pausado: false,

                }).then((docRef) => {
                    let ref = cloud.collection("Produto").doc(docRef.id)
                    ref.update({
                        id: docRef.id
                    })
                    const test = ref.get().then((item) => {
                        this.destaque(item.data())
                    })
                })
            }
            else {
                alert('Estamos carregando a imagem, falta pouco!')
            }
        }

        else {
            alert('Informe todos os campos!')
        }
    }


    _handleButtonPress = () => {
        ImagePicker.showImagePicker(options, response => {
            try {
                if (response.didCancel) {
                    console.log('You cancelled image picker 😟');
                } else if (response.error) {
                    alert('Em breve');
                } else {
                    const source = { uri: response.uri };
                    this.setState({
                        imgSource: source,
                        imageUri: response.uri
                    }, this.uploadImage);
                }
            } catch (erro) {
                alert('Em breve')
            }
        });
    }

    uploadImage = () => {
        const ext = this.state.imageUri.split('.').pop(); // Extract image extension
        let metadata = {
            contentType: 'image/jpeg',
          };
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });
        firebase
            .storage()
            .ref(`images/${filename}`)
            .putFile(this.state.imageUri,metadata)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    let state = {};
                    state = {
                        ...state,
                        progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
                    };
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {

                        // state = {
                        //     ...state,
                        //     uploading: false,
                        //     imgSource: '',
                        //     imageUri: '',
                        //     progress: 0,
                        //     images: allImages
                        // };
                        state = {
                            ...state,
                            images: snapshot.downloadURL,
                            send: true
                        }
                    }
                    this.setState(state);
                },
                error => {
                    unsubscribe();
                    alert('Sorry, Try again.');
                }
            );
    };


    render() {

        const { uploading, imgSource, progress, images } = this.state;
        const windowWidth = Dimensions.get('window').width;
        const disabledStyle = uploading ? styles.disabledBtn : {};
        const actionBtnStyles = [styles.btn, disabledStyle];

        const placeholder = {
            label: 'Categoria',
            value: null,

        };

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerNav}>

                    <View>
                        <BackButton navigation={this.props.navigation.goBack} />
                    </View>

                    <View>
                        <Text style={styles.textCriarAnuncio}>Inserir Anúncio</Text>
                    </View>

                    <TouchableOpacity onPress={(() => {
                        Alert.alert(
                            'Ajuda',
                            'Doar: Iremos encaminhar seu produto para alguma instituição, seja ela de idosos, crianças com deficiencia, orfanatos...\n\n CEP: Precisamos do seu CEP para conseguirmos catalogar seu produto por cidade.'


                        )
                    })}>
                        <View style={styles.marginBottom}>
                            <Icons name={'help'} color={'#333333'} size={fonts.font33} />
                        </View>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} behavior="padding" enabled={true}>
                    <ScrollView>
                        <View style={styles.containerTextInput}>
                            <View style={{ alignItems: 'center' }}>
                                {progress < 100 ?
                                    <View
                                        style={[styles.progressBar, { width: `${progress}%` }]}
                                    />
                                    : null
                                }
                                {imgSource.uri != undefined ?

                                    <TouchableOpacity style={{ height: fonts.imageBox, width: fonts.imageBox }} onPress={this._handleButtonPress} >

                                        <Image source={imgSource} style={{ flex: 1, borderRadius: fonts.font20 }} resizeMode="cover" />
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity style={{ width: fonts.font150, alignItems: 'center', justifyContent: 'center', height: fonts.font150, borderRadius: fonts.font75, backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 1 }} onPress={this._handleButtonPress} >

                                        <Icons name="camera-alt" size={fonts.font40} color={colors.primary} />

                                    </TouchableOpacity>
                                }
                            </View>

                            <TextField
                                label='Título'
                                keyboardType={'default'}
                                clearTextOnFocus={false}
                                maxLength={36}
                                labelHeight={fonts.bigger}
                                fontSize={fonts.smaller}
                                autoCorrect={true}
                                returnKeyType='next'
                                lineWidth={0}
                                disabledLineWidth={0}
                                labelFontSize={fonts.superSmall}
                                onChangeText={(nameProduct) => this.setState({ nameProduct })}
                                value={this.state.nameProduct}
                            />
    
                            <TextField
                                label='Descrição'
                                keyboardType={'default'}
                                labelFontSize={fonts.superSmall}
                                maxLength={300}
                                lineWidth={0}
                                fontSize={fonts.smaller}
                                returnKeyType='next'
                                labelHeight={fonts.bigger}
                                autoCorrect={true}
                                disabledLineWidth={0}
                                numberOfLines={2}
                                onChangeText={(description) => this.setState({ description })}
                                value={this.state.description}
                            />

                            <RNPickerSelect
                                placeholder={placeholder}
                                placeholderTextColor={colors.greyDark}
                                items={this.state.dateCategoria != null ? this.state.dateCategoria : []}
                                onValueChange={value => {
                                    this.setState({
                                        categoria: value,
                                    });
                                }}
                                style={pickerSelectStyles}
                                value={this.state.categoria}
                            />
                        </View>
                        <TextInputMask
                            style={{ height: fonts.inputHeight, fontSize: fonts.smaller, paddingHorizontal: 10, marginBottom: 20, color: colors.greyText, }}
                            type={'zip-code'}
                            onContentSizeChange={(() => { this.state.cep.length == 8 ? this.cepCheck(this.state.cep) : null })}
                            placeholder="Insira o seu CEP"
                            placeholderTextColor={colors.greyDark}
                            value={this.state.cep}
                            returnKeyType='done'
                            includeRawValueInChangeText={true}
                            onChangeText={(maskedText, rawText) => {
                                this.setState({
                                    cep: rawText
                                })
                            }}
                        />

                        {this.state.cepCarregado == true ?
                            <View style={styles.cepContainer}>
                                <Text><Icons name={'room'} color={'grey'} size={fonts.mediumLarge} /></Text>
                                <Text style={styles.cepText}>{this.state.bairro}, {this.state.cidade}</Text>
                            </View>

                            : <Text></Text>
                        }



                    </ScrollView>
                </KeyboardAvoidingView>

                <View style={styles.buttonContainer}>
                    <View style={{ backgroundColor: '#167349', height: fonts.mediumSmall, width: 1.3, position: 'absolute', zIndex: 1, top: 13 }} />
                    <TouchableOpacity style={{ borderTopLeftRadius: fonts.big, borderBottomLeftRadius: fonts.big, backgroundColor: colors.primary, height: fonts.buttonHeight, width: Dimensions.get('window').width / 2.1, justifyContent: 'center', alignItems: 'center' }} onPress={(() => { this.anunciar() })}>

                        <Text style={{ color: 'white', fontSize: fonts.smaller, fontFamily: 'AvenirNextLTPro-demi', }}>Anunciar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ borderTopRightRadius: fonts.big, borderBottomRightRadius: fonts.big, backgroundColor: colors.primary, height: fonts.buttonHeight, width: Dimensions.get('window').width / 2.1, justifyContent: 'center', alignItems: 'center' }} onPress={(() => { this.cepCheck(this.state.cep) })}>

                        <Text style={{ color: 'white', fontSize: fonts.smaller, fontFamily: 'AvenirNextLTPro-demi' }}>Doar</Text>

                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderColor: 'transparent',
        color: colors.primary,
        backgroundColor: 'white',
        fontSize: fonts.smaller,
        marginTop: 20,
        marginBottom: 14,

    },

});

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (AddProductScreen)