;(function(global, $){

    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }

    Greetr.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName  = lastName  || '';
        self.language  = language  || 'en';

        self.validate();
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

        validate: function(){
            if(supportedLanguage.indexOf(this.language) === -1){
                throw "Language not supported";
            }
        },

        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },

        greeting: function(){
            return this.greeting[this.language] + ' ' + this.firstName
            + '!';
        },

        formalGreeting: function(){
            return this.formalGreeting[this.language] + ' ' 
            + this.fullName();
        },

        greet: function(selector, greetFormat){
            if(!$){
                throw "jQuery not loaded";
            }

            if(!selector){
                throw "Missing jQuery selector";
            }
            
            var greetMessage;

            if(greetFormat){
                greetMessage = this.formalGreeting();
            }
            
            else{
                greetMessage = this.greeting;
            }

            $(selector).html(msg);

            return this;
        }, 

        setLanguage: function(lang){
            this.language = lang;
            this.validate();
            return this;
        }

    };

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.g$ = Greetr;

}(window, jQuery));