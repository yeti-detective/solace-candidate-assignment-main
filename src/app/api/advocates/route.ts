import { count } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
// import { advocateData } from "../../../db/seed/advocates";

const PAGE_SIZE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Ensure page is at least 1
  const currentPage = Math.max(1, page);
  const offset = (currentPage - 1) * PAGE_SIZE;

  // Get paginated data
  const data = await db
    .select()
    .from(advocates)
    .limit(PAGE_SIZE)
    .offset(offset);

  // Get total count for pagination metadata
  const [{ total }] = await db
    .select({ total: count() })
    .from(advocates);

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
