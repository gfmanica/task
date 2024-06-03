export const isoToLocalDateString = (isoDate: Date) => {
  const date = new Date(isoDate);

  return new Date(
    date.getTime() + date.getTimezoneOffset() * 60000,
  ).toLocaleDateString();
};
