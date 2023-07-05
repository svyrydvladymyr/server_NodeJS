const {query, userToken, date} = require('../service');

class Users {
    async defaultUser(page, lang) {
        return {
            errors : {
                errMessage : '',
                SERVER_ERROR : ''
            },
            permission : {
                authorization : '0',
                rule : '0',
                page : page || 'home'
            },
            user : {
                id : '',
                name : '',
                surname : '',
                foto : 'img/no_user.png',
                email : '',
                phone : '',
                provider : '',
                lang : 'uk-UA',
                registered : ''
            },
            langPack : require(`../lang/${lang}`)
        };
    };

    async getUser(req, res, page, lang) {
        const DATAS = await this.defaultUser(page, lang);
        const sql = `SELECT * FROM users WHERE token = '${userToken(req, res)}'`;
        return await query(sql)
            .then((user) => {
                if (!user[0]) return DATAS;
                const {userid, name, surname, ava, email, provider, permission, registered} = user[0];
                DATAS.permission.rule = `${permission}`;
                DATAS.permission.authorization = '1';
                DATAS.user.id = userid;
                DATAS.user.name = name;
                DATAS.user.surname = surname;
                DATAS.user.lang = lang;
                DATAS.langPack = require(`../lang/${lang}`);
                if (page === 'person') {
                    DATAS.user.ava = ava;
                    DATAS.user.email = email;
                    DATAS.user.provider = provider;
                    DATAS.user.registered = date.show('yyyy-mm-dd hh:mi', registered);
                };
                return DATAS;
            })
    };
};

module.exports = new Users();