# sprints
A Pomodoro-like web application for managing your daily todo's.

Made with React.js for the front-end and Django Rest Framework for the back-end.

# Running the Program
To run the program, clone the repository with `git clone https://github.com/mok3112/sprints`

Run two terminal instances, one in `./sprints` and one in `./sprints/frontend/`

In the first terminal instance, run `python3 manage.py runserver`. This sets up the backend, and all browsable API functionality should be available.

In the second terminal instance, run `npm start` to start up the frontend code, which launches the web app.

# Upcoming
+ Use the token authentication in the front end. Don't load any tasks until the user logs in, and then pass around the token as authentication for any future requests.
+ Fix how global settings are obtained (something is going wrong right now but it's hard to diagnose exactly what).
+ Make a "log out" button that appears after the user logs in.
+ When the start button is clicked, push all the other tasks to the side and bring the clicked task into focus.
+ When a task is completed, show a little message saying that it has been completed and reload the page to update the info.
+ Add the "high score" and "total" points fields somewhere on the home page.
