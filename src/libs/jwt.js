import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js'

// generamos un token para la auth
export function createAccessToken(payload) {
  console.log('jwt.js - payload-', payload);
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        console.log('jwt.js createAccesToken - token', token);
        resolve(token);
      }
    )
  })
}