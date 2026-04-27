# Hospital APIs (wards, rooms, beds, patients, doctors, admissions)

Base URL: `http://localhost:<PORT>/api`

Protected routes require header: `Authorization: Bearer <accessToken>` (from `/api/auth/login` or `/api/auth/register`).

## Wards

| Method | Path             | Auth     |
| ------ | ---------------- | -------- |
| GET    | `/wards`         | Public   |
| GET    | `/wards/:wardId` | Public   |
| POST   | `/wards`         | Required |
| PATCH  | `/wards/:wardId` | Required |
| DELETE | `/wards/:wardId` | Required |

## Rooms

| Method | Path                     | Auth     |
| ------ | ------------------------ | -------- |
| GET    | `/rooms?wardId=&status=` | Public   |
| GET    | `/rooms/:roomId`         | Public   |
| POST   | `/rooms`                 | Required |
| PATCH  | `/rooms/:roomId`         | Required |
| DELETE | `/rooms/:roomId`         | Required |

## Beds

| Method | Path                                 | Auth     |
| ------ | ------------------------------------ | -------- |
| GET    | `/beds/availability?wardId=&roomId=` | Public   |
| GET    | `/beds?wardId=&roomId=&status=`      | Public   |
| GET    | `/beds/:bedId`                       | Public   |
| POST   | `/beds`                              | Required |
| PATCH  | `/beds/:bedId`                       | Required |
| DELETE | `/beds/:bedId`                       | Required |

## Patients

| Method | Path                              | Auth               |
| ------ | --------------------------------- | ------------------ |
| POST   | `/patients`                       | Required           |
| GET    | `/patients/:patientId/admissions` | Required (history) |
| GET    | `/patients/:patientId`            | Required           |
| PATCH  | `/patients/:patientId`            | Required           |
| DELETE | `/patients/:patientId`            | Required           |

## Doctors

| Method | Path                           | Auth     |
| ------ | ------------------------------ | -------- |
| GET    | `/doctors?status=&department=` | Public   |
| GET    | `/doctors/:doctorId`           | Public   |
| POST   | `/doctors`                     | Required |
| PATCH  | `/doctors/:doctorId`           | Required |
| DELETE | `/doctors/:doctorId`           | Required |

## Admissions (book bed + discharge)

| Method | Path                                 | Auth                                                 |
| ------ | ------------------------------------ | ---------------------------------------------------- |
| POST   | `/admissions`                        | Required — creates admission and sets bed `OCCUPIED` |
| PATCH  | `/admissions/:admissionId/discharge` | Required — discharges and frees bed                  |
| GET    | `/admissions/:admissionId`           | Required                                             |

### Typical flow

1. `POST /api/wards` → `POST /api/rooms` with `wardId` → `POST /api/beds` with `wardId` + `roomId`.
2. `POST /api/patients` and `POST /api/doctors`.
3. `POST /api/admissions` with `patientId`, `doctorId`, `wardId`, `roomId`, `bedId`, and clinical fields.
4. `PATCH /api/admissions/:admissionId/discharge` when the stay ends.
5. `GET /api/patients/:patientId/admissions` for history.
