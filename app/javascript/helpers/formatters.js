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
export const responseToPatient = (response) => {
  /* TODO: Implement as soon as needed */
};
