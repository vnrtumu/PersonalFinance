import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../hooks/useAuth';
import COLORS from '../../utils/theme';
import { EyeIcon, EyeOffIcon } from '../../assets/icons';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const loginMutation = useLogin();

    useEffect(() => {
        loadStoredCredentials();
    }, []);

    const loadStoredCredentials = async () => {
        try {
            const savedEmail = await AsyncStorage.getItem('user_email');
            const savedPassword = await AsyncStorage.getItem('user_password');
            const savedRemember = await AsyncStorage.getItem('remember_me');

            if (savedRemember === 'true') {
                if (savedEmail) setEmail(savedEmail);
                if (savedPassword) setPassword(savedPassword);
                setRememberMe(true);
            }
        } catch (error) {
            console.error('Error loading credentials:', error);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (rememberMe) {
            await AsyncStorage.setItem('user_email', email);
            await AsyncStorage.setItem('user_password', password);
            await AsyncStorage.setItem('remember_me', 'true');
        } else {
            await AsyncStorage.removeItem('user_email');
            await AsyncStorage.removeItem('user_password');
            await AsyncStorage.setItem('remember_me', 'false');
        }

        loginMutation.mutate({ email, password }, {
            onError: (error) => {
                Alert.alert('Login Failed', error.response?.data?.detail || 'An error occurred');
            }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.title}>Vaulto</Text>
                    <Text style={styles.subtitle}>Manage your finances effortlessly</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={COLORS.textMuted}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                                placeholder="Password"
                                placeholderTextColor={COLORS.textMuted}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ?
                                    <EyeOffIcon size={20} color={COLORS.textSecondary} /> :
                                    <EyeIcon size={20} color={COLORS.textSecondary} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.rememberMeContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                            {rememberMe && <View style={styles.checkboxInner} />}
                        </View>
                        <Text style={styles.rememberMeText}>Remember Me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loginMutation.isPending}>
                        {loginMutation.isPending ? <ActivityIndicator color={COLORS.buttonText} /> : <Text style={styles.buttonText}>Login</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.linkText}>Don't have an account? Register</Text>
                    </TouchableOpacity>
                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    container: { flex: 1 },
    scrollContent: { padding: 20, flexGrow: 1, justifyContent: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', color: COLORS.textPrimary, textAlign: 'center' },
    subtitle: { fontSize: 16, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 40 },
    inputContainer: { marginBottom: 20 },
    input: {
        backgroundColor: COLORS.surface,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
        color: COLORS.textPrimary,
        fontSize: 16,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: { color: COLORS.buttonText, fontSize: 18, fontWeight: 'bold' },
    linkText: { color: COLORS.primary, textAlign: 'center', marginTop: 20 },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingRight: 10,
    },
    eyeBtn: {
        padding: 10,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: COLORS.primary,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: COLORS.primaryMuted,
    },
    checkboxInner: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: COLORS.primary,
    },
    rememberMeText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
});

export default LoginScreen;
