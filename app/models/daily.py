import enum
from .db import db, environment, SCHEMA, add_prefix_for_prod

class repeatOptions(enum.Enum):
    """
    Enables passing in a Python enum and storing the enum's *value* in the db.
    """
    daily = 1
    weekly = 7
    monthy = 30
    yearly = 365

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
    user_Id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    repeats_frame = db.Column(db.Enum(repeatOptions), nullable=False)
    repeats_frequency = db.Column(db.Integer, nullable=False)
    repeats_on = db.Column(db.Enum(daysOfWeek))
    streak = db.Column(db.Integer)
    completed = db.Column(db.Boolean)
    due_date = db.Column(db.Date)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)


    def to_dict(self):
        return {
        'id': self.id,
        'user_Id': self.user_Id,
        'title': self.title,
        'description': self.description,
        'repeats_frame' : self.repeats_frame,
        'repeats_frequency' : self.repeats_frequency,
        'repeats_on' : self.repeats_on,
        'streak' : self.streak,
        'completed' : self.completed,
        'due_date' : self.due_date
        }

    def increaseStreak(self):
        self.streak += 1

    def resetStreak(self):
        self.streak = 0

    def getStreak(self):
        return self.streak

    def markComplete(self):
        self.completed = True

    def changeDueDate(self):
        self.completed = False
        # add functionality that will update duedate by adding frame*frequency to current due date if due date is older than todays date
        pass
