import { Advocate } from "../../db/schema";
import { formatPhoneNumber } from "../utils";

interface IAdvocatesTableProps {
  advocates: Advocate[];
}

/**
 * Displays advocates' first name, last name, city, degree, specialties,
 * years of experience, and phone number
 *
 * @param advocates - list of Advocate data to display
 */
export function AdvocatesTable({ advocates }: IAdvocatesTableProps) {
  return (
    <table className="w-full table-fixed border-collapse">
      <thead>
        <tr className="border-b">
          <th className="w-[12%] text-left p-2">First Name</th>
          <th className="w-[12%] text-left p-2">Last Name</th>
          <th className="w-[12%] text-left p-2">City</th>
          <th className="w-[10%] text-left p-2">Degree</th>
          <th className="w-[20%] text-left p-2">Specialties</th>
          <th className="w-[14%] text-left p-2">Years of Experience</th>
          <th className="w-[20%] text-left p-2">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => {
          return (
            <tr
              key={`${advocate.firstName}_${advocate.lastName}_${advocate.phoneNumber}`}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-2">{advocate.firstName}</td>
              <td className="p-2">{advocate.lastName}</td>
              <td className="p-2">{advocate.city}</td>
              <td className="p-2">{advocate.degree}</td>
              <td className="p-2">
                {advocate.specialties.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </td>
              <td className="p-2">{advocate.yearsOfExperience}</td>
              <td className="p-2">
                <a href={`tel://${advocate.phoneNumber}`}>
                  {formatPhoneNumber(advocate.phoneNumber)}
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
