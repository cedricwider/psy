export const patientToRequest = patient => ({
  id: patient.id,
  salutation: patient.salutation,
  first_name: patient.firstName,
  last_name: patient.lastName,
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
export const responseToPatient = response => ({
  id: response.id,
  salutation: response.salutation,
  firstName: response.first_name,
  lastName: response.last_name,
  address: {
    street: response.addresses[0].street,
    houseNumber: response.addresses[0].house_number,
    zip: response.addresses[0].zip,
    town: response.addresses[0].town,
    country: response.addresses[0].country,
  },
});
