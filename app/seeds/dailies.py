from app.models import db, Daily, environment, SCHEMA, difficulty, repeatOptions
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_dailies():
    sweep = Daily(
        user_id=1,
        title = "Sweep Floors",
        description = "Sweep in kitchen, dining room, and living room",
        # strength='easy',
        strength=difficulty(2),
        # repeats_frame='daily',
        repeats_frame=repeatOptions(1),
        repeats_frequency=1,
        streak=5,
        completed=True,
        due_date=date(2023,8,25),
        created_at = date(2023,6,15),
        updated_at = date(2023,6,15)

        )
    # dishes = Daily(
    #     user_id=1,
    #     title = "Do Dishes",
    #     strength='easy',
    #     repeats_frame='daily',
    #     repeats_frequency=1,
    #     streak=5,
    #     completed=False,
    #     due_date=date(2023,8,25),
    #     created_at = date(2023,6,15),
    #     updated_at = date(2023,6,15)
    # )

    # sheets = Daily(
    #     user_id=1,
    #     title = "Change Bedsheets",
    #     description = "Change the sheets in all bedrooms",
    #     strength='easy',
    #     repeats_frame='weekly',
    #     repeats_frequency=1,
    #     streak=0,
    #     completed=False,
    #     due_date=date(2023,8,28),
    #     created_at = date(2023,6,15),
    #     updated_at = date(2023,6,15)
    # )


    db.session.add(sweep)
    # db.session.add(dishes)
    # db.session.add(sheets)
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
