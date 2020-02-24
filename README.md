## About

this is it

## Installation

just start a docker compose

```
docker-compose up
```

It will start a web server that will listen on 80 port of doittest.localhost host so you may want to add this binding in your `/etc/hosts` file

```
127.0.0.1 doittest.localhost
```

## Usage

Use postman, curl or whatever you like to make HTTP requests to a `doittest.localhost:80`

There also are few shortcurs like `npm run list`. Full list of them see in package.json in scripts section

## API

all APIs use POST method:

path | description
-----|--------
/health | should respond with 'OK' if service is running
/reset | remove all data from DB
/import | import data from CSV file. Expect file to be put in `data`
/patient/count | return a number patients records
/patient/list  | return a full list of patients (with scheduled emails if any)
/patient/listMissingFirstName | return list of patients where with missing first name
/patient/listWithConsentAndNoEmail | return a list of patients where email address is missing but consent is Y
/patient/verifyEmailsForConsented | return list of patients with consent = true and with no email shcheduled for all days in cadence

## TODO

There are some thing to improve which are out of scrope for this test-task:

- use Typescript
- validation
- error handling
- move credentials to env file
- use volume to store database file on host-machine
- use bulk methods for import
- use eslint