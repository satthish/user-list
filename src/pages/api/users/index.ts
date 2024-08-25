import type { NextApiRequest, NextApiResponse } from "next";
import userData from '@/data/users.json';
import {User} from '@/types/User';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User[]>
) {
    res.status(200).json(userData);
}