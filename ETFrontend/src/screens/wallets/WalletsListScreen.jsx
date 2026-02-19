import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { PlusIcon, WalletIcon, ChevronRightIcon, CreditCardIcon, BanknoteIcon } from '../../assets/icons';
import { useWallets } from '../../hooks/useWallets';

const WalletsListScreen = ({ navigation }) => {
    const { data: wallets, isLoading } = useWallets();

    const getWalletIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'credit_card': return <CreditCardIcon size={24} color="#6366f1" />;
            case 'bank': return <BanknoteIcon size={24} color="#10b981" />;
            default: return <WalletIcon size={24} color="#f59e0b" />;
        }
    };

    const renderWallet = ({ item }) => (
        <TouchableOpacity
            style={styles.walletCard}
            onPress={() => navigation.navigate('WalletDetail', { wallet: item })}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.type === 'credit_card' ? '#eef2ff' : item.type === 'bank' ? '#f0fdf4' : '#fffbeb' }]}>
                {getWalletIcon(item.type)}
            </View>
            <View style={styles.walletDetails}>
                <Text style={styles.walletName}>{item.name}</Text>
                <Text style={styles.walletType}>{item.type.replace('_', ' ').toUpperCase()}</Text>
            </View>
            <View style={styles.walletBalanceContainer}>
                <Text style={styles.walletBalance}>${item.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                <ChevronRightIcon size={18} color="#9ca3af" />
            </View>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.title}>Transactions</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddWallet')}>
                    <PlusIcon size={24} color="#6366f1" />
                </TouchableOpacity>
            </View>

            <View style={styles.totalBalanceSection}>
                <Text style={styles.totalBalanceLabel}>Total Assets</Text>
                <Text style={styles.totalBalanceAmount}>
                    ${wallets?.reduce((acc, curr) => acc + curr.balance, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
            </View>

            <FlatList
                data={wallets}
                renderItem={renderWallet}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.emptyText}>No wallets found. Add one to get started!</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', padding: 24 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 24 },
    title: { fontSize: 28, fontWeight: '800', color: '#111827' },
    addButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    totalBalanceSection: { backgroundColor: '#fff', borderRadius: 24, padding: 24, marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 15, elevation: 1 },
    totalBalanceLabel: { fontSize: 13, fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
    totalBalanceAmount: { fontSize: 32, fontWeight: '800', color: '#111827' },
    listContent: { paddingBottom: 100 },
    walletCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 1,
    },
    iconContainer: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    walletDetails: { flex: 1, marginLeft: 16 },
    walletName: { fontSize: 16, fontWeight: '700', color: '#1f2937' },
    walletType: { fontSize: 10, fontWeight: '800', color: '#9ca3af', marginTop: 2, letterSpacing: 0.5 },
    walletBalanceContainer: { flexDirection: 'row', alignItems: 'center' },
    walletBalance: { fontSize: 16, fontWeight: '800', color: '#111827', marginRight: 8 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { textAlign: 'center', color: '#9ca3af', marginTop: 40, fontSize: 14, fontWeight: '500' },
});

export default WalletsListScreen;
