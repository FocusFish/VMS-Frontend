export const formatDate = (datetime) => {
  const date = new Date(datetime);
  const iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
  return iso[1] + ' ' + iso[2];
};

export const formatTimestamp = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp);
  const iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
  return iso[1] + ' ' + iso[2];
};

export const convertToTimestamp = (datetime) => {
  return Math.floor(new Date(datetime).getTime() / 1000);
};

export const deg2rad = (degrees: number) => {
  return degrees * Math.PI / 180;
};

export const radToDeg = (rad: number) => {
  return (180.0 * (rad / Math.PI));
};

export const intToRGB = (i: number) => {
  // tslint:disable-next-line
  const c = (i & 0x00FFFFFF).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
};

export const hashCode = (str: string) => { // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // tslint:disable-next-line:no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const compareTableSortString = (a: string, b: string, isAsc: boolean) => {
  return ('' + a).localeCompare(b) * (isAsc ? 1 : -1);
};

export const compareTableSortNumber = (a: number, b: number, isAsc: boolean) => {
  const aValue = typeof a !== 'undefined' ? a : Number.MIN_VALUE;
  const bValue = typeof b !== 'undefined' ? b : Number.MIN_VALUE;
  return (aValue - bValue) * (isAsc ? 1 : -1);
};

/**
 * Returns the destination point from a given point, having travelled the given distance
 * on the given initial bearing.
 *
 * @param   lat - initial latitude in decimal degrees (eg. 50.123)
 * @param   lon - initial longitude in decimal degrees (e.g. -4.321)
 * @param   speed - Distance travelled / hour (metres).
 * @param   time - Traveltime in minutes.
 * @param   bearing - Initial bearing (in degrees from north).
 * @returns destination point as [latitude,longitude] (e.g. [50.123, -4.321])
 *
 * @example
 *     var p = destinationPoint(51.4778, -0.0015, 7794, 300.7); // 51.5135??N, 000.0983??W
 */
export const destinationPoint = (lat: number, lon: number, speed: number, time: number, bearing: number) => {
   const radius = 6371e3; // (Mean) radius of earth

   const distance = speed * (time / 60);

   const toRadians = (v) => v * Math.PI / 180;
   const toDegrees = (v) => v * 180 / Math.PI;

   // sin??2 = sin??1??cos?? + cos??1??sin????cos??
   // tan???? = sin????sin????cos??1 / cos?????sin??1??sin??2
   // see mathforum.org/library/drmath/view/52049.html for derivation

   const ?? = Number(distance) / radius; // angular distance in radians
   const ?? = toRadians(Number(bearing));

   const ??1 = toRadians(Number(lat));
   const ??1 = toRadians(Number(lon));

   const sin??1 = Math.sin(??1);
   const cos??1 = Math.cos(??1);
   const sin?? = Math.sin(??);
   const cos?? = Math.cos(??);
   const sin?? = Math.sin(??);
   const cos?? = Math.cos(??);

   const sin??2 = sin??1 * cos?? + cos??1 * sin?? * cos??;
   const ??2 = Math.asin(sin??2);
   const y = sin?? * sin?? * cos??1;
   const x = cos?? - sin??1 * sin??2;
   const ??2 = ??1 + Math.atan2(y, x);

   return [toDegrees(??2), (toDegrees(??2) + 540) % 360 - 180]; // normalise to ???180..+180??
};

/* tslint:disable:no-bitwise */
export const toUTF8Array = (str) => { // To UTF8 Byte array
  const utf8 = [];
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);
    if (charcode < 0x80) {
      utf8.push(charcode);
    } else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
    } else { // surrogate pair
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                | (str.charCodeAt(i) & 0x3ff));
      utf8.push(0xf0 | (charcode >> 18),
                0x80 | ((charcode >> 12) & 0x3f),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
    }
  }
  return utf8;
};
/* tslint:enable:no-bitwise */

export const findLastIndex = (array: Array<any> | ReadonlyArray<any>, predicate: (element: any) => boolean) => {
  for (let i = array.length - 1; i >= 0; --i) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
};

export const replacePlaceholdersInTranslation = (stringWithReplacements: string, replacements: any) => {
  const matches = stringWithReplacements.match(/\[\[\[([^\]\]\]]*)\]\]\]/g);
  if(matches === null) {
    return stringWithReplacements;
  }
  const replacementsAndValues = matches.map(match => {
    const replacementName = match.replace(/\[\[\[([^\]\]\]]*)\]\]\]/g, '$1');
    return { match, value: replacements[replacementName] };
  });

  return replacementsAndValues.reduce((acc, value) => {
    return acc.replace(value.match, value.value);
  }, stringWithReplacements);
};
