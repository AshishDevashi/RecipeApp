import React, { useEffect, useState } from 'react'
import { useRoute, useTheme } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../../../components/Common/AppText';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FALLBACKIMAGE, MEALDBAPI } from '../../../utils/constants';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getYouTubeVideoId } from '../../../utils/helper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import useBookmarks from '../../../hooks/bookmark';

interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strYoutube: string;
    strInstructions: string;
    [key: string]: any;
}

interface Ingredient {
    id: number;
    ingredient: string;
    measurement: string;
}

function RecipeDetails({ navigation }: any) {
    const bookMarks = useSelector((state: RootState) => state.recipe.bookMarks);
    const { handleAddToBookMark, handleRemoveFromBookmark } = useBookmarks();
    const [recipeData, setRecipeData] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { params }: any = useRoute();
    const { colors } = useTheme();
    const isBookMarks = bookMarks.find((v) => v.idMeal === params.recipe?.idMeal);

    const fetchData = async () => {
        try {
            const response = await fetch(`${MEALDBAPI.LOOKMEALBYID}?i=${params?.recipe?.idMeal}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipe data');
            }
            const data = await response.json();
            if (data.meals) {
                setRecipeData(data.meals[0]);
            } else {
                setError('No recipe found.');
            }
        } catch (error) {
            console.error('Error fetching recipe data:', error);
            setError('Failed to fetch recipe data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getIngredientsAndMeasurements = (): Ingredient[] => {
        const ingredients: Ingredient[] = [];

        if (recipeData) {
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipeData[`strIngredient${i}`];
                const measurement = recipeData[`strMeasure${i}`];

                if (ingredient && ingredient.trim() !== '') {
                    ingredients.push({
                        id: i,
                        ingredient,
                        measurement: measurement || '',
                    });
                }
            }
        }

        return ingredients;
    };

    const renderIngredient = ({ item }: { item: Ingredient }) => (
        <View style={styles.ingredientItem}>
            <AppText style={styles.ingredientText}>{item.ingredient}</AppText>
            <AppText style={styles.measurementText}>{item.measurement}</AppText>
        </View>
    );

    const handleBookMark = () => {
        if (recipeData) {
            if (isBookMarks) {
                handleRemoveFromBookmark(recipeData.idMeal);
            } else {
                const dataToSave = {
                    idMeal: recipeData.idMeal,
                    strMeal: recipeData.strMeal,
                    strMealThumb: recipeData.strMealThumb,
                    strCategory: recipeData.strCategory,
                };
                handleAddToBookMark(dataToSave);
            }
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={[styles.container, { backgroundColor: colors.primary }]}>
                    <ActivityIndicator size="large" color={colors.background} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={[styles.container, { backgroundColor: colors.primary }]}>
                    <AppText size="lg" weight="bold" color="white">{error}</AppText>
                </View>
            </SafeAreaView>
        );
    }

    if (!recipeData) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={[styles.container, { backgroundColor: colors.primary }]}>
                    <AppText size="lg" weight="bold" color="white">No recipe found.</AppText>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={30} color="white" />
                    </TouchableOpacity>
                    <AppText size="xxl" weight="bold" color="white">Recipe</AppText>
                    <TouchableOpacity onPress={handleBookMark}>
                        <AntDesign name={isBookMarks ? "heart" : "hearto"} size={30} color={isBookMarks ? "red" : "white"} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        <Image
                            source={{ uri: recipeData.strMealThumb || FALLBACKIMAGE }}
                            style={styles.recipeImage}
                        />
                        <View style={styles.detailsContainer}>
                            <AppText size="xl" weight="bold">{recipeData.strMeal}</AppText>
                            <AppText size="sm" style={styles.subText}>{recipeData.strCategory}</AppText>
                            <AppText size="sm" style={styles.subText}>{recipeData.strArea}</AppText>

                            <AppText size="md" weight="bold" style={styles.sectionHeader}>Ingredients:</AppText>
                            <FlatList
                                data={getIngredientsAndMeasurements()}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderIngredient}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                            />
                            <YoutubePlayer
                                height={200}
                                play={false}
                                videoId={getYouTubeVideoId(recipeData.strYoutube)}
                            />
                            <AppText size="md" weight="bold" style={styles.sectionHeader}>Steps:</AppText>
                            <AppText size="md">{recipeData.strInstructions}</AppText>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default RecipeDetails;


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    header2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    content: {
        flex: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    popularRecipesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    ingredientText: {
        fontSize: 16,
        flex: 1,
    },
    measurementText: {
        fontSize: 16,
        marginLeft: 16,
        color: '#666',
    },
    recipeImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    detailsContainer: { marginTop: 30 },
    subText: { marginTop: -8 },
    sectionHeader: { marginTop: 10 },
    video: {
        width: '100%',
        height: 300, // Adjust height as needed
    },
});
