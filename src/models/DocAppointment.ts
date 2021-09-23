export interface DocAppointment {
  date: DateClass;
  user: User;
}

export interface DateClass {
  seconds:     number;
  nanoseconds: number;
}

export interface User {
  converter: null;
  _key:      Key;
  type:      string;
  firestore: Firestore;
}

export interface Key {
  path: Path;
}

export interface Path {
  segments: string[];
  offset:   number;
  len:      number;
}

export interface Firestore {
  app:        App;
  databaseId: DatabaseID;
  settings:   Settings;
}

export interface App {
  _isDeleted:                      boolean;
  _options:                        Options;
  _config:                         Config;
  _name:                           string;
  _automaticDataCollectionEnabled: boolean;
  _container:                      Container;
}

export interface Config {
  name:                           string;
  automaticDataCollectionEnabled: boolean;
}

export interface Container {
  name:      string;
  providers: Providers;
}

export interface Providers {
}

export interface Options {
  apiKey:            string;
  authDomain:        string;
  projectId:         string;
  storageBucket:     string;
  messagingSenderId: string;
  appId:             string;
}

export interface DatabaseID {
  projectId: string;
  database:  string;
}

export interface Settings {
  host:                              string;
  ssl:                               boolean;
  ignoreUndefinedProperties:         boolean;
  cacheSizeBytes:                    number;
  experimentalForceLongPolling:      boolean;
  experimentalAutoDetectLongPolling: boolean;
  useFetchStreams:                   boolean;
}
