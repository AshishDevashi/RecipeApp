import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
// import ConformationSheet from '../components/ConformationSheet/ConformationSheet';
import CustomActionSheet from '../components/Common/ActionSheet';


/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
// registerSheet('conformationSheet', ConformationSheet);
registerSheet('customActionSheet', CustomActionSheet);
export { };

// declare module 'react-native-actions-sheet' {
//     interface Sheets {
//         conformationSheet: SheetDefinition<{ payload: { onPress: any, message: string, title?: string, btnTitle?: string } }>;
//     }
// }
declare module 'react-native-actions-sheet' {
    interface Sheets {
        customActionSheet: SheetDefinition<{ payload: { children: React.ReactNode, message: string, title?: string } }>;
    }
}