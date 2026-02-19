import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar, Image } from 'react-native';
import COLORS from '../utils/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
    const logoScale = useRef(new Animated.Value(0.3)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(20)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const glowOpacity = useRef(new Animated.Value(0)).current;
    const screenOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            // Phase 1: Logo appears with scale + glow
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1,
                    tension: 20,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(glowOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            // Phase 2: Title slides up
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(titleTranslateY, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
            // Phase 3: Subtitle fades in
            Animated.timing(subtitleOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            // Wait a moment
            Animated.delay(600),
            // Phase 4: Fade out entire screen
            Animated.timing(screenOpacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onFinish) onFinish();
        });
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* Background glow */}
            <Animated.View style={[styles.glowCircle, { opacity: glowOpacity }]} />

            {/* Logo */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }],
                    },
                ]}
            >
                <View style={styles.logoInner}>
                    <Text style={styles.logoEmoji}>💰</Text>
                </View>
            </Animated.View>

            {/* App Title */}
            <Animated.View
                style={{
                    opacity: titleOpacity,
                    transform: [{ translateY: titleTranslateY }],
                }}
            >
                <Text style={styles.title}>Expense Tracker</Text>
            </Animated.View>

            {/* Subtitle */}
            <Animated.View style={{ opacity: subtitleOpacity }}>
                <Text style={styles.subtitle}>Smart money management</Text>
            </Animated.View>

            {/* Bottom version text */}
            <Animated.View style={[styles.bottomSection, { opacity: subtitleOpacity }]}>
                <View style={styles.dotRow}>
                    <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
                    <View style={[styles.dot, { backgroundColor: COLORS.lavender }]} />
                    <View style={[styles.dot, { backgroundColor: COLORS.cream }]} />
                    <View style={[styles.dot, { backgroundColor: COLORS.pink }]} />
                </View>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    glowCircle: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: COLORS.primary,
        opacity: 0.08,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logoInner: {
        width: 120,
        height: 120,
        borderRadius: 32,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 20,
    },
    logoEmoji: {
        fontSize: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.textPrimary,
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textSecondary,
        letterSpacing: 1,
    },
    bottomSection: {
        position: 'absolute',
        bottom: 60,
        alignItems: 'center',
    },
    dotRow: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
});

export default SplashScreen;
