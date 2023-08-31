from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, IntegerField
from app.models import Daily
from wtforms.validators import DataRequired

class DailyForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description')
    repeats_frame = SelectField('Repeat Time Frame', choices=[("1", 'Daily'), ("7",'Weekly'), ("30", 'Monthly'), ("365", 'Yearly')], default = "1")
    repeats_frequency = IntegerField('Repeat Frequency', default=1)
    strength = SelectField('Difficulty', choices=["Trivial", "Easy", "Medium", "Hard"], default="Medium")
