export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(value));

export const calcTimeLeft = (value) => {
  const d1 = new Date().getTime();
  const d2 = new Date(value).getTime();
  return Math.round((d2 - d1) / 60000);
};

export const isValidPhone = (value) => /^\+?[1-9][0-9]{7,14}$/.test(value);
