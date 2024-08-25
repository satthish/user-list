import type { NextApiRequest, NextApiResponse } from "next";
import cityData from '@/data/cities.json';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(200).json(cityData);
}