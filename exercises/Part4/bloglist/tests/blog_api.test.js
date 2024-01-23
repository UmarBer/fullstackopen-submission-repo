const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');
const Blog = require('../models/blog');

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  // test 1: blogs are returned as JSON
  test('blogs are returned as json', async () => {
    console.log('entered test');
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  // test 2: blogs have a property named id
  test('blogs have a property named id', async () => {
    const response = await api.get('/api/blogs');

    const ids = response.body.map((blog) => blog.id);

    for (const id of ids) {
      expect(id).toBeDefined();
    }
  });
});

describe('addition of a new note', () => {
  // test 3: a valid blog can be added
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'La inmortalidad del cangrejo',
      author: 'Umar',
      url: 'something/something',
      likes: 9000
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain('La inmortalidad del cangrejo');
  });

  // test 4: likes default to 0 if missing
  test('likes default to 0 if missing', async () => {
    const newBlog = {
      title: 'bla bla bla',
      author: 'Umar',
      url: 'bla/bla'
    };
    if (!newBlog.likes) newBlog.likes = 0;
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });
});

// test 5: deletion of a note
describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

// test 6: updating a blog
describe('updating a blog', () => {
  test('succeeds with status 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToDelete}.id`)
      .send({ likes: 99 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    expect(updatedBlog.likes).toBe(99);
  });
});

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'HSpec7er',
      name: 'Harvey',
      password: 'suits'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'superuser',
      password: 'superpassword'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
