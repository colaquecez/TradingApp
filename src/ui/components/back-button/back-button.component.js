import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors, fonts } from '../../helpers'

export const BackButton = ({

    navigation

}) => (
        <View>

            <TouchableOpacity onPress={()=>{navigation()}}>

                <Text>
                    <Icon name={'chevron-left'} color={colors.primary} size={fonts.backButtonSize} />
                </Text>

            </TouchableOpacity>

        </View>
    )