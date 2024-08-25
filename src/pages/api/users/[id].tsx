// src/pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import userData from '@/data/users.json';
import { User } from '@/types/User';

// Define the response type for a single user
type UserResponse = User | { error: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const { id } = req.query;

  // Ensure id is provided and is a string
  if (typeof id === 'string') {
    // Find the user with the matching ID
    const user = userData.find(user => user.id === parseInt(id, 10));

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
