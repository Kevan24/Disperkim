export const validateUser = (req, res, next) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      message: "Username, password, dan role wajib diisi."
    });
  }

  const allowedRoles = ["admin", "user"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      message: "Role harus berupa 'admin' atau 'user'."
    });
  }

  next();
};
