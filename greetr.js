;(function(global, $){

    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }

    Greetr.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName  = lastName  || '';
        self.language  = language  || 'en';

        self.validate(language);
    }

    var supportedLanguage = ['en', 'es'];

    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreeting = {
        en: 'Greeting',
        es: 'Saludos'
    };

    Greetr.prototype = {

        validate: function(language){
            if(supportedLanguage.indexOf(this.language) === -1){
                throw "Language not supported";
            }
        },

        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        }




    };

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.g$ = Greetr;

}(window, jQuery));