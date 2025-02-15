import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View } from 'react-native';
import ActionSheet, {
    ScrollView,
    SheetProps,
} from 'react-native-actions-sheet';


function CustomActionSheet(props: SheetProps<'customActionSheet'>) {
    const { colors } = useTheme();
    const { payload, sheetId } = props;
    const { children } = payload as any;
    const actionSheetRef = useRef<any>();

    return (
        <ActionSheet
            key={sheetId}
            containerStyle={{
                backgroundColor: colors.background,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
            }}
            indicatorStyle={{
                width: 100,
                backgroundColor: 'black',
                marginTop: 20,
            }}
            gestureEnabled={true}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={() =>
                    actionSheetRef.current?.handleChildScrollEnd()
                }
            >
                <View style={{ padding: 20 }}>
                    {children}
                </View>
            </ScrollView>
        </ActionSheet>
    );
}

export default CustomActionSheet;
