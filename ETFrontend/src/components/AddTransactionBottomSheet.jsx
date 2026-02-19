import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { XIcon, CheckIcon } from '../assets/icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddTransactionBottomSheet = ({ isVisible, onClose }) => {
    const [amount, setAmount] = useState('0');

    const handleKeyPress = (val) => {
        if (val === 'C') {
            setAmount('0');
        } else if (val === 'back') {
            setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        } else {
            setAmount(prev => prev === '0' ? val : prev + val);
        }
    };

    const KeypadButton = ({ val, children }) => (
        <TouchableOpacity style={styles.key} onPress={() => handleKeyPress(val)}>
            {children || <Text style={styles.keyText}>{val}</Text>}
        </TouchableOpacity>
    );

    return (
        <Modal transparent visible={isVisible} animationType="slide" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={onClose}>
                                    <XIcon size={24} color="#111827" />
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>Add Expense</Text>
                                <TouchableOpacity style={styles.doneButton}>
                                    <CheckIcon size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.amountContainer}>
                                <Text style={styles.currency}>$</Text>
                                <Text style={styles.amountText}>{amount}</Text>
                            </View>

                            <View style={styles.keypad}>
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'].map((key) => (
                                    <KeypadButton key={key} val={key}>
                                        {key === 'back' ? <XIcon size={24} color="#111827" /> : null}
                                    </KeypadButton>
                                ))}
                            </View>

                            <TouchableOpacity style={styles.submitButton} onPress={onClose}>
                                <Text style={styles.submitButtonText}>Add Transaction</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    content: { backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, height: SCREEN_HEIGHT * 0.75 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
    doneButton: { backgroundColor: '#10b981', width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    amountContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
    currency: { fontSize: 32, fontWeight: '600', color: '#6366f1', marginTop: 8 },
    amountText: { fontSize: 64, fontWeight: '800', color: '#111827', marginLeft: 8 },
    keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
    key: { width: '30%', height: 70, justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderRadius: 16, backgroundColor: '#f9fafb' },
    keyText: { fontSize: 24, fontWeight: '600', color: '#111827' },
    submitButton: { backgroundColor: '#6366f1', padding: 20, borderRadius: 20, alignItems: 'center', shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
    submitButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});

export default AddTransactionBottomSheet;
