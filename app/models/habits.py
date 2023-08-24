# db is defined in db.py, import from local directory
from .db import db, environment, SCHEMA
# from sqlalchemy.sql import functions
from datetime import date, timedelta, datetime
# use this to set the timestamps
# https://stackoverflow.com/questions/13370317/sqlalchemy-default-datetime

class Habit(db.Model):
    __tablename__ = 'habits'

    # If production, use render schema
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.String(255), default='')
    difficulty = db.Column(db.Integer, default=2)
    frequency = db.Column(db.Integer, default=1)
    date_to_reset = db.Column(db.String, default=date.today()+timedelta(days=1))
    strength = db.Column(db.String, default='Neutral')
    pos_count = db.Column(db.Integer, default=0)
    neg_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        """
        Transform python object into a JSON readable dictionary with JS style keys
        """
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'difficulty': self.difficulty,
            'frequency': self.frequency,
            'strength': self.strength,
            'posCount': self.pos_count,
            'negCount': self.neg_count,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
    # tags a habit can have multiple tags, make it a relationship
