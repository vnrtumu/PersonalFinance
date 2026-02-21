import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRegister } from '../../hooks/useAuth';
import COLORS from '../../utils/theme';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const registerMutation = useRegister();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        registerMutation.mutate({ name, email, password }, {
            onSuccess: () => {
                Alert.alert('Success', 'Registration successful! Please login.', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') }
                ]);
            },
            onError: (error) => {
                console.log(error);
                Alert.alert('Registration Failed', error.response?.data?.detail || 'An error occurred');
            }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={require('../../assets/images/Innerlogo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join us and track your expenses</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor={COLORS.textMuted}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={COLORS.textMuted}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={COLORS.textMuted}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor={COLORS.textMuted}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? <ActivityIndicator color={COLORS.buttonText} /> : <Text style={styles.buttonText}>Register</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: COLORS.background },
    logo: { width: 250, height: 250, alignSelf: 'center' },
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
    },
    buttonText: { color: COLORS.buttonText, fontSize: 18, fontWeight: 'bold' },
    linkText: { color: COLORS.primary, textAlign: 'center', marginTop: 20 },
});

export default RegisterScreen;
