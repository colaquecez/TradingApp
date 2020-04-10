import React from 'react'
import { Text, View, Image } from 'react-native'
import { styles } from './slider-cards.style'

export const SliderCard = ({

    header,
    body,
    image,
    padding,

}) => (
        <View style={padding ? [styles.container, styles.padding] : styles.container}>
            <Image
                style={styles.image}
                source={image}
                resizeMode='contain'
            />

            {header ? <Text style={ styles.textHead }>{header}</Text> : null}
            {body ? <Text style={ styles.textBody }>{body}</Text> : null}

        </View>
    )