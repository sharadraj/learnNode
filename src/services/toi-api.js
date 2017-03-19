var utils = require('/home/sharad/Documents/learnNode/src/utils.js');
var constants = require('/home/sharad/Documents/learnNode/src/constants.js');

var newsAPI = {

	getToiNews : function(req, res){

		let url = utils.buildHttpUrl(constants.HTTP_GET, constants.TOI_FEED_URL);
		utils.httpRequest(url).then(resp => {
                let data = resp.content.toString();
                res.render('toi-api',{title : 'Inside news content'});
               // resolve(parseCaseDetails(resp.content.toString(), side))
            }).catch(error => {
                console.log('error in fetching toi news:', error)
                return;
            });
	}
}

module.exports = newsAPI;