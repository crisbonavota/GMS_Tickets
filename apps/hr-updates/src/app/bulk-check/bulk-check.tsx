import styles from './bulk-check.module.css';

/* eslint-disable-next-line */
export interface BulkCheckProps {}

export function BulkCheck(props: BulkCheckProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to BulkCheck!</h1>
        </div>
    );
}

export default BulkCheck;
