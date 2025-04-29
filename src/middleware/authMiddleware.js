import jwv from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido!" });
  }

  // Retira o token do Bearer Token
  const parts = authHeader.split(" ");
  if (parts.legth !== 2)
    return res.status(401).json({ error: "Token mal fornecido!" });

  const [scheme, token] = parts;

  // Verifica se o token é valido
  Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido!" });
    }

    // Adiciona o id do usuário ao request
    req.userId = decoded.id;
    return next();
  });
};

export default authMiddleware;
