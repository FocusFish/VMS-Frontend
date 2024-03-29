// This file is required by karma.conf.js and loads recursively all the .spec and framework files
// tslint:disable-next-line:no-import-side-effect
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { environment } from './environments/environment';

declare const require: any;

if(environment.strictTests === true) {
  console.warn = (message: string) => {
    throw new Error(message);
  };
}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
