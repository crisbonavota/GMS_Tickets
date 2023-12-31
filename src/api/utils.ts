import { FilterItem, CustomFilter, Sort, Range } from "./types";

export const insertStandardFilters = (
    params: { [key: string]: string },
    filters: FilterItem[]
) => {
    var processedFilters = filters.filter(
        (filter) => filter.value !== undefined && filter.value !== null
    );
    params["filters"] = JSON.stringify(processedFilters);
};

export const insertCustomFilters = (
    params: { [key: string]: string },
    customFilters: CustomFilter[]
) => {
    customFilters.forEach((filter) => {
        params[filter.name] = filter.value;
    });
};

export const insertPagination = (
    params: { [key: string]: string },
    pageIndex?: number,
    perPage?: number
) => {
    const page = pageIndex ? pageIndex : 0;
    const itemsPerPage = perPage ? perPage : 10;
    const range: Range = {
        start: page * itemsPerPage,
        end: page * itemsPerPage + (itemsPerPage - 1),
    };
    params["range.Start"] = range.start.toString();
    params["range.End"] = range.end.toString();
};

export const insertSort = (params: { [key: string]: string }, sort?: Sort) => {
    if (!sort) return;
    params["sort.Field"] = sort.field;
    params["sort.IsAscending"] = sort.isAscending.toString();
};
