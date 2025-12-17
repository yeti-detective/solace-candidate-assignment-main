import { count, or, ilike, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
// import { advocateData } from "../../../db/seed/advocates";

const PAGE_SIZE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchTerm = searchParams.get("searchTerm") || "";

  // Ensure page is at least 1
  const currentPage = Math.max(1, page);
  const offset = (currentPage - 1) * PAGE_SIZE;

  // Build the where clause if searchTerm exists
  const whereClause = searchTerm.trim()
    ? or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        sql`CAST(${advocates.specialties} AS TEXT) ILIKE ${`%${searchTerm}%`}`,
        sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${`%${searchTerm}%`}`
      )
    : undefined;

  // Get paginated data with optional filtering
  const data = await db
    .select()
    .from(advocates)
    .where(whereClause)
    .limit(PAGE_SIZE)
    .offset(offset);

  // Get total count for pagination metadata with the same filter
  const [{ total }] = await db
    .select({ total: count() })
    .from(advocates)
    .where(whereClause);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return Response.json({
    data,
    pagination: {
      page: currentPage,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  });
}
