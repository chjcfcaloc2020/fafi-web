import { Team } from "@/types/team";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchMyTeams(token: string): Promise<Team[]> {
  try {
    const res = await fetch(`${API_URL}/teams/my-teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get league by id: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error getting league:", err);
    throw err;
  }
}

export async function getMyTeamsInLeague(leagueId: string, token: string): Promise<Team[]> {
  try {
    const res = await fetch(`${API_URL}/teams/${leagueId}/my-teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get league by id: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error getting league:", err);
    throw err;
  }
}

export async function getTeamsInLeague(leagueId: string): Promise<Team[]> {
  try {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get league by id: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error getting league:", err);
    throw err;
  }
}

export async function addTeamToLeague(leagueId: string, teamId: string, token: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/teams/${teamId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get league by id: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error getting league:", err);
    throw err;
  }
}