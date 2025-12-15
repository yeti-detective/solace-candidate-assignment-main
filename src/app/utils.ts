/**
 * Formats input number (representative of a phone number) to a UI-friendly string 
 * @param phoneNumber - from the Postgres DB 
 */ 
export const formatPhoneNumber = (phoneNumber: Number): string => {
  const stringFromNumber = phoneNumber.toString();
  const stringLength = stringFromNumber.length;
  switch(stringLength) {
    case 10:
      return `${stringFromNumber.slice(0,3)}-${stringFromNumber.slice(3, 6)}-${stringFromNumber.slice(6)}`;
    case 7:
      return `${stringFromNumber.slice(0,3)}-${stringFromNumber.slice(3)}`;
    default:
      // what could this mean?
      return ""
  }
}

/**
 * Case-insensitive filter function for advocates data 
 * @param advocates - from the API response 
 * @param searchTerm - term user means to search, will be trimmed and lower-cased 
 */ 
export const filterAdvocates = (advocates: Advocate[], searchTerm: string): Advocate[] => {
  const processedSearchTerm = searchTerm.trim().toLowerCase();
  return advocates.filter((advocate) => {
    return (
        advocate.firstName.toLowerCase().includes(processedSearchTerm) ||
        advocate.lastName.toLowerCase().includes(processedSearchTerm) ||
        advocate.city.toLowerCase().includes(processedSearchTerm) ||
        advocate.degree.toLowerCase().includes(processedSearchTerm) ||
        advocate.specialties.join('').toLowerCase().includes(processedSearchTerm) ||
        advocate.yearsOfExperience.toString().toLowerCase().includes(processedSearchTerm)
    )
  })
}
