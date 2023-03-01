import { trainingsStatesValues } from "../../../api/api";
import SyncSingleValueSelector from "./trainings/SyncSingleValueSelector";

interface Props {
    setter: (value: number | null) => void;
}

const TrainingsStatusFilter = ({ setter }: Props) => {
    const states = trainingsStatesValues;

    return (
        <SyncSingleValueSelector
            setter={setter}
            label={"Status"}
            data={states}
            labelProp={"label"}
            valueProp={"value"}
        />
    );
};

export default TrainingsStatusFilter;
