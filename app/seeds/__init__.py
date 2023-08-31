from flask.cli import AppGroup
from .users import seed_users, undo_users
from .test_habits import seed_test_habits, undo_test_habits
from .dailies import seed_dailies, undo_dailies
from .add_avatars import seed_base_avatars, undo_base_avatars
from .to_do import seed_todos, undo_todos
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_test_habits()
        undo_dailies()
        undo_base_avatars()
        undo_todos()
    seed_users()
    seed_dailies()
    seed_test_habits()
    seed_base_avatars()
    seed_todos()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_test_habits()
    undo_dailies()
    undo_base_avatars()
    undo_todos()
