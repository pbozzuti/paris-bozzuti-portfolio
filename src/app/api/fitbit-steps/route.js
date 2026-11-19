import { getStepsToday } from "@/lib/fitbit";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const steps = await getStepsToday();
    return Response.json(steps);
  } catch (err) {
    console.error("Fitbit error:", err);
    return Response.json({ error: "Failed to fetch steps" }, { status: 500 });
  }
}
