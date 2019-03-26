export const patientToRequest = patient => ({
  id: patient.id,
  salutation: patient.salutation,
  first_name: patient.firstName,
  last_name: patient.lastName,
  phone: patient.phone,
  addresses: [
    {
      street: patient.address.street,
      house_number: patient.address.houseNumber,
      zip: patient.address.zip,
      town: patient.address.town,
      country: patient.address.country,
    },
  ],
});
export const responseToPatient = (response) => {
  const serverAddress = response.addresses[0] || {};
  return {
    id: response.id,
    salutation: response.salutation,
    firstName: response.first_name,
    lastName: response.last_name,
    phone: response.phone,
    address: {
      street: serverAddress.street,
      houseNumber: serverAddress.house_number,
      zip: serverAddress.zip,
      town: serverAddress.town,
      country: serverAddress.country,
    },
  };
};
