import * as mongoose from 'mongoose';

// rename DBHelperTemplate to DBHelper and change connection string to
// mongodb://username:password@host:port/database?options...
export class DBHelperTemplate {
  static init(): void {
    mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('Connection to mongoDB successful'))
      .catch((e: Error) => console.log(`Could not connect to mongo.\n\n${e}`));
  }
}
