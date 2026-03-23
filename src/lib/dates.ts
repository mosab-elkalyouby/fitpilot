export const formatDate = (date: Date) => date.toISOString().slice(0, 10);

export const humanDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const getDateRange = (startIso: string, endIso: string) => {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const result: string[] = [];
  const onDate = new Date(start);
  while (onDate <= end) {
    result.push(formatDate(onDate));
    onDate.setDate(onDate.getDate() + 1);
  }
  return result;
};
