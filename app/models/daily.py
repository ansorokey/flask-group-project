from enum import Enum
from .db import db, environment, SCHEMA, add_prefix_for_prod


class repeatOptions(Enum):
    daily = 1
    weekly = 7
    monthly = 30
    yearly = 365

class daysOfWeek(Enum):
    sunday = 'su'
    monday = 'mo'
    tuesday = 'tu'
    wednesday = 'we'
    thursday = 'th'
    friday = 'fr'
    saturday = 'sa'

class difficulty(Enum):
    trivial = 1
    easy = 2
    medium = 3
    hard = 4


class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    strength = db.Column(db.Enum(difficulty))
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
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'strength': self.strength.value if self.strength else None,
            'repeats_frame': self.repeats_frame.value if self.repeats_frame else None,
            'repeats_frequency': self.repeats_frequency,
            'repeats_on': self.repeats_on.value if self.repeats_on else None,
            'streak': self.streak,
            'completed': self.completed,
            'due_date': self.due_date.strftime('%Y-%m-%d') if self.due_date else None
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
