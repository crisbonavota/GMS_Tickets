export const parseTotalPagesHeader = (
    setter: (totalPages: number | null) => void,
    header?: string
) => {
    if (!header) return;
    const pagesAmount = parseInt(header, 10);
    if (isNaN(pagesAmount)) return;
    setter(pagesAmount);
};
