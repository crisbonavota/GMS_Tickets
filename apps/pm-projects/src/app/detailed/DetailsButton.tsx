import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface Props {
    id: number;
    path: string;
}

const DetailsButton = ({ id, path }: Props) => {
    return (
        <Link to={`/project-management/${path}/${id}`}>
            <BiSearch size={20} color={'#3B8A7F'} />
        </Link>
    );
};

export default DetailsButton;
