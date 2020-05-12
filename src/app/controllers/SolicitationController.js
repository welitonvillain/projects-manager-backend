import Solicitation from '../models/Solicitation';
import Project from '../models/Project';
import User from '../models/User';

class SolicitationController {
  async store(req, res) {
    const { code, user_id, project_id } = req.body;

    const solicitation = await Solicitation.findOne({ where: { code } });

    if (solicitation) {
      return res.status(400).json({ error: 'Solicitation already exists' });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User does not match' });
    }

    const { id, title } = await Solicitation.create(req.body);

    return res.json({
      id,
      code,
      title,
      user_id,
      project_id,
    });
  }

  async update(req, res) {
    const { id, project_id } = req.body;

    const solicitation = await Solicitation.findByPk(id);

    if (!solicitation) {
      return res.status(400).json({ error: 'Solicitation does not match' });
    }

    const project = await Project.findByPk(project_id);

    if (project_id && !project) {
      return res.status(400).json({ error: 'Project does not match' });
    }

    if (project_id && solicitation.project_id !== null) {
      return res
        .status(401)
        .json({ error: 'Solicitation already has a registered project' });
    }

    const { code, title, user_id } = await Solicitation.update(req.body);

    return res.json({
      id,
      code,
      title,
      user_id,
      project_id,
    });
  }
}

export default new SolicitationController();
