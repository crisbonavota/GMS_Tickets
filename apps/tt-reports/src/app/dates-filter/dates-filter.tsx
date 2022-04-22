import styles from './dates-filter.module.css';

/* eslint-disable-next-line */
export interface DatesFilterProps {}

export function DatesFilter(props: DatesFilterProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to DatesFilter!</h1>
        </div>
    );
}

export default DatesFilter;
