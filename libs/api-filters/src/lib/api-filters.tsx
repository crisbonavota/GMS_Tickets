export interface FilterItem {
    field: string,
    value?: string | number | boolean
}

export interface CustomFilter {
    name: string,
    value: any
}

export interface Range {
    start: number,
    end: number
}

export interface Sort {
    field: string,
    isAscending: boolean
}

export const insertStandardFilters = (params: { [key: string]: string }, filters: FilterItem[]) => {
    var processedFilters = filters.filter(filter => filter.value !== undefined);
    params['filters'] = JSON.stringify(processedFilters);
}

export const insertCustomFilters = (params: { [key: string]: string }, customFilters: CustomFilter[]) => {
    customFilters.forEach((filter) => {
        params[filter.name] = filter.value
    });
}

export const insertPagination = (params: { [key: string]: string }, pageIndex?: number, perPage?: number) => {
    const page = pageIndex ? pageIndex : 0;
    const itemsPerPage = perPage ? perPage : 10;
    const range:Range = { 
        start:  page * itemsPerPage,
        end: page * itemsPerPage + (itemsPerPage - 1)
    }
    params['range.Start'] = range.start.toString();
    params['range.End'] = range.end.toString();
}

export const insertSort = (params: { [key: string]: string }, sort?:Sort) => {
    params['sort'] = JSON.stringify(sort);
}
