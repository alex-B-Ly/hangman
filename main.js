// file REQ
var prompt = require('prompt');
var Word = require('./Word.js');

// Start Prompt
prompt.start();

// Game object
var game = {
  wordBank: ['rat', 'cat', 'bat'],
  guessesRemaining: 10,
  currentWrd: null,

  // startGame method: Gets random string from wordbank array and creates new word object
  startGame: function(wrd){
    this.currentWrd = new Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);
    this.currentWrd.getLets();
    this.keepPromptingUser();
  },

  keepPromptingUser: function(){
    var self = this;

    prompt.get(['guessLetter'], function(err, result){
      console.log('The letter or space you guessed is ' + result.guessLetter);
      var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

      if(findHowManyOfUserGuess === 0){
        console.log('You guessed wrong.');
        self.guessesRemaining--;
      }else{
        console.log('You guessed right.');
        // Check if game has been won
        if(self.currentWrd.didWeFindTheWord() === true){
          console.log('You won!');
          return 1;
        }else{
          console.log('Guesses remaining: '+self.guessesRemaining);
          console.log(self.currentWrd.wordRender());
        }
      }
      if(self.guessesRemaining>0 && self.currentWrd.found === false){
        self.keepPromptingUser();
      }else if(self.guessesRemaining === 0){
        console.log('Game over, bro.');
        console.log(self.currentWrd.word);
      }else{
        console.log(self.currentWrd.wordRender());
      }

    });
  }

}
debugger;
game.startGame();