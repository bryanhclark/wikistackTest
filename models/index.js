var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikiTest', { logging: false });


const Page = db.define('Page', {
    title: { type: Sequelize.STRING, allowNull: false },
    urlTitle: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    status: { type: Sequelize.ENUM('open', 'closed') }
}, {
        getterMethods: {
            route: function () {
                return '/wiki/' + this.urlTitle;
            }
        }
    })


const User = db.define('User', {
    name: { type: Sequelize.STRING, allowNull: false },
    email: {
        type: Sequelize.STRING, allowNull: false,
        validate: {
            isEmail: true
        }
    },


})

Page.belongsTo(User, { as: 'author' });


module.exports = {
    db: db,
    Page: Page,
    User: User
}