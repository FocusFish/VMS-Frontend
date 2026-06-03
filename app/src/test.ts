// This file is required by karma.conf.js and loads recursively all the .spec and framework files
// tslint:disable-next-line:no-import-side-effect
import "zone.js/testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import { environment } from "./environments/environment";
import { NgModule, provideZoneChangeDetection } from "@angular/core";

if (environment.strictTests === true) {
  console.warn = (message: string) => {
    throw new Error(message);
  };
}

@NgModule({
  providers: [provideZoneChangeDetection()],
})
class AppTestingModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, AppTestingModule],
  platformBrowserDynamicTesting(),
);
