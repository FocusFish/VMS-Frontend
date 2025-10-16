import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GlobalSettingsHelper {
  public getDistanceUnits(): string[] {
    return ["km", "nm", "mi"];
  }

  public getSpeedUnits(): string[] {
    return ["kts", "kph", "mph"];
  }

  public getHomepages(): string[] {
    return [
      "positions",
      "exchange",
      "polling",
      "mobileTerminals",
      "assets",
      "alarms",
      "admin",
      "reporting",
      "today",
      "areaManagement",
      "subscription",
      "activity",
    ];
  }

  public getLanguages(): { code: string; name: string }[] {
    return [
      {
        code: "de-at",
        name: "German (Austria)",
      },
      {
        code: "nl-be",
        name: "Dutch (Belgium)",
      },
      {
        code: "bg-bg",
        name: "Bulgarian",
      },
      {
        code: "el-cy",
        name: "Cyprus (Greek)",
      },
      {
        code: "tr-cy",
        name: "Cyprus (Turkish)",
      },
      {
        code: "cs-cz",
        name: "Czech",
      },
      {
        code: "de-de",
        name: "German",
      },
      {
        code: "da-dk",
        name: "Danish",
      },
      {
        code: "et-ee",
        name: "Estonian",
      },
      {
        code: "es-es",
        name: "Spainsh",
      },
      {
        code: "fi-fi",
        name: "Finnish",
      },
      {
        code: "fr-fr",
        name: "French",
      },
      {
        code: "en-gb",
        name: "English (GB)",
      },
      {
        code: "el-gr",
        name: "Greek",
      },
      {
        code: "hr-hr",
        name: "Croatian",
      },
      {
        code: "hu-hu",
        name: "Hungarian",
      },
      {
        code: "en-ie",
        name: "English (Ireland)",
      },
      {
        code: "im-im",
        name: "English (Island of man)",
      },
      {
        code: "it-it",
        name: "Italian",
      },
      {
        code: "lt-lt",
        name: "Lithuanian",
      },
      {
        code: "fr-lu",
        name: "French (Luxembourg)",
      },
      {
        code: "de-lu",
        name: "German (Luxembourg)",
      },
      {
        code: "lv-lv",
        name: "Latvian",
      },
      {
        code: "mt",
        name: "Maltese",
      },
      {
        code: "nl",
        name: "Dutch",
      },
      {
        code: "pl",
        name: "Polish",
      },
      {
        code: "pt-pt",
        name: "Portuguese",
      },
      {
        code: "ro-ro",
        name: "Romanian",
      },
      {
        code: "si-si",
        name: "Slovenian",
      },
      {
        code: "sk-sk",
        name: "Slovak",
      },
      {
        code: "sv",
        name: "Swedish",
      },
    ];
  }

  getTimezones() {
    const minZone = -12;
    const maxZone = 12;
    const zones = [];

    function toTimezone(offset) {
      var hours: any = Math.abs(offset / 60);
      var mins: any = offset % 60;

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (mins < 10) {
        mins = "0" + mins;
      }

      return (offset < 0 ? "-" : "+") + hours + ":" + mins;
    }

    for (let i = minZone; i <= maxZone; i++) {
      const utcOffset = 60 * i;
      zones.push({
        code: String(utcOffset),
        text: toTimezone(utcOffset),
      });
    }

    return zones;
  }
}
