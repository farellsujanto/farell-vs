import React from 'react';
import { View, StyleSheet, Image, Text, ImageProps } from 'react-native';
import PrimaryButton from '../buttons/PrimaryButton';
import DangerButton from '../buttons/DangerButton';

interface ImageCardProps {
    imageSrc: ImageProps,
    likeCount: number,
    onLikeButtonPress: () => void,
    onDislikeButtonPress: () => void,
}

const ImageCard = ({
    imageSrc,
    likeCount = 0,
    onLikeButtonPress,
    onDislikeButtonPress
}: ImageCardProps) => {
    return (
        <View style={styles.imageCardContainer}>
            <Image
                style={styles.imageStyle}
                source={imageSrc} />
            <View style={styles.bottomContainer}>
                <View style={styles.likeContainer}>
                    <Text style={styles.likeText}>{likeCount} Like</Text>
                </View>
                <View style={{ flex: 1 }} />
                <PrimaryButton
                    text='Like'
                    onPress={onLikeButtonPress} />
                <View style={{ width: 8.0 }} />
                <DangerButton
                    text='Dislike'
                    onPress={onDislikeButtonPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageCardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16.0,
        borderColor: '#D5D5D5',
        borderWidth: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: '100%',
        height: 198,
        resizeMode: 'cover',
    },
    bottomContainer: {
        flexDirection: 'row',
        paddingHorizontal: 21.0,
        paddingVertical: 12.0,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    likeContainer: {
        borderRadius: 8.0,
        paddingVertical: 6.0,
        paddingHorizontal: 12.0,
        backgroundColor: '#FFFFFF',
        borderColor: '#D5D5D5',
        borderWidth: 1.0,
    },
    likeText: {
        fontSize: 16.0,
        color: '#707070',
    },
});

export default React.memo(ImageCard);
