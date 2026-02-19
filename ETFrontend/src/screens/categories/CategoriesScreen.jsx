import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { TagIcon, PlusIcon, TrashIcon } from '../../assets/icons';
import { useCategories } from '../../hooks/useData';
import COLORS from '../../utils/theme';

const CategoriesScreen = () => {
    const { data: categories, isLoading } = useCategories();

    const renderCategory = ({ item }) => (
        <View style={styles.categoryItem}>
            <View style={[styles.iconContainer, { backgroundColor: item.color || COLORS.primaryMuted }]}>
                <TagIcon size={20} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.categoryType}>{item.type.toUpperCase()}</Text>
            </View>
            {item.user_id && (
                <TouchableOpacity onPress={() => Alert.alert('Delete', 'Feature coming soon')}>
                    <TrashIcon size={20} color={COLORS.expense} />
                </TouchableOpacity>
            )}
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
                <TouchableOpacity style={styles.addButton}>
                    <PlusIcon size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>No categories found</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
    title: { fontSize: 28, fontWeight: 'bold', color: COLORS.textPrimary },
    addButton: { padding: 8, backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.divider },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    iconContainer: { padding: 10, borderRadius: 10 },
    categoryName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary },
    categoryType: { fontSize: 12, color: COLORS.textSecondary },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
    emptyText: { textAlign: 'center', color: COLORS.textMuted, marginTop: 40 },
});

export default CategoriesScreen;
