module.exports = {
//  rules for fields maping from external to internall format
//  nulls are for autoformatting
//  only listed here fields will be parsed
  fieldMapping: {
    'Program Identifier': 'id',
    'source': 'WEB 3RD PARTY',
    'Card Number': null,
    'Member ID': null,
    'First Name': null,
    'Last Name': null,
    'Date of Birth': 'birthDate',
    'Address 1': null,
    'Address 2': null,
    City: null,
    State: null,
    'Zip code': 'zip',
    'Telephone number': null,
    'Email Address': 'email',
    CONSENT: null,
    'Mobile Phone': 'phone'
  },
  cadence: [
    '01/04/2020',
    '02/04/2020',
    '03/04/2020',
    '04/04/2020',
    '05/04/2020',
  ]
}