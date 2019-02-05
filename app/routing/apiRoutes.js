var _ = require('lodash/core');
var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        debugger;
        res.json(friends)
    })

    // Add new friend entry
    app.post('/api/friends', function (req, res) {
        var user = req.body;
        console.log("user", user);
        console.log("user scores", user.scores);
        var scores = _.map(user.scores, function(v) { return parseInt(v); });


        var totals = [];
        for (var i = 0; i < friends.length; i++) {
            var total = 0;
            for (var n = 0; n < scores.length; n++) {
                var diff = Math.abs(scores[n] - friends[i].scores[n]);
                total += diff;
            }
            totals.push(total);
        }
        console.log("totals", totals);
        var min = Math.min.apply(null, totals);
        var index = totals.indexOf(min);
        var match = friends[index];
        friends.push(user);

        console.log("match", match);

        res.json({ status: 'OK', match: match });
    });
}