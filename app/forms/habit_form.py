from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Habit

class HabitForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    notes = StringField('notes')
    difficulty = IntegerField('difficulty', default=2)
    frequency = SelectField(choices=["daily", "weekly", "monthly"], default='daily')
    pos_count = IntegerField('pos_count', default=0)
    neg_count = IntegerField('pos_count', default=0)
    pos = BooleanField('pos', default=1)
    neg = BooleanField('neg', default=1)
