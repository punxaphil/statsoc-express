const API_HOST = `http://localhost:8080`;

export async function getPlayers() {
  return (await fetch(`${API_HOST}/players`)).json();
}

export async function deletePlayer(player: string): Promise<void> {
  const response = await fetch(`${API_HOST}/players/${player}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export async function savePlayer(player: string): Promise<void> {
  const response = await fetch(`${API_HOST}/players?name=${player}`, {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export async function getStats(player: string) {
  return (await fetch(`${API_HOST}/stats?name=${player}`)).json();
}

export async function saveStats(player: string, description: string, count: string): Promise<void> {
  const response = await fetch(`${API_HOST}/stats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ player, description, count })
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}
