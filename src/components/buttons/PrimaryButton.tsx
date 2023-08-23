import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface PrimaryButtonProps {
    text: string,
    onPress: () => void,
    isSmall?: boolean,
}

const PrimaryButton = ({
    text,
    onPress,
    isSmall = false,
}: PrimaryButtonProps) => {
    return(
        <Pressable
            style={[
                styles.buttonStyle,
                isSmall ? styles.smallButtonPadding : styles.normalButtonPadding,
            ]}
            onPress={onPress} >
            <Text style={styles.buttonTextStyle}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#2B72C4',
        borderRadius: 12.0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    smallButtonPadding: {
        paddingVertical: 6.0,
        paddingHorizontal: 24.0,
    },
    normalButtonPadding: {
        paddingVertical: 9.0,
        paddingHorizontal: 24.0,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 16.0,
    },
});

export default React.memo(PrimaryButton);
