import { League, LeagueInvitation, Invitation } from "@/types/league";

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
      throw new Error(`Failed to get my league: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error getting my league:", err);
    throw err;
  }
}

export async function getAllLeagues(): Promise<League[]> {
  try {
    const res = await fetch(`${API_URL}/leagues`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch leagues: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching leagues:", err);
    throw err;
  }
}

export async function getLeagueById(id: string, token: string): Promise<League> {
  try {
    const res = await fetch(`${API_URL}/leagues/${id}`, {
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

export async function getLeagueByIdNotAuth(id: string): Promise<League> {
  try {
    const res = await fetch(`${API_URL}/leagues/${id}`, {
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

export async function checkExistsManagerInLeague(id: string, token: string): Promise<Boolean> {
  try {
    const res = await fetch(`${API_URL}/invitations/${id}/check-in`, {
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

export async function checkIfOrganizer(id: string, token: string): Promise<Boolean> {
  try {
    const res = await fetch(`${API_URL}/leagues/${id}/is-organizer`, {
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

export async function updateLeague(id: string, league: League, token: string): Promise<League> {
  try {
    const res = await fetch(`${API_URL}/leagues/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(league),
    });

    if (!res.ok) {
      throw new Error(`Failed to update league: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error updating league:", err);
    throw err;
  }
}

export async function deleteLeague(id: string, token: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/leagues/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete league: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error deleting league:", err);
    throw err;
  }
}

export async function getMyInvitations(token: string): Promise<LeagueInvitation[]> {
  try {
    const res = await fetch(`${API_URL}/invitations/my-invitations`, {
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

export async function acceptByManager(leagueId: string, manager_username: string, status: string, token: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/invitations/${leagueId}/manager/${manager_username}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({status}),
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

export async function sendInvitation(manager_username: string, league_id: string, token: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/invitations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        manager_username,
        league_id
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send invitation: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error sending invitation:", err);
    throw err;
  }
}