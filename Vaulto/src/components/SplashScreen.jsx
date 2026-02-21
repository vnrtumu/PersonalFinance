import React, { useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Video from 'react-native-video';

const SplashScreen = ({ onFinish }) => {
    const videoRef = useRef(null);

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Video
                ref={videoRef}
                source={require('../../launch1.mp4')}
                style={styles.video}
                resizeMode="cover"
                muted={false}
                repeat={false}
                onEnd={() => {
                    if (onFinish) onFinish();
                }}
                onError={(e) => {
                    console.warn('Splash video error:', e);
                    if (onFinish) onFinish();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: '#000',
    },
    video: {
        flex: 1,
    },
});

export default SplashScreen;
