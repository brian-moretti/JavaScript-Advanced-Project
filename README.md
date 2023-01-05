# JavaScript-Advanced-Project di Brian Moretti

I'm a student of Start2Impact Univeristy and this is my 3rd project made for them.

## About the project

The project consists the building of an App to boosts the reading of books using the external service [OpenLibrary](https://openlibrary.org/developers/api).

Starting with a "textbox", the user can search a specific category of a book. (one word or multi words)  
The App will contact the API of OpenLibrary and shows a list of books selected from the category choosen.
Clicking a book the App will show a box-modal with the cover, the author, the title and the description of the choosen book.

### - Build with

This project has been made only with HTML, CSS and JavaScript.  
No external libraries has been used neither other frameworks.

## Development Process

- I started from the hardest part, at least for me. Understanding how it works the JS function "fetch(url)" and how to get all the info from the external service.  
- After that I wrote all the code to manipulate the DOM of the App and create all the elements  
- At the end I edit the style of my project and test all the functionality

### Updating Project after Coach's Feedback

#### *My errors:*
 - The research of a multi-word does not work
 - Used the "click event" instead of the "submit event" in the Form
 - Missing a formatting style of the JS code
 - Not implemented the handle of cases in the asynchronous calls with fetch(url)
 - Same lines of code repeated multiple times

#### *How I Fix it:*
 - Used a *function* to transfrom the string written in the "textbox" in a way that every word can be recognized from the API call
 - Fixed the Form with *onsubmit event*
 - Implemented *prettier* to make the code easier to read
 - Implemented *catch* and *finally* to handle different cases
 - Used Functions to simplify the creation of elements in the DOM

## Link to the project

You can easily see and test my project on the following link:

:arrow_forward: [Netlify - Education Project | Online Library](https://book-camp.netlify.app/)

**Hope you like it, enjoy!**
