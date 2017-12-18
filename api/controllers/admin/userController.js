/**
 * /admin/userController
 *
 * @description :: Server-side logic for managing /admin/users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * 
     */
    getUserList: function (req, res) {
        User.find().exec(function (err, users) {
            if (err) {
                return res.serverError(err);
            }
            return res.view('user/userList', { Users: users });
        });
    },
    /**
     * 
     */
    setUserStatus: function (req, res) {
        var openid = req.query.openid || '';
        User.findOne({ openid: openid }).exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            } else {
                var status = 1;
                if (user.status == 1) {
                    status = 0;
                }
                console.log(status);
                User.update({ openid: openid }, { status: status }).exec(function afterwards(err, updated) {
                    if (err) {
                        return res.serverError(err);
                    } else {
                        return res.redirect("/admin/user/getUserList");
                    }
                });
            }
        });
    }
};

