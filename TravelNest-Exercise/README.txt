TravelNest SpaceX Exercise
Harry White 

Readme
First run "npm install" from TravelNest-Exercise to install dependencies.
To start server, run "npm start" to , then http://localhost:3000 to view web-app
Run "npm test" to run tests


Discussion and potential improvements
I have made a quick react web-app to complete the exercise, the requested functionality should be working and data should be getting pulled from the provided API.

(Side note: the API doesn't seem to have updated after the Starship test flight on 02/02/2021, however I checked in a web browser and this is definitely on the API end. Not sure if it's an issue, or if they just don't log test-flights?)

The data is displayed in a clear, if less than sophisticated manner. A styling pass would definitely be in order if I was working on this as a full project.
The HTTP request should be working asynchronously though the async parts of the code could probably use a clean-up.

There are two very simple unit tests for screen elements currently, and if I had more time I would extend these to cover the asynchronous elements, as well as mocking the HTTP request so that the tests aren't reliant on the API or an internet connection.
