import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken)
    return res.status(401).json({ success: false });

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (decoded.email === process.env.SELLER_EMAIL)
      next();
    else
      return res.status(403).json({ success: false });

  } catch (err) {
    return res.status(401).json({ success: false });
  }
};