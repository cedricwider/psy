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
export const extractPatientRefs = therapiesResponse => therapiesResponse.map(therapy => therapy.patients).flat();
export const attachPatientsToTherapies = (therapies, patients) => {
  const pats = JSON.parse(JSON.stringify(patients));
  pats.forEach((patient) => {
    // TODO: One patient can be in multiple therapies...! <-- there's currently a BUG
    const therapy = therapies.find(t => t.patients.map(p => p.id).includes(patient.id));
    const patientIndex = therapy.patients.findIndex(p => p.id === patient.id);
    therapy.patients[patientIndex] = patient;
  });
  return pats;
};
