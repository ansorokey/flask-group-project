from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Habit

class HabitForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    notes = StringField('notes')
    difficulty = IntegerField('difficulty')
    frequency = SelectField(choices=["daily", "weekly", "monthly"])
    pos_count = IntegerField('pos_count')
    neg_count = IntegerField('pos_count')
    pos = BooleanField('pos')
    neg = BooleanField('neg')
