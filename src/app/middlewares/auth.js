import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  console.log('Autorizacao: ', authorization);

  if (!authorization) {
    return res.status(401).json({ error: 'Token was not provided.' });
  }

  // separa o authorization entre o Bearer e o hash
  const [, token] = authorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    req.userProfile = decoded.profile_id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
