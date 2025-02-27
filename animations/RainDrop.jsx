import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const DROP_SIZE = 2;

// Function that will be called in Rain, Drizzle
const RainDrop = ({ xStart, yStart, duration, onEnd }) => {
    const translateY = useRef(new Animated.Value(yStart)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 1000, // Screen height
            duration,
            useNativeDriver: true,
        }).start(() => onEnd());

    }, [translateY, duration, onEnd]);

    return (
        <Animated.View
            style={[
                styles.raindrop,
                { left: xStart, transform: [{ translateY }] },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    raindrop: {
        position: 'absolute',
        width: DROP_SIZE,
        height: DROP_SIZE * 10,
        backgroundColor: 'blue',
        borderRadius: DROP_SIZE,
        opacity: 0.8,
    },
});

export default RainDrop;
