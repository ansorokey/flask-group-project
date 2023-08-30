from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, IntegerField
from app.models import Daily
from wtforms.validators import DataRequired

class DailyForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description')
    repeats_frame = SelectField('Repeat Time Frame', choices=[(1, 'Daily'), (7,'Weekly'), (30, 'Monthly'), (365, 'Yearly')], validators=[DataRequired()])
    repeats_frequency = IntegerField('Repeat Frequency', validators=[DataRequired()])
    strength = SelectField('Difficulty', choices=[(1,'Trivial'), (2, 'Easy'), (3, 'Medium'), (4, 'Hard')])
