import { View, StyleSheet, Dimensions } from 'react-native';
import React, {useRef, useState} from 'react';
import RainDrop from './RainDrop';

const { width: screenWidth } = Dimensions.get('window');
const NUM_DROPS = 100;
const DROP_DURATION = 3000;

const Rain = () => {
    // Empty array to store reusable RainDrop components
    const pool = useRef([]);
    const [raindrops, setRaindrops] = useState(Array(NUM_DROPS).fill(null));

    // Function to handle reusing a raindrop
    const resetRaindrop = (index) => {
        pool.current[index] = null; // Mark the raindrop as available

        // Start a new raindrop after a short delay to stagger them
        setTimeout(() => {
            pool.current[index] = (
                <RainDrop
                    key={index}
                    xStart={Math.random() * screenWidth}
                    yStart={-50} // Start just above the screen
                    duration={DROP_DURATION}
                    onEnd={() => resetRaindrop(index)}
                />
            );
            setRaindrops([...pool.current]);
        }, Math.random() * 1000);
    };

    // Initialize the pool with raindrops
    React.useEffect(() => {
        raindrops.forEach((_, index) => {
            resetRaindrop(index);
        });
    }, []);

    // View that will render and contains all the raindrops component
    return <View style={styles.container}>{raindrops}</View>;
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
});

export default Rain;
