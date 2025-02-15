import { useDispatch } from "react-redux";
import { addToBookmarks, removeFromBookmarks } from "../../store/reducers/recipeSlice";

const useBookmarks = () => {
    const dispatch = useDispatch();

    const handleAddToBookMark = (recipe: any) => {
        dispatch(addToBookmarks(recipe));
    };

    const handleRemoveFromBookmark = (idMeal: string) => {
        dispatch(removeFromBookmarks({ id: idMeal }));
    };

    return { handleAddToBookMark, handleRemoveFromBookmark };
};

export default useBookmarks;