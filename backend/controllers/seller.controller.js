import jwt from "jsonwebtoken";

// LOGIN endpoint
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: false,   // IMPORTANT for localhost
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });

  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
};

// CHECK AUTH end point 
export const checkAuth = async (req, res) => {
  res.status(200).json({ success: true });
};

// LOGOUT end point
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      success: true,
      message: "Logged out",
    });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};