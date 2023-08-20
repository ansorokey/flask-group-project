from flask import Blueprint, request
from app.models import db, Habit
from flask_login import current_user, login_required
from app.forms import HabitForm

habit_routes = Blueprint('habits',  __name__)

# UPDATE a habit by id
@habit_routes.route('/<int:id>', methods=['PUT'])
def put_habit(id):
    updatedHabit = Habit.query.filter(Habit.id == id).first()
    body = request.get_json()
    if 'pos_count' in body:
        updatedHabit.pos_count = body['pos_count']
    if 'neg_count' in body:
        updatedHabit.neg_count = body['neg_count']
    db.session.add(updatedHabit)
    db.session.commit()
    return updatedHabit.to_dict()

# GET all habits
@habit_routes.route('/', methods=['GET'])
def get_habits():
    habits_query = Habit.query.filter(Habit.user_id == current_user.id).all()
    habits_to_dict = [h.to_dict() for h in habits_query]
    return habits_to_dict


# CREATE a new habit
@habit_routes.route('/', methods=['POST'])
def post_habit():
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_habit = Habit()
        form.populate_obj(new_habit)
        db.session.add(new_habit)
        db.session.commit()
        return new_habit.to_dict()

    if form.errors:
        return form.errors
