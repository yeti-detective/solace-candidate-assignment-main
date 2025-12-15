import { describe, expect, test } from "@jest/globals";
import { mockAdvocates } from "./mockAdvocates";
import { filterAdvocates, formatPhoneNumber } from "./utils.ts";

describe("Utils", () => {
  describe("formatPhoneNumber", () => {
    test("returns an empty string for an un-formattable number", () => {
      expect(formatPhoneNumber(11)).toEqual("");
    });
    test("formats a number to a UI friendly string", () => {
      const exampleInput = 5553217654; // from db seed data
      const expectedFormattedString = "555-321-7654";

      expect(formatPhoneNumber(exampleInput)).toEqual(expectedFormattedString);
    });
    test("formats a 7 digit number like we used to have in the 90s", () => {
      const exampleInput = 7636307; // my number in elementary school
      const expectedFormattedString = "763-6307";

      expect(formatPhoneNumber(exampleInput)).toEqual(expectedFormattedString);
    });
  });

  describe("filterAdvocates", () => {
    test("filters on firstName", () => {
      const result = filterAdvocates(mockAdvocates, "John");
      expect(result).toHaveLength(2); // matches John Doe and Alice Johnson
      expect(result[0].firstName).toBe("John");
    });

    test("filters on lastName", () => {
      const result = filterAdvocates(mockAdvocates, "Smith");
      expect(result).toHaveLength(1);
      expect(result[0].lastName).toBe("Smith");
      expect(result[0].firstName).toBe("Jane");
    });

    test("filters on city", () => {
      const result = filterAdvocates(mockAdvocates, "Chicago");
      expect(result).toHaveLength(1);
      expect(result[0].city).toBe("Chicago");
      expect(result[0].firstName).toBe("Alice");
    });

    test("filters on degree", () => {
      const result = filterAdvocates(mockAdvocates, "PhD");
      expect(result).toHaveLength(5);
      result.forEach((advocate) => {
        expect(advocate.degree).toBe("PhD");
      });
    });

    test("filters on specialties", () => {
      const result = filterAdvocates(mockAdvocates, "ADHD");
      expect(result.length).toBeGreaterThan(0);
      result.forEach((advocate) => {
        const hasADHD = advocate.specialties.some((specialty) =>
          specialty.includes("ADHD"),
        );
        expect(hasADHD).toBe(true);
      });
    });

    test("filters on yearsOfExperience", () => {
      const result = filterAdvocates(mockAdvocates, "10");
      expect(result.length).toBeGreaterThan(0);
      result.forEach((advocate) => {
        expect(advocate.yearsOfExperience.toString()).toContain("10");
      });
    });

    test("returns multiple matches when search term is common", () => {
      const result = filterAdvocates(mockAdvocates, "MD");
      expect(result.length).toBeGreaterThan(1);
      result.forEach((advocate) => {
        expect(advocate.degree).toBe("MD");
      });
    });

    test("returns empty array when no matches found", () => {
      const result = filterAdvocates(mockAdvocates, "Nonexistent");
      expect(result).toHaveLength(0);
    });

    test("returns all advocates when search term is empty", () => {
      const result = filterAdvocates(mockAdvocates, "");
      expect(result).toHaveLength(mockAdvocates.length);
    });

    test("is not case-sensitive", () => {
      const resultLower = filterAdvocates(mockAdvocates, "john");
      const resultUpper = filterAdvocates(mockAdvocates, "John");
      expect(resultLower).toHaveLength(2);
      expect(resultUpper).toHaveLength(2);
    });

    test("matches partial strings", () => {
      const result = filterAdvocates(mockAdvocates, "San");
      expect(result.length).toBeGreaterThan(1);
      // Should match San Antonio, San Diego, San Jose, San Francisco
      const cities = result.map((advocate) => advocate.city);
      expect(cities.some((city) => city.includes("San"))).toBe(true);
    });
  });
});
