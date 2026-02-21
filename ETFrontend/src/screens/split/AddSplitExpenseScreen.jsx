import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, UsersIcon, CheckIcon } from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const AddSplitExpenseScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={24} color={SPLIT_COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Expense</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CheckIcon size={24} color={SPLIT_COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        placeholderTextColor="#CCC"
                        autoFocus
                    />
                </View>
            </SafeAreaView>

            <ScrollView style={styles.content}>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.descInput}
                        placeholder="What was it for?"
                        value={description}
                        onChangeText={setDescription}
                        placeholderTextColor={SPLIT_COLORS.textSecondary}
                    />
                </View>

                <TouchableOpacity style={styles.splitRow}>
                    <View style={styles.splitWith}>
                        <UsersIcon size={20} color={SPLIT_COLORS.textSecondary} />
                        <Text style={styles.splitText}>Split with </Text>
                        <Text style={styles.splitHighlight}>Everyone</Text>
                    </View>
                    <Text style={styles.splitType}>Equally</Text>
                </TouchableOpacity>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Paid By</Text>
                    <TouchableOpacity style={styles.personRow}>
                        <Image source={{ uri: 'https://i.pravatar.cc/100?u=me' }} style={styles.avatar} />
                        <Text style={styles.personName}>You</Text>
                        <View style={styles.radioActive} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.saveBtnText}>Save Expense</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    safeArea: { backgroundColor: '#F8F9FA', paddingBottom: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: { fontSize: 18, fontWeight: '700', color: SPLIT_COLORS.textPrimary },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    currencySymbol: { fontSize: 40, fontWeight: '800', color: SPLIT_COLORS.textPrimary, marginRight: 5 },
    amountInput: { fontSize: 50, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    content: { flex: 1, padding: 20 },
    inputGroup: { borderBottomWidth: 1, borderBottomColor: SPLIT_COLORS.divider, paddingBottom: 10, marginBottom: 25 },
    descInput: { fontSize: 18, fontWeight: '500', color: SPLIT_COLORS.textPrimary },
    splitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 15,
        marginBottom: 25,
    },
    splitWith: { flexDirection: 'row', alignItems: 'center' },
    splitText: { fontSize: 15, color: SPLIT_COLORS.textSecondary, marginLeft: 10 },
    splitHighlight: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.primaryDark },
    splitType: { fontSize: 14, fontWeight: '600', color: SPLIT_COLORS.textSecondary },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 14, fontWeight: '700', color: SPLIT_COLORS.textSecondary, marginBottom: 15, textTransform: 'uppercase' },
    personRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: SPLIT_COLORS.divider },
    avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 15 },
    personName: { flex: 1, fontSize: 16, fontWeight: '600', color: SPLIT_COLORS.textPrimary },
    radioActive: { width: 20, height: 20, borderRadius: 10, backgroundColor: SPLIT_COLORS.primary, borderWidth: 4, borderColor: '#FFF' },
    saveBtn: {
        backgroundColor: SPLIT_COLORS.textPrimary,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

export default AddSplitExpenseScreen;
