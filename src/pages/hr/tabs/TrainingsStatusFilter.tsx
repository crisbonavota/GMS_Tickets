import { getTrainingsStates } from "../../../api/api";
import SyncSingleValueSelector from "./trainings/SyncSingleValueSelector";

interface Props {
    setter: (value: number | null) => void;
}

const TrainingsStatusFilter = ({ setter }: Props) => {

    return (
        <SyncSingleValueSelector
            setter={setter}
            label={"Status"}
            data={getTrainingsStates()}
            labelProp={"label"}
            valueProp={"value"}
        />
    );
};

export default TrainingsStatusFilter;
