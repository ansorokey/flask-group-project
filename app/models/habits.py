# db is defined in db.py, import from local directory
from .db import db, environment, SCHEMA
from sqlalchemy.sql import functions
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
    frequency = db.Column(db.Enum("daily", "weekly", "monthly"), default='daily')
    date_to_reset = db.Column(db.String, default=date.today()+timedelta(days=1))
    strength = db.Column(db.Enum('Neutral', 'Weak', 'Strong'), default='Neutral')
    pos = db.Column(db.Boolean, default=True)
    neg = db.Column(db.Boolean, default=True)
    pos_count = db.Column(db.Integer, default=0)
    neg_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=functions.now())
    updated_at = db.Column(db.DateTime, default=functions.now())

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
            'pos': self.pos,
            'neg': self.neg,
            'posCount': self.pos_count,
            'negCount': self.neg_count,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    def reset_counts(self):
        self.pos_count = 0
        self.neg_count = 0

    def new_reset_date(self, freq):
        current_date = date.today()

        if freq == 'daily':
            self.date_to_reset = current_date + timedelta(days=1)

        if freq == 'weekly':
            days_since_mon = current_date.weekday()
            start_of_week = current_date - timedelta(days=days_since_mon)
            self.date_to_reset = start_of_week + timedelta(days=7)

        if freq == 'monthly':
            next_month = current_date.month + 1
            next_year = current_date.year
            if next_month > 12:
                next_month = 1
                next_year += 1
            self.date_to_reset = date(next_year, next_month, 1)

    def check_dates(self, current_date):
        if self.frequency == 'daily':
            if str(current_date) >= str(self.date_to_reset):
                self.reset_counts()
                self.new_reset_date('daily')

        elif self.frequency == 'weekly':
            days_since_mon = current_date.weekday()
            start_of_week = current_date - timedelta(days=days_since_mon)
            if str(start_of_week) >= str(self.date_to_reset):
                self.reset_counts()
                self.new_reset_date('weekly')

        elif self.frequency == 'monthly':
            start_of_month = date(current_date.year, current_date.month, 1)
            if str(start_of_month) >= str(self.date_to_reset):
                self.reset_counts()
                self.new_reset_date('monthly')

    # def check_strength(self):
    #     if self.pos_count <
    # tags a habit can have multiple tags, make it a relationship
