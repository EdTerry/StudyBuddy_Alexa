

var AlexaLambdaHandler = require('./lib/alexa');  //
//var APP_ID = undefined; //  TODO -- TEMP

module.exports.handler = AlexaLambdaHandler.LambdaHandler;
module.exports.CreateStateHandler = AlexaLambdaHandler.CreateStateHandler;
module.exports.StateString = AlexaLambdaHandler.StateString;


var languageStrings = {
    "en-US": {
        "translation": {
          /*  "FACTS": [
                "A year on Mercury is just 88 days long.",

            ],*/
            "SKILL_NAME" : "American Space Facts",
            "GET_FACT_MESSAGE" : "Here's your question: ",
            "HELP_MESSAGE" : "Say here's a question, you can also say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    //alexa.APP_ID = APP_ID;  //Disabled
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//Dictionary - Empty array
var dict = [];

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetQuestion');
    },
    'GetNewQuestionIntent': function () {
        this.emit('GetQuestion');
    },
    'GetNewAnswerIntent': function () {
        this.emit('GetAnswer');
    },

    //Used to randomize questions/answers
    //var factIndex = Math.floor(Math.random() * factArr.length);
/*
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');``
      //var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
*/

//Random value pulls index from both Q_LIST[] and A_LIST[] for reciting the questions later

//Dictionary sample in JSON -



//  string QA_Dictionary { "key" : "value" };
// Key - Question
// Value - Answer

  //This function obtains questions from user, adds them to dictionary
    'GetQA' : function () {
        var question;
        var answer;

        this.emit(':ask', 'Give me a question!', 'Please, give me a question.');
          question = ???;	//TODO: Raw user input needs to be stored for this

        this.emit(':ask', 'Give me an answer', 'Please, give me an answer!');
          answer = ???; //TODO: Raw user input needs to be stored for this

          dict.push({
              key:   question,
              value: answer
          });

          //TODO: Prompt for another
    },

//This function obtains answers from user, adds them to A_LIST[].
/*    'GetAnswer' : function () {
        this.emit(':ask', 'Give me an answer', 'Please, give me an answer!');
    },
*/
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
