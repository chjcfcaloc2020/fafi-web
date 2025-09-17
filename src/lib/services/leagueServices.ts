import { League } from "@/types/league";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createLeague(league: League, token: string): Promise<League> {
  try {
    const res = await fetch(`${API_URL}/leagues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(league),
    });

    if (!res.ok) {
      throw new Error(`Failed to create league: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error creating league:", err);
    throw err;
  }
}

export async function getMyLeagues(token: string): Promise<League[]> {
  try {
    const res = await fetch(`${API_URL}/leagues/my-leagues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to create league: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error creating league:", err);
    throw err;
  }
}