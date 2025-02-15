import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import AppText from '../../../components/Common/AppText'
import { useDispatch } from 'react-redux';
import { addToMyRecipe } from '../../../store/reducers/recipeSlice';
import AppInput from '../../../components/Common/AppInput';
import AppButton from '../../../components/Common/AppButton';
import * as Yup from 'yup'
import DP, { DocumentPickerResponse } from 'react-native-document-picker';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.string().required('Ingredients are required'),
});

export default function Add({ navigation }: any) {
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const handleAddToMyRecipe = (values: any) => {
        const newRecipe = {
            id: Math.random().toString(),
            title: values.title,
            description: values.description,
            ingredients: values.ingredients,
            image: values.image,
        };
        dispatch(addToMyRecipe(newRecipe));
        navigation.navigate('Recipe')
    };

    const handleImageUpload = async (setFieldValue: any) => {
        try {
            const results: DocumentPickerResponse[] = await DP.pick({
                type: [DP.types.images],
            });
            setFieldValue('image', results[0]);
        } catch (err: any) {
            if (DP.isCancel(err)) {
                console.log('User canceled the picker');
            } else {
                throw err;
            }
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='chevron-left' size={30} color='white' />
                    </TouchableOpacity>
                    <AppText size='xxl' weight='bold' color='white'>Add Recipe</AppText>
                    <View style={{ width: 30, height: 30 }} />
                </View>
                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        <Formik
                            initialValues={{ title: '', description: '', ingredients: '', image: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleAddToMyRecipe}
                        >
                            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                                <>
                                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                        {
                                            values.image?.uri ?
                                                <Image
                                                    source={{ uri: values.image?.uri }}
                                                    style={{ width: 100, height: 100, borderRadius: 10 }}
                                                />
                                                :
                                                <TouchableOpacity onPress={() => handleImageUpload(setFieldValue)} style={{ width: 100, height: 100, borderWidth: 1, borderColor: colors.primary, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon name='plus' color={colors.primary} size={20} />
                                                </TouchableOpacity>
                                        }
                                    </View>
                                    <AppInput
                                        placeholder="Recipe Title"
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        error={touched.title && errors.title && errors.title}
                                    />

                                    <AppInput
                                        placeholder="Recipe Description"
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        multiline={true}
                                        error={touched.description && errors.description && errors.description}
                                    />

                                    <AppInput
                                        placeholder="Ingredients"
                                        value={values.ingredients}
                                        onChangeText={handleChange('ingredients')}
                                        onBlur={handleBlur('ingredients')}
                                        multiline={true}
                                        error={touched.ingredients && errors.ingredients && errors.ingredients}
                                    />
                                    <AppButton title="Add to My Recipes" onPress={handleSubmit} />
                                </>
                            )}
                        </Formik>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

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
});