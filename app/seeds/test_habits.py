# Need to import: the db, the model we'll be creating, environment and schema for postgres
from app.models import db, Habit, environment, SCHEMA
# text allow
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_test_habits():
    walk_dog = Habit(user_id=4, title='walk Luna')
    mow_lawn = Habit(user_id=4, title='Mow the lawn', notes='Do it while the sun is up and grass is dry', difficulty=3, frequency=2)

    db.session.add(walk_dog)
    db.session.add(mow_lawn)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

# sql.alchemy does not have a built in destruction function
# need to make a raw query
# postgres (production) uses a different command
def undo_test_habits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))

    db.session.commit()
