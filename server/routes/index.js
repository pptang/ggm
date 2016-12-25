const Express = require('express');
const apiRoutes = Express.Router();
var FantasySports = require('FantasySports');
FantasySports.options({
    "accessTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_request_token",
    "requestTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_token",
    "oauthKey": "dj0yJmk9ZnlhWFVoUjNsNEF5JmQ9WVdrOWQwOHpUVGx6TkhNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1kNA--",
    "oauthSecret": "e4eaedbf20a3ca3a44cdc7639fa123a9506b0611",
    "version": "1.0",
    "callback": "http://lima-workshop.com/auth/oauth/callback",
    "encryption": "HMAC-SHA1"
});
apiRoutes.get('/auth/oauth', (req, res) => {
  FantasySports.startAuth(req, res);
});
apiRoutes.get('/auth/oauth/callback', (req, res) => {
  FantasySports.endAuth(req, res);
});

apiRoutes.get('/myteam', (req, res) => {
  FantasySports
        .request(req, res)
        .api('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/leagues?format=json')
        .done(function(data) {
            var leagueData = data.fantasy_content.users[0].user[1].games[0].game[1].leagues,
                leagues = [];

            _.each(leagueData, function(value) {
                if (value.league) leagues.push(value.league[0]);
            });

            res.json(leagues);
        });
});
module.exports = apiRoutes;