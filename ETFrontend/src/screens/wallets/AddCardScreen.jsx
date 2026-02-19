import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    ScrollView
} from 'react-native';
import {
    ChevronLeftIcon,
    CreditCardIcon,
    CheckIcon
} from '../../assets/icons';
import { useAddWallet } from '../../hooks/useWallets';

const AddCardScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [last4, setLast4] = useState('');
    const [totalLimit, setTotalLimit] = useState('');
    const [billDate, setBillDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [additionalCharges, setAdditionalCharges] = useState('0');

    const addWalletMutation = useAddWallet();

    const handleSave = async () => {
        if (!name || !last4 || !totalLimit) {
            Alert.alert('Error', 'Please fill in Name, Last 4 digits, and Total Limit');
            return;
        }

        if (last4.length !== 4) {
            Alert.alert('Error', 'Last 4 digits must be exactly 4 numbers');
            return;
        }

        const payload = {
            name,
            type: 'credit_card',
            balance: 0, // Current balance starts at 0
            last_4: last4,
            total_limit: parseFloat(totalLimit),
            bill_date: billDate ? parseInt(billDate) : null,
            due_date: dueDate ? parseInt(dueDate) : null,
            additional_charges: parseFloat(additionalCharges) || 0,
        };

        addWalletMutation.mutate(payload, {
            onSuccess: () => {
                Alert.alert('Success', 'Card added successfully');
                navigation.goBack();
            },
            onError: (error) => {
                Alert.alert('Error', error.response?.data?.detail || 'Failed to add card');
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
                <Text style={styles.title}>Add New Card</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.cardPreview}>
                    <View style={styles.previewIconBox}>
                        <CreditCardIcon size={32} color="#6366f1" />
                    </View>
                    <View>
                        <Text style={styles.previewName}>{name || 'CARD NAME'}</Text>
                        <Text style={styles.previewNumber}>**** **** **** {last4 || '0000'}</Text>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Card Provider / Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. HDFC REGALIA"
                        placeholderTextColor="#9ca3af"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                        <Text style={styles.label}>Last 4 Digits</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="4321"
                            placeholderTextColor="#9ca3af"
                            value={last4}
                            onChangeText={setLast4}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                        <Text style={styles.label}>Total Limit (₹)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="120000"
                            placeholderTextColor="#9ca3af"
                            value={totalLimit}
                            onChangeText={setTotalLimit}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.sectionDivider}>
                    <Text style={styles.sectionHeader}>Billing Cycle</Text>
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                        <Text style={styles.label}>Bill Date (DD)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="05"
                            placeholderTextColor="#9ca3af"
                            value={billDate}
                            onChangeText={setBillDate}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                        <Text style={styles.label}>Due Date (DD)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="25"
                            placeholderTextColor="#9ca3af"
                            value={dueDate}
                            onChangeText={setDueDate}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Additional Charges (Interest/Late Fee)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        placeholderTextColor="#9ca3af"
                        value={additionalCharges}
                        onChangeText={setAdditionalCharges}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, addWalletMutation.isPending && styles.disabledButton]}
                    onPress={handleSave}
                    disabled={addWalletMutation.isPending}
                >
                    {addWalletMutation.isPending ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <CheckIcon size={20} color="#fff" />
                            <Text style={styles.saveButtonText}>Save Card</Text>
                        </>
                    )}
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
    },
    backButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 20, fontWeight: '800', color: '#111827' },
    content: { flex: 1, backgroundColor: '#f9fafb', paddingHorizontal: 20 },
    cardPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6366f1',
        padding: 24,
        borderRadius: 24,
        marginTop: 20,
        marginBottom: 30,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10
    },
    previewIconBox: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    previewName: { color: '#fff', fontSize: 18, fontWeight: '800' },
    previewNumber: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600', marginTop: 4, letterSpacing: 1 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 13, fontWeight: '700', color: '#6b7280', marginBottom: 8, marginLeft: 4 },
    input: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    sectionDivider: { marginBottom: 16, marginTop: 10 },
    sectionHeader: { fontSize: 14, fontWeight: '800', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 },
    saveButton: {
        backgroundColor: '#6366f1',
        padding: 18,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        gap: 10,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    disabledButton: { backgroundColor: '#9ca3af' }
});

export default AddCardScreen;
