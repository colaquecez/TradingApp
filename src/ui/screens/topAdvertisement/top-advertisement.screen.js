import React, { Component } from 'react'
import { View, Text, FlatList, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { MenuBar } from '../../components'
import Icons from 'react'
import { styles } from './top-advertisement.style'
import { colors, fonts } from '../../helpers'

class TopAdvertisementScreen extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerNavigation}>

                    <Text style={styles.textNavigation}>Em alta</Text>

                    <View>

                    </View>
                </View>

                <View style={styles.containerBody}>
                    <ScrollView>
                        <View>
                            <Image
                                resizeMode='cover'
                                style={{ height: fonts.font300 }}
                                source={{ uri: 'https://s2.glbimg.com/kU0g9hHa7cIs9tcAvGKbYAMe2OE=/0x0:1920x1440/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/5/E/UvL16ZRnKu6G5JGjbKKg/iphone-11-tela.jpg' }}
                            />

                            <View style={{
                                position: 'absolute', width: fonts.font300, left: fonts.font60, top: fonts.font110, shadowOffset: { width: fonts.font5, height: fonts.font5, },
                                shadowColor: 'black',
                                shadowOpacity: 1.0
                            }}>
                                <Text style={{ fontSize: fonts.bigger, color: 'white', fontFamily: 'AvenirNextLTPro-Demi' }}>Celular iPhone em perfeitas condições</Text>
                            </View>
                        </View>

                        <View style={{ padding: fonts.font10, borderBottomWidth: 1, borderColor: colors.primary, margin: fonts.font20 }}>
                            <Text style={{ fontSize: fonts.font16, fontFamily: 'AvenirNextLTPro-Demi', textAlign: 'center', color: colors.primary }}>Itens em destaque</Text>
                        </View>

                        <View style={{ padding: fonts.font10, borderBottomWidth: 1, borderColor: colors.primary, margin: fonts.font20 }}>
                            <Text style={{ fontSize: fonts.font16, fontFamily: 'AvenirNextLTPro-Demi', textAlign: 'center', color: colors.primary }}>Mais próximos de você</Text>
                        </View>

                        <View style={{ padding: fonts.font10, borderBottomWidth: 1, borderColor: colors.primary, margin: fonts.font20 }}>
                            <Text style={{ fontSize: fonts.font16, fontFamily: 'AvenirNextLTPro-Demi', textAlign: 'center', color: colors.primary }}>Mais vistos</Text>
                        </View>

                        <View style={{ padding: fonts.font10, borderBottomWidth: 1, borderColor: colors.primary, margin: fonts.font20 }}>
                            <Text style={{ fontSize: fonts.font16, fontFamily: 'AvenirNextLTPro-Demi', textAlign: 'center', color: colors.primary }}>Itens recentes </Text>
                        </View>

                    </ScrollView>
                </View>

                <MenuBar state={this.props.navigation.state.routeName} location={this.props.navigation.navigate} />

            </SafeAreaView>
        )
    }


}

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
    (TopAdvertisementScreen)