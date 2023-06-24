export const checkValidWorksheetName = (name: string) => {
  // regex check name for valid alphanumeric characters and no spaces and special characters '-','_' are allowed
  const regex = /^[a-zA-Z0-9_ -]*$/;
  return regex.test(name);
};
