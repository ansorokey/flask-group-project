# LvlUp - Productivity Tracking Website

Welcome to LvlUp, a single-page productivity tracking website inspired by Habitica. LvlUp is designed to help you manage and track your daily tasks, habits, and to-dos in a fun and engaging way. Our platform is an ode to Habitica, featuring similar colors, styling, and functionalities.

## Features

- **Track Habits:** Keep tabs on your daily habits, ensuring you stay on track with your personal goals.
- **Daily Tasks:** Organize and manage your daily tasks efficiently.
- **To-Do List:** Keep a list of tasks you need to accomplish, helping you stay organized and focused.

## Live Site

[Link to the live site](https://level-up-sy4q.onrender.com/)

## Quick Overview

LvlUp is more than just a task manager; it's a tool that gamifies your productivity. By bringing together essential features like habit tracking, daily tasks, and to-do lists, LvlUp aims to make productivity fun and rewarding. The interface is user-friendly, and the design pays homage to the classic RPG elements found in Habitica.

## Screenshots

*Here, we will add screenshots of our app showcasing its features and user interface.*

## Getting Started

To get LvlUp up and running on your local machine, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone [repository-link]


## Install Dependencies

**Navigate to the project directory and install the required dependencies:**

2. ```bash
   pipenv install -r requirements.txt

## Environment Setup

Create a `.env` file based on the provided example. Ensure it has the correct settings for your development environment.

## Database Configuration

Ensure the SQLite3 database connection URL is in the `.env` file. Replace the `SCHEMA` value in the `.env` file with a unique name, adhering to the snake_case convention.

## Initialize the Application

Activate the virtual environment, migrate the database, seed it, and start the Flask app:
1. ```bash
pipenv shell flask db upgrade flask seed all flask run


## Running the React App

For instructions on running the React app in development, see the [README](./react-app/README.md) in the `react-app` directory.

## Technologies Used

- **Backend:** Flask, SQLAlchemy, SQLite3
- **Frontend:** React
- **Database Design:** DbDiagram
- **Additional Tools:** SQL3, pipenv

## Deployment

LvlUp can be deployed using Render.com. For detailed instructions on deployment, refer to the [Render.com Deployment Guide](https://render.com/docs/deploy-flask).

### Part A: Configure the Start and Build Commands

1. Give your application a name in Render.
2. Leave the root directory field blank.
3. Set the Environment to "Python 3", choose the closest Region, and set the Branch to "main".
4. Enter the following Build command:

   ```shell
   npm install --prefix react-app &&
   npm run build --prefix react-app &&
   pip install -r requirements.txt &&
   pip install psycopg2 &&
   flask db upgrade &&
   flask seed all

5. Add your Start command:

   ```shell
   gunicorn app:app

6. For websockets, use:
   gunicorn --worker-class eventlet -w 1 app:app


### Part B: Add the Environment Variables

1. Click on "Advanced" to configure the environment variables.
2. Add the following keys and values:
   - `SECRET_KEY`: Generate a secure secret for production.
   - `FLASK_ENV`: Set to `production`.
   - `FLASK_APP`: Set to `app`.
   - `SCHEMA`: Use your unique schema name, in snake_case.
   - `REACT_APP_BASE_URL`: Use your Render.com URL.

3. In a new tab, navigate to your dashboard and click on your Postgres database instance. Add the following key and value:
   - `DATABASE_URL`: Copy the value from the Internal Database URL field.

_Note: Add any other keys and values that may be present in your local `.env` file. As you work to further develop your project, you may need to add more environment variables to your local `.env` file. Make sure you add these environment variables to the Render GUI as well for the next deployment._

4. Choose "Yes" for the Auto-Deploy field. This will re-deploy your application every time you push to main.

5. Finally, click "Create Web Service" to deploy your project. The deployment process will take about 10-15 minutes. Monitor the logs to see your build and start commands being executed, and to identify any errors in the build process.

## Contributing

We welcome contributions to LvlUp! If you have suggestions or improvements, feel free to fork this repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE file for details.

