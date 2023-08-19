from app.models import db, Daily, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_dailies():
    sweep = Daily(
        user_Id=1,
        title = "Sweep Floors",
        description = "Sweep in kitchen, dining room, and living room",
        repeats_frame=1,
        repeats_frequency=1,

        )
    dishes = Daily(
        user_Id=1,
        title = "Do Dishes",
        repeats_frame=1,
        repeats_frequency=1,
    )

    sheets = Daily(
        user_Id=1,
        title = "Change Bedsheets",
        description = "Change the sheets in all bedrooms",
        repeats_frame=1,
        repeats_frequency=7,
        repeats_on='Sunday'
    )


    db.session.add(sweep)
    db.session.add(dishes)
    db.session.add(sheets)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the dailies table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dailies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dailies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dailies"))

    db.session.commit()
