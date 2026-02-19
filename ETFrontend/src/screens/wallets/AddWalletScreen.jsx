import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import {
    WalletIcon,
    BanknoteIcon,
    CreditCardIcon,
    SmartphoneIcon,
    FileTextIcon,
    ChevronLeftIcon
} from '../../assets/icons';
import { useAddWallet } from '../../hooks/useWallets';

const walletTypes = [
    { id: 'cash', label: 'Cash', icon: WalletIcon },
    { id: 'bank', label: 'Bank', icon: BanknoteIcon },
    { id: 'credit_card', label: 'Credit Card', icon: CreditCardIcon },
    { id: 'upi', label: 'UPI Wallet', icon: SmartphoneIcon },
    { id: 'loan', label: 'Loan', icon: FileTextIcon },
];

const AddWalletScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [type, setType] = useState('bank');
    const addWalletMutation = useAddWallet();

    const handleCreate = async () => {
        if (!name || !balance) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        addWalletMutation.mutate({
            name,
            type,
            balance: parseFloat(balance),
            currency: 'USD',
        }, {
            onSuccess: () => {
                Alert.alert('Success', 'Wallet created successfully');
                navigation.goBack();
            },
            onError: (error) => {
                Alert.alert('Error', error.response?.data?.detail || 'Failed to create wallet');
            }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeftIcon size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.title}>New Wallet</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Wallet Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Personal Bank, Cash"
                        placeholderTextColor="#9ca3af"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Initial Balance</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        placeholderTextColor="#9ca3af"
                        value={balance}
                        onChangeText={setBalance}
                        keyboardType="numeric"
                    />
                </View>

                <Text style={styles.label}>Wallet Type</Text>
                <View style={styles.typeGrid}>
                    {walletTypes.map((item) => {
                        const Icon = item.icon;
                        const isSelected = type === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.typeItem, isSelected && styles.activeType]}
                                onPress={() => setType(item.id)}
                            >
                                <Icon size={22} color={isSelected ? '#fff' : '#6366f1'} />
                                <Text style={[styles.typeLabel, isSelected && styles.activeTypeLabel]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, addWalletMutation.isPending && styles.disabledButton]}
                    onPress={handleCreate}
                    disabled={addWalletMutation.isPending}
                >
                    {addWalletMutation.isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Create Wallet</Text>}
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff'
    },
    backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: '800', color: '#111827' },
    content: { flex: 1, backgroundColor: '#f9fafb', paddingHorizontal: 20 },
    inputGroup: { marginTop: 20, marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 10, marginLeft: 4 },
    input: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 16,
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    typeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
    typeItem: {
        width: '31%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 18,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    activeType: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
    typeLabel: { fontSize: 12, color: '#4b5563', marginTop: 8, fontWeight: '600' },
    activeTypeLabel: { color: '#fff' },
    saveButton: {
        backgroundColor: '#6366f1',
        padding: 18,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    disabledButton: { backgroundColor: '#9ca3af' }
});

export default AddWalletScreen;
