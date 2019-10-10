const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const PostModel = require('./models/post');


const { DATABASE_NAME, USERNAME, PASSWORD, HOST, DIALECT } = require('./constants')

const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
    host: HOST, dialect: DIALECT, pool: {
        max: 10, min: 0, acquire: 30000, idle: 10000
    }
}

)

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

User.hasMany(Post);

sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created here!`)
    })

module.exports = {
    User,
    Post
}