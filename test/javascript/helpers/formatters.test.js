import { responseToSession, extractTherapyRefs } from 'helpers/formatters';
import moment from 'moment';

describe('Formatting sessions', () => {
  const serverResponse = {
    id: 1,
    href: 'http://test.host/api/sessions/1',
    title: 'TherapySessionTitle',
    start_time: '2019-10-28T09:33:19.986Z',
    duration_minutes: 60,
    price_cents: 18000,
    therapy: {
      id: 1,
      href: 'http://test.host/api/therapies/1',
    },
  };

  const expectedResponse = {
    id: 1,
    href: 'http://test.host/api/sessions/1',
    title: 'TherapySessionTitle',
    startTime: moment('2019-10-28T09:33:19.986Z'),
    duration: 60,
    price: 180,
    therapy: {
      id: 1,
      href: 'http://test.host/api/therapies/1',
    },
  };

  it('formats therpay session responses', () => {
    expect(responseToSession(serverResponse)).toEqual(expectedResponse);
  });
});

describe('Extracting therapy refs', () => {
  const serverResponse = [
    {
      id: 1,
      href: 'http://test.host/api/sessions/1',
      title: 'TherapySessionTitle',
      start_time: '2019-10-28T09:33:19.986Z',
      duration_minutes: 60,
      price_cents: 18000,
      therapy: {
        id: 1,
        href: 'http://test.host/api/therapies/1',
      },
    },
  ];

  const extractedRefs = [{ id: 1, href: 'http://test.host/api/therapies/1' }];

  it('extracts therapy session references', () => {
    expect(extractTherapyRefs(serverResponse)).toEqual(extractedRefs);
  });
});
