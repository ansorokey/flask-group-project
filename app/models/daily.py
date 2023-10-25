from enum import Enum
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date


today = date.today()

class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    strength = db.Column(db.Enum("Trivial", "Easy", "Medium", "Hard", name='difficulty'), default="Medium")
    repeats_frame = db.Column(db.Enum("1", "7", "30", "365"),  default="1")
    repeats_frequency = db.Column(db.Integer,  default=1)
    # repeats_on = db.Column(db.Enum("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"))
    streak = db.Column(db.Integer, default=0)
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.Date)
    created_at = db.Column(db.Date, default=today)
    updated_at = db.Column(db.Date, default=today)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'strength': self.strength ,
            'repeats_frame': self.repeats_frame,
            'repeats_frequency': self.repeats_frequency,
            # 'repeats_on': self.repeats_on,
            'streak': self.streak,
            'completed': self.completed,
            'due_date': self.due_date.strftime('%Y-%m-%d') if self.due_date else None
        }
