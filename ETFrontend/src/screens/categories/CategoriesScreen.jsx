import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { TagIcon, PlusIcon, TrashIcon } from '../../assets/icons';
import { useCategories } from '../../hooks/useData';

const CategoriesScreen = () => {
    const { data: categories, isLoading } = useCategories();

    const renderCategory = ({ item }) => (
        <View style={styles.categoryItem}>
            <View style={[styles.iconContainer, { backgroundColor: item.color || '#e7f0ff' }]}>
                <TagIcon size={20} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.categoryType}>{item.type.toUpperCase()}</Text>
            </View>
            {item.user_id && (
                <TouchableOpacity onPress={() => Alert.alert('Delete', 'Feature coming soon')}>
                    <TrashIcon size={20} color="#dc3545" />
                </TouchableOpacity>
            )}
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
                <TouchableOpacity style={styles.addButton}>
                    <PlusIcon size={24} color="#007bff" />
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
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    addButton: { padding: 8, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        elevation: 2,
    },
    iconContainer: { padding: 10, borderRadius: 10 },
    categoryName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    categoryType: { fontSize: 12, color: '#666' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { textAlign: 'center', color: '#999', marginTop: 40 },
});

export default CategoriesScreen;
