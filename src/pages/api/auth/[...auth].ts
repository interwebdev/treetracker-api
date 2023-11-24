import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

const handleAuthRequest = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req", req.query);
  res.status(200).json({ hello: "world" });
};

export default handleAuthRequest;
