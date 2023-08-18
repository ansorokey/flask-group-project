# db is defined in db.py, import from local directory
from .db import db, environment, SCHEMA
from sqlalchemy.sql import func
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
    notes = db.Column(db.String(255))
    difficulty = db.Column(db.Integer, default=2)
    frequency = db.Column(db.Integer, default=1)
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, onupdate=func.now())
    # tags a habit can have multiple tags, make it a relationship
