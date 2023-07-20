import { FilterItem, CustomFilter, Sort, Range, PatchObject } from "./types";

// Ultils from the tickets project
export const getOptionsFromEnum = (enumObject: any) => {
  const keyValues = Object.entries(enumObject).filter((x: any) => !isNaN(x[1]));
  return keyValues.map((option) => ({
    label: option[0],
    value: Number(option[1]),
  }));
};

export const mapEnumToName = <T extends Record<string, number | string>>(
  value: number | string,
  enumObject: T
) => {
  const entry = Object.entries(enumObject).find(([key, val]) => val === value);
  return entry ? entry[0] : "";
};

export const filtersToAPIFormat = (filters: FilterItem[]) => {
  const processedFilters = filters.filter(
    (filter) => filter.value !== undefined && filter.value !== null
  );
  return JSON.stringify(processedFilters);
};

export const currentPageToAPIRange = (currentPage: number, perPage: number) => {
  const start = currentPage * perPage;
  const end = start + perPage - 1;
  return {
    "range.Start": start,
    "range.End": end,
  };
};

export const sortToAPISort = (sort: Sort) => {
  return {
    "sort.Field": sort.field,
    "sort.IsAscending": sort.isAscending,
  };
};

export const generatePatchObject = (
  initialValues: Record<string, any>,
  newValues: Record<string, any>
): PatchObject[] => {
  const patchObjects: PatchObject[] = [];

  for (const key in newValues) {
    if (newValues.hasOwnProperty(key)) {
      const newValue = newValues[key];
      const initialValue = initialValues[key];

      if (newValue !== initialValue) {
        const patchObject: PatchObject = {
          path: `/${key}`,
          op: "replace",
          value: newValue,
        };
        patchObjects.push(patchObject);
      }
    }
  }

  return patchObjects;
};

// Original utils from GMS

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
