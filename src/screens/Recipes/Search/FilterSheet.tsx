import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import AppText from '../../../components/Common/AppText'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { MEALDBAPI } from '../../../utils/constants';
import AppButton from '../../../components/Common/AppButton';
function FilterSheet() {
    const [areas, setAreas] = useState([]);
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

    const fetchData = async () => {
        const response = await fetch(MEALDBAPI.LISTALLAREA);
        const data = await response.json();
        setAreas(data.meals);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const toggleBadge = (title: string) => {
        setSelectedBadges((prev) =>
            prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
        );
    };

    const handleFilterPress = () => {

    };

    return (
        <View style={styles.container}>
            <AppText size="md" weight="bold" style={styles.title}>Filter Search</AppText>
            <View>
                <AppText size="md" weight="bold" style={styles.sectionTitle}>Area</AppText>
                <View style={styles.badgeContainer}>
                    {areas.map((c: any, index) => (
                        <Badge
                            key={index}
                            title={c.strArea}
                            selected={selectedBadges.includes(c.strArea)}
                            onPress={() => toggleBadge(c.strArea)}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title="Filter" onPress={handleFilterPress} />
            </View>
        </View>
    );
}

export default FilterSheet;

const Badge = ({ title, selected, onPress }: { title: string; selected: boolean; onPress: () => void }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.badge,
                { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.primary : 'transparent' }
            ]}
            onPress={onPress}
        >
            <AppText
                color={selected ? 'white' : 'primary'}
                size="md"
                weight="semiBold"
            >
                {title}
            </AppText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        marginBottom: 10,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
    },
    badge: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
});