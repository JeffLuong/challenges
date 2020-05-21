function delay(time, state, response) {
  return new Promise((res, rej) => {
    const resOrRej = state ? res : rej;
    setTimeout(resOrRej, time, response);
  });
}

const Central = new Map([[1, 'db1'], [2, 'db2'], [3, 'db3']]);

const Db1 = new Map([
  [1, { username: 'boppy', country: 'Canada' }]
]);
const Db2 = new Map([
  [2, { username: 'pobby', country: 'Norway' }]
]);
const Db3 = new Map([
  [3, { username: 'doody', country: 'Finland' }]
]);

const Vault = new Map([
  [1, { firstname: 'Ellie', lastname: 'Miga', email: 'ellie@miga.com' }],
  [2, { firstname: 'Isabel', lastname: 'Rila', email: 'isabel@rila.com' }],
  [3, { firstname: 'Jeff', lastname: 'Koko', email: 'jeff@koko.com' }]
])

function defaultConfig() {
  return {
    central: (id) => delay(100, true, Central.get(id)),
    db1: (id) => delay(120, true, Db1.get(id)),
    db2: (id) => delay(100, true, Db2.get(id)),
    db3: (id) => delay(112, true, Db3.get(id)),
    vault: (id) => delay(200, true, Vault.get(id)),
    mark: (id) => delay(50, true, { message: `User ${id} has been marked` })
  };
}

function createServices(config = {}) {
  return {
    ...defaultConfig(),
    ...config
  };
}

function ApiCall(Services, id) {
  return new Promise((res, rej) => {
    Promise.all([
      Services.central(id)
        .catch(() => Promise.reject('Error central'))
        .then(db => Services[db](id).catch(() => Promise.reject(`Error ${db}`))),
      Services.vault(id)
        .catch(() => Promise.reject('Error vault'))
    ])
    .then(([basic, details]) => {
      Services.mark(id).catch(() => {});
      const { username, country } = basic;
      const { firstname, lastname, email } = details;
      res({
        id,
        firstname,
        lastname,
        username,
        email,
        country
      });
    })
    .catch(e => rej(e));
  });
};

const tests = [
  ApiCall(createServices(), 1),
  ApiCall(createServices({ central: () => delay(200, false, 'Bleh')}), 1),
  ApiCall(createServices(), 2),
  ApiCall(createServices({ db3: () => delay(220, false, 'Nope') }), 3),
  ApiCall(createServices({ db2: () => delay(135, false, 'Bloop') }), 2),
  ApiCall(createServices({ vault: () => delay(500, false, 'Blap') }), 1),
  ApiCall(createServices(), 3)
];

const expect = [
  {
    id: 1,
    firstname: 'Ellie',
    lastname: 'Miga',
    username: 'boppy',
    email: 'ellie@miga.com',
    country: 'Canada'
  },
  'Error central',
  {
    id: 2,
    firstname: 'Isabel',
    lastname: 'Rila',
    username: 'pobby',
    email: 'isabel@rila.com',
    country: 'Norway'
  },
  'Error db3',
  'Error db2',
  'Error vault',
  {
    id: 3,
    firstname: 'Jeff',
    lastname: 'Koko',
    username: 'doody',
    email: 'jeff@koko.com',
    country: 'Finland'
  }
];

Promise.allSettled(tests)
  .then(results => {
    results.forEach(({ value, reason }, idx) => {
      const result = expect[idx];
      let passed;
      if (value) {
        passed = Object.entries(value).every(([key, val]) => val === result[key]);
      }
      if (reason) {
        passed = reason === result;
      }
      console.log(`${passed ? 'PASSED' : 'FAILED'} Test ${idx + 1}. Correct result expected:`);
      console.log(value || reason);
      console.log('======================');
    });
  });