import { CreateMatch, Match } from "@/types/match";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMatchesByLeague(leagueId: string): Promise<Match[]> {
  try {
    const res = await fetch(`${API_URL}/matches/league/${leagueId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get my league: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error getting my league:", err);
    throw err;
  }
}

export async function createMatch(match: CreateMatch, token: string): Promise<CreateMatch> {
  try {
    const res = await fetch(`${API_URL}/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(match),
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