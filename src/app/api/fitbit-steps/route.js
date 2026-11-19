import { getStepsToday } from "@/lib/googleHealth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const steps = await getStepsToday();
    return Response.json(steps, {
      // Let Vercel's CDN serve this for 10 minutes, so Google is asked at most ~6 times an hour.
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("Google Health error:", err);
    return Response.json({ error: "Failed to fetch steps" }, { status: 500 });
  }
}
