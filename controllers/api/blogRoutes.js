const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');


// router.get('/', async (req, res) => {
//   try {
//     const blogData = await Blog.findAll({
//       title: req.body.title,
//       content: req.body.content,
//       id: req.session.id

//     });
//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk({
//       title: req.body.title,
//       content: req.body.content,
//       id: req.session.id

//     });
//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update({
      title: req.body.title,
      content: req.body.content,
    },
    {
    where: {id: req.params.id}
    }
    );
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
      id: req.params.id,
      user_id: req.session.user_id,
      },
  });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
