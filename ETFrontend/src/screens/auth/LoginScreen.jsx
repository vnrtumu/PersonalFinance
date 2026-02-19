import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLogin } from '../../hooks/useAuth';
import COLORS from '../../utils/theme';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLogin();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        loginMutation.mutate({ email, password }, {
            onError: (error) => {
                Alert.alert('Login Failed', error.response?.data?.detail || 'An error occurred');
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expense Tracker</Text>
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
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={COLORS.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loginMutation.isPending}>
                {loginMutation.isPending ? <ActivityIndicator color={COLORS.buttonText} /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: COLORS.background },
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

export default LoginScreen;
