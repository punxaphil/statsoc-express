import { createBrowserRouter, Link, Outlet } from 'react-router-dom';
import React from 'react';
import Players from './components/players';
import Stats from './components/stats';
import { deletePlayer, getPlayers, getStats, savePlayer, saveStats } from './services/api';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Outlet /></div>,
    children: [
      {
        path: 'players/:player',
        element: <Players />,
        loader: async ({ params }) => {
          const players = await getPlayers();
          return { players, selectedPlayer: params.player };
        },
        action: async ({ request, params }) => {
          try {
            if (request.method === 'DELETE') {
              const name = params.player;
              if (!name) {
                return { error: 'No player name to delete' };
              }
              await deletePlayer(name);
            }
            if (request.method === 'POST') {
              const formData = await request.formData();
              const name = formData.get('name') as string;
              await savePlayer(name);
            }
          } catch (e) {
            return { error: 'Failed to save or delete player' };
          }
          return { success: 'Player saved or deleted' };
        }
      },
      {
        path: 'stats/:player',
        element: <Stats />,
        loader: async ({ params }) => {
          if (params.player) {
            const stats = await getStats(params.player);
            console.log(stats);
            return { stats, selectedName: params.player };
          } else {
            throw new Error('No stats found');
          }
        },
        action: async ({ request, params }) => {
          if (params.player) {
            const formData = await request.formData();
            const count = formData.get('count') as string;
            const category = formData.get('category') as string;
            try {
              await saveStats(params.player, category, count);
            } catch (e) {
              return { error: 'Failed to save or delete player' };
            }
            return { success: 'Player saved or deleted' };
          }
        }

      }

    ]
  },
  {
    path: '*',
    element: <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  }
]);

