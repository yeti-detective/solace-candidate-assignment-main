/**
 * Formats input number (representative of a phone number) to a UI-friendly string
 * @param phoneNumber - from the Postgres DB
 */
export const formatPhoneNumber = (phoneNumber: Number): string => {
  const stringFromNumber = phoneNumber.toString();
  const stringLength = stringFromNumber.length;
  switch (stringLength) {
    case 10:
      return `${stringFromNumber.slice(0, 3)}-${stringFromNumber.slice(3, 6)}-${stringFromNumber.slice(6)}`;
    case 7:
      return `${stringFromNumber.slice(0, 3)}-${stringFromNumber.slice(3)}`;
    default:
      // what could this mean?
      return "";
  }
};

