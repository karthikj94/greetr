// IIFE prefixed with ; inorder to avoid issue, if 
// previously included .js files misses ;
;(function(global, $){

    // 'new' an object
    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }

    // the actual object is created here 
    // allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName  = lastName  || '';
        self.language  = language  || 'en';

        self.validate();
    }

    // hidden within the scope of the IIFE and never directly accessible
    var supportedLanguage = ['en', 'es'];

    //informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    //formal greetings
    var formalGreetings = {
        en: 'Greeting',
        es: 'Saludos'
    };

    // prototype holds methods (to save memory space)
    Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time
        
        // check that is a valid language
        // references the externally inaccessible 
        //'supportedLangs' within the closure
        validate: function(){
            if(supportedLanguage.indexOf(this.language) === -1){
                throw "Language not supported";
            }
        },

        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },

        // retrieve messages from object by referring
        // to properties using [] syntax
        greeting: function(){
            return greeting[this.language] + ' ' + this.firstName
            + '!';
        },

        formalGreeting: function(){
            return formalGreetings[this.language] + ' ' 
            + this.fullName();
        },

        // displays the greeting in the browser
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

            // inject the message in the chosen place in the DOM
            $(selector).html(greetMessage);

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        }, 

        setLanguage: function(lang){
            
            // set the language
            this.language = lang;

            // validate
            this.validate();

            // make chainable
            return this;
        }

    };

    // trick borrowed from jQuery so we don't have 
    // to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide 
    // a shorthand '' for ease of use
    global.Greetr = global.g$ = Greetr;

}(window, jQuery));