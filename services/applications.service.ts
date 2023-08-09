export function filterApplications(applications, filters) {
  let res = applications.data.fetchedConsumers?.filter((application) => {
    for (const param in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, param)) {
        const value = filters[param];
        if (value !== "" && !application[param].toString().includes(value)) {
          return false;
        }
      }
    }
    return true;
  });
  return res;
}
