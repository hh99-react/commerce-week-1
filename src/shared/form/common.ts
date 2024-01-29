export const getKoreaTimeDate = () => {
  const koreaTimeZoneOffset = 9 * 60; // 한국은 UTC+9
  const currentUTCDate = new Date();
  const koreaTimeDate = new Date(
    currentUTCDate.getTime() + koreaTimeZoneOffset * 60000
  );

  return koreaTimeDate;
};
