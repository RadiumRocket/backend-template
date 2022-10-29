import 'dotenv/config';

// import firebaseAdmin from 'firebase-admin';
// import { UserRecord } from 'firebase-admin/lib/auth/user-record';
// import { DeleteResult } from 'mongodb';
// import mongoose from 'mongoose';
// import { FirebaseUser } from '../src/interfaces/firebase';
// import User, { UserType } from '../src/models/user';
import config from './config';
import allData from './data';

// interface data {
// 	firebaseUsers: FirebaseUser[];
// 	users: typeof User[];
// }

const env = (process.env.DATABASE_NAME as keyof typeof allData | undefined) || 'develop';

// const { users }: data = allData[env];

// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert({
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//   }),
// });

(async () => {
  console.log('\x1b[33m', '                      ----------------------');
  console.log('\x1b[33m', '|-------------------- | Board configuration | --------------------|');
  console.log('\x1b[33m', '                      ----------------------');
  console.log('\x1b[33m', '    Seeding env:', `\x1b[37m${env}\n`);
  Object.entries(config).forEach((item) => {
    if (typeof item[1] === 'boolean') {
      console.log('\x1b[33m%s\x1b[1m', `     📝 ${item[0]} ${item[1]}`, '\x1b[0m');
    } else if (typeof item[1] === 'object') {
      const label = Object.entries(item[1])
        .filter((subItem) => subItem[1])
        .map((subItem) => subItem[0]);
      if (label.length) {
        console.log('\x1b[33m%s\x1b[1m', `     🛠  ${item[0]} ==> ${label}`, '\x1b[0m');
      }
    }
  });

  // -------------- DATABASE CONNECTION -------------- [start]
  // await mongoose.connect(`${process.env.MONGO_URL}`, {
  //   user: process.env.DATABASE_USER,
  //   pass: process.env.DATABASE_PASS,
  //   dbName: process.env.DATABASE_NAME,
  // });

  console.log(
    '\n\x1b[32m',
    '|-------------------- ✅ Database connected ----------------------|\n',
  );
  // -------------- DATABASE CONNECTION -------------- [end]

  try {
    if (config.remove) {
      console.log(
        '\x1b[33m',
        '|-------------------- ⚙️  Removing previous data ------------------|',
      );
      // ------------ REMOVE FIREBASE USERS ----------- [start]
      // const promises: Promise<DeleteResult>[] = [];
      // // remove firebase users
      // let removeFirebaseUsers: Promise<void>[] = [];
      // if (config.firebaseUsers.remove) {
      //   const firebaseCurrentUsers = await firebaseAdmin.auth().listUsers();
      //   removeFirebaseUsers = firebaseCurrentUsers.users.map((user) => {
      //     return firebaseAdmin.auth().deleteUser(user.uid);
      //   });
      // }
      // ------------ REMOVE FIREBASE USERS -------- [end]

      // ------------ REMOVE MONGODB COLLECTIONS -- [start]
      if (config.users.remove) {
        // promises.push(User.collection.deleteMany({}));
        console.log(
          '\x1b[32m',
          '|-------------------- ✅ Users removed ---------------------------|',
        );
      }
      // ------------ REMOVE MONGODB COLLECTIONS -- [end]

      // await Promise.all([Promise.all(removeFirebaseUsers), Promise.all(promises)]);

      console.log();
    }

    if (config.create) {
      console.log(
        '\x1b[33m',
        '|-------------------- ⚙️  Adding new data -------------------------|',
      );
      const promises: Promise<unknown>[] = [];
      // ------------ CREATE FIREBASE USERS ----------- [start]
      // let createFirebaseUsers: Promise<UserRecord>[] = [];
      // if (config.firebaseUsers.create) {
      //   createFirebaseUsers = firebaseUsers.map((user) => {
      //     const userType = user.type;
      //     const isNewUser = user.isNewUser;
      //     return firebaseAdmin
      //       .auth()
      //       .createUser({ ...user })
      //       .then(async (userRecord) => {
      //         await firebaseAdmin
      //           .auth()
      //           .setCustomUserClaims(userRecord.uid, { userType, isNewUser });
      //         return userRecord;
      //       });
      //   });
      // }
      // ------------ CREATE FIREBASE USERS ----------- [end]

      // ------------ HELPERS ----------- [start]
      // const createdUsers = await Promise.all(createFirebaseUsers);
      // const superAdminWithFirebaseUid = superAdmins.map((superAdmin, id) => {
      //   return {
      //     ...superAdmin,
      //     firebaseUid: createdUsers[id]?.uid,
      //   };
      // });
      // ------------ HELPERS ----------- [end]

      // ------------ UPLOAD MONGODB COLLECTIONS -- [start]
      if (config.users.create) {
        // promises.push(User.collection.insertMany(users));
        console.log(
          '\x1b[32m',
          '|-------------------- ✅ Users added -----------------------------|',
        );
      }
      // ------------ UPLOAD MONGODB COLLECTIONS -- [end]
      await Promise.all(promises);

      console.log('\x1b[0m');
    }
    process.exit();
  } catch (err) {
    console.log('\x1b[0m', err);
    process.exit();
  }
})();
