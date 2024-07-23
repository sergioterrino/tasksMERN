import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  console.log('validateToken - authRequired - token ->', token);
  if (!token) return res.status(401).json({ message: "Not token. Authorization denied" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).json({ message: "Invalid token"});

    req.user = user // save en la req, ya que así las demás request tendran los datos del user
    
    next();
  });
}