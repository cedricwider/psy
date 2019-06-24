import 'babel-polyfill';

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

export const responseToTherapy = response => ({
  active: response.active,
  id: response.id,
  patients: response.patients,
  price: response.price_cents / 100,
  title: response.title,
});

export const therapyToRequest = therapy => ({
  active: therapy.active,
  id: therapy.id,
  patients: therapy.patients,
  price_cents: therapy.price * 100,
  title: therapy.title,
});

export const responseToSession = response => ({
  id: response.id,
  title: response.title,
  startTime: response.start_time,
  duration: response.duration_minutes / 60,
  price: response.price_cents / 100.0,
});

export const sessionToRequest = session => ({
  id: session.id,
  title: session.title,
  start_time: session.startTime,
  duration_minutes: session.durtaion * 60,
  price_cents: session.price * 100,
});

export const extractPatientRefs = therapiesResponse => therapiesResponse.map(therapy => therapy.patients).flat();
export const attachPatientsToTherapies = (therapies, patients) => {
  const thrps = JSON.parse(JSON.stringify(therapies)); // "clone" object
  patients.forEach((patient) => {
    const patientTherapies = thrps.filter(t => t.patients.map(p => p.id).includes(patient.id));
    patientTherapies.forEach((therapy) => {
      const patientIndex = therapy.patients.findIndex(p => p.id === patient.id && p !== patient);
      therapy.patients[patientIndex] = patient;
    });
  });
  return thrps;
};
