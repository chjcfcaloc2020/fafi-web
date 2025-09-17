import { Player } from "@/types/player";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createPlayer(player: Player, token: string) {
  try {
    const res = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(player),
    });
    
    if (!res.ok) {
      throw new Error(`Failed to create player: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error creating player:", err);
    throw err;
  }
}

export async function getPlayerById(playerId: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/players/${playerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to create player: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error creating player:", err);
    throw err;
  }
}

export async function updatePlayer(id: number, teamId: string, player: Player, token: string) {
  try {
    const res = await fetch(`${API_URL}/players/${id}/team/${teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(player),
    });

    if (!res.ok) {
      throw new Error(`Failed to update player: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error updating player:", err);
    throw err;
  }
}

export async function deletePlayer(id: number, teamId: string, token: string) {
  try {
    const res = await fetch(`${API_URL}/players/${id}/team/${teamId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete player: ${res.status}`);
    }

    return true;
  } catch (err) {
    console.error("Error deleting player:", err);
    throw err;
  }
}
