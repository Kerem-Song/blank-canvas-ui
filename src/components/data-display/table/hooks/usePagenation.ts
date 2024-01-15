import { ITablePagination } from '../Table.types';

export const usePagenation = <RecordType>(
  pagenation?: ITablePagination,
  dataSource?: RecordType[],
) => {
  const source = dataSource ?? [];
  if (!pagenation) {
    return { page: 1, perPage: 10, resultItems: source };
  }
  const page = pagenation?.page ?? 1;
  const perPage = pagenation?.perPage ?? 10;

  const start = (page - 1) * perPage;
  const end = Math.min(start + perPage, source.length || 0);
  const pagenateItems =
    pagenation && source.length > (pagenation.perPage ?? 0)
      ? source.slice(start, end)
      : source;

  return { page, perPage, resultItems: pagenateItems };
};
