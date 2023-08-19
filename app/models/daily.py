import enum
from .db import db, environment, SCHEMA, add_prefix_for_prod

class repeatOptions(enum.Enum):
    """
    Enables passing in a Python enum and storing the enum's *value* in the db.
    """
    daily = 'Daily'
    weekly = 'Weekly'
    monthy = 'Monthly'
    yearly = 'Yearly'

class daysOfWeek(enum.Enum):
    """
    Creates an enum of each day of week to use when repeat frequency is set to weekly
    """
    su = 'Sunday'
    mo = 'Monday'
    tu = 'Tuesday'
    we = 'Wednesday'
    th = 'Thursday'
    fr = 'Friday'
    sa = 'Saturday'


class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_ID = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    repeats_frame = db.Column(db.Enum(repeatOptions))
    repeats_frequency = db.Column(db.Integer)
    repeats_on = db.Column(db.Enum(daysOfWeek))
    streak = db.Column(db.Integer)


    def to_dict(self):
        return {
        'id': self.id,
        'username': self.username,
        'email': self.email
        }

    def increaseStreak(self):
        self.streak += 1

    def resetStreak(self):
        self.streak = 0

    def getStreak(self):
        return self.streak
