import { VStack } from '@chakra-ui/react';
import { downloadFile, generateExcelFileURL } from '@gms-micro/api-utils';

const onExport = (isSuccess: boolean, base64?: string) => {
    isSuccess && base64 && downloadFile(generateExcelFileURL(base64), `gms_updates_report_${new Date(Date.now()).toISOString()}.xlsx`);
}

const App = ({ authHeader }: { authHeader: string }) => {
    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            
        </VStack>
    )
}

export default App
