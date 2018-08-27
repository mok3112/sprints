# sprints
A Pomodoro-like web application for managing your daily todo's.

Made with React.js for the front-end and Django Rest Framework for the back-end.

# Running the Program
To run the program, clone the repository with `git clone https://github.com/mok3112/sprints`

Run two terminal instances, one in `./sprints` and one in `./sprints/frontend/`

In the first terminal instance, run `python3 manage.py runserver`. This sets up the backend, and all browsable API functionality should be available.

In the second terminal instance, run `npm start` to start up the frontend code, which launches the web app.

# Upcoming
+ Associate added tasks with specific users based on the authentication in the beginning. Maybe pass around an auth object with the user number and the authentication token.
+ Make better CSS layout of the form and the task list.
+ Make a "log out" button that appears after the user logs in.
+ When a task is completed, show a little message saying that it has been completed.
+ Add the "high score" and "total" points fields somewhere on the home page.
