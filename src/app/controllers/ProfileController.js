import Profile from '../models/Profile';

class ProfileController {
  async store(req, res) {
    const profile = await Profile.findOne({ where: { code: req.body.code } });

    if (profile) {
      return res.status(401).json({ error: 'Profile already exists.' });
    }

    const { id, code, name, description } = await Profile.create(req.body);

    return res.json({
      id,
      code,
      name,
      description,
    });
  }
}

export default new ProfileController();
