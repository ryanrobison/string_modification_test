$(function(){

    function modifyString(phrase) {

      var _self = this,
          phrase = phrase,
          words = phrase.split(' ');

      // Test if given character is in the alpabet.
      _self.isAlpha = function(char) {

        return /^[a-zA-Z()]+$/.test(char);

      }

      // Loop though object to get the size/count of properties.
      _self.objLength = function(obj) {

        var size = 0;

        for (var key in obj) {
          
          if (obj.hasOwnProperty(key)) {

            size++;

          }

        }

        return size;

      }

      // Get the index of the first alphabit character in the string.
      _self.firstCharIndex = function(word) {

        var index = 0,
            chars = word.split('');

        $.each(chars, function(idx, char) {

          if ( _self.isAlpha(char) ) {
            index = idx;
            return false;
          }

        });

        return index;

      }

      // Get the index of the last alphabit character in the string.
      _self.lastCharIndex = function(word) {

        var index = 0,
            chars = word.split('');

        $.each(chars.reverse(), function(idx, char) {

          if ( _self.isAlpha(char) ) {
            index = idx;
            return false;
          }

        });

        return ( (chars.length - 1) - index);

      }

      // Loop through phrase to get words
      $.each(words, function(idx, word) {

          var uniqeChars = {},
              nonLetters = {},
              chars = word.split(''),
              firstCharIdx = _self.firstCharIndex(word),
              lastCharIdx = _self.lastCharIndex(word);

          // Loop through the characters of a word to get unique character counts.
          $.each(chars, function(index, char) {

              if ( index !== firstCharIdx && index !== lastCharIdx ) {

                // If character is a letter count distinct letters
                // Else print out symbol / number.
                if ( _self.isAlpha(char) && index !== firstCharIdx && index !== lastCharIdx ) {

                  uniqeChars[char] = uniqeChars[char]+1 || 1;

                } else {

                  nonLetters[index] = char;

                }
                
              }

          });

          var charCount = _self.objLength(uniqeChars),
              firstNonLetter = '',
              lastNonLetter = '',
              symbols = '',
              output = '';

          // Output a non alphabit character if it apparears before the first occurance of a alphabit characher.
          // Delete non alphabit character from object to not repeat character later on.
          if ( nonLetters[0] !== undefined ) {

            firstNonLetter = nonLetters[0];
            delete nonLetters[0];

          }

          // Output a non alphabit character if it apparears after the last occurance of a alphabit characher.
          // Delete non alphabit character from object to not repeat character later on.
          if ( nonLetters[chars.length - 1] !== undefined) {

            lastNonLetter = nonLetters[chars.length - 1];
            delete nonLetters[chars.length - 1];

          }

          // Output any other non alphabit characters in the string.
          $.each(nonLetters, function(index, char) {

            symbols += char;

          });

          // Build output string.
          output = firstNonLetter + chars[firstCharIdx] + symbols + charCount + chars[lastCharIdx] + lastNonLetter;

          // Output result to page.
          $('#result').append( output + '</br>');

      });

    }

    // Run code on submition of form on index.html page.
    $('#phrase_form').on('submit', function(event) {

      event.preventDefault();

      var phrase = $('#phrase').val();

      // Empty results container to clear out previous results.
      $('#result').html('');
      
      if (phrase.length > 0 ) {

        modifyString( phrase );
      }


    });

});