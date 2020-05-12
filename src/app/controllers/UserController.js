import User from '../models/User';
import Cell from '../models/Cell';
import Profile from '../models/Profile';

class UserController {
  async store(req, res) {
    const { code, name, email, password, cell_id, profile_id } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const cell = await Cell.findByPk(cell_id);

    if (!cell) {
      return res.status(400).json({ error: 'Cell does not match.' });
    }

    const profile = await Profile.findByPk(profile_id);

    if (!profile) {
      return res.status(400).json({ error: 'Profile does not match.' });
    }

    const { id } = await User.create({
      code,
      name,
      email,
      password,
      profile_id,
      cell_id,
    });

    return res.json({
      id,
      code,
      name,
      email,
    });
  }
}

export default new UserController();
