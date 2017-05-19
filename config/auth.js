/* 
THIS FILE DEFINES THE CREDENTIALS TO USE TO BE ABLE TO COMMUNICATE WITH THE EXTERNAL API'S 
THESE INFORMATIONS ARE SENSITIVE !! DO NOT DIVULGATE !!

HOW TO RETRIEVE THESE INFORMATIONS :

FACEBOOK :

> Subscribe your app on https://developers.facebook.com/
> In Parametères > Général > "Ajouter une plateforme" > "URL du site" = http://localhost/ (if local) > Domaines de l'app = localhost (if local)
> clientID = ID de l'app ; clientSecret = Clé secrète

GOOGLE :

> Subscribe your app on https://console.developers.google.com/apis/api?project=authenticatemodule&hl=FR
> Tableau de bord > Activer une API > Select Google+ API > Activate
> Identifiants > Créer des identifiants > ID client OAuth > Type d'application : Application Web 
	> Nom = AuthenticationModule ; Origines JavaScript autorisées : http://localhost:8080 (if local) ; 
	  URI de redirection autorisés : http://localhost:8080/auth/google/callback (if local)
> clientID = ID client ; clientSecret = Code secret du client

SLACK :

> Subscribe your app on https://api.slack.com/apps?new_app=1
> Basic Information > App Credentials > clientID = Client ID ; clientSecret = Client Secret
> OAuth & Permissions > Redirect URLs > http://localhost:8080/connect/slack/callback & http://localhost:8080/auth/slack/callback (if local)
> OAuth & Permissions > Permission Scopes > Add :
	> commands : Add commands to 303%.
	> incoming-webhook : Post to specific channels in Slack.
	> chat:write:bot : Send messages as Smartwork Tracking System.
	> dnd:read : Access the team’s Do Not Disturb settings.
	> team:read : Access information about your team.
	> users.profile:read : Access user’s profile and team profile fields.
	> users:read : Access your team’s profile information.
	> users:read.email : View email addresses of people on this team.

> You can generate token for your team here : https://api.slack.com/custom-integrations/legacy-tokens in order to do requests to the Slack API

COBOT :

> Subscribe your app on https://www.cobot.me/oauth2_clients
> Register your application 
	> Name = Smartwork Tracking System 
	> Main Application URL = http://localhost:8080 (if local and if 8080) 
	> Redirect URI = "" (can stay empty)
	> Scope = "" (encode the scopes below separated with spaces or see API Cobot documentation)
> OAuth2 details for Smartwork Tracking System > clientID = Client Id ; clientSecret = Client Secret
> Your access token is delivered below
*/

module.exports = {
	'facebookAuth' : {
		'clientID': '',
		'clientSecret': '',
		'profileFields': ['id','displayName','email'],
		'callbackURL': 'http://localhost:8080/auth/facebook/callback'
	},

	'googleAuth' : {
		'clientID': '',
		'clientSecret': '',
		'callbackURL': 'http://localhost:8080/auth/google/callback'
	},
	'slackAuth' : {
		'clientID': '',
		'clientSecret': '',
		'callbackURL': 'http://localhost:8080/auth/slack/callback',
		'scope': ['identity.basic', 'identity.email', 'identity.team', 'identity.avatar']
	},
	'cobotAuth' : {
		'clientID': '',
		'clientSecret': '',
		'callbackURL': 'http://localhost:8080/auth/cobot/callback',
		'scope': ['read_check_ins', 'team', 'read', 'write', 'checkin', 'checkin_tokens', 'read_memberships']
	}
}
