from flask import Blueprint
from app.models import db, Habit
from flask_login import current_user, login_required

habit_routes = Blueprint('habits',  __name__)

# UPDATE a habit by id
@habit_routes.route('/<id>', methods=['PUT'])
def put_habit(id):
    # query habit by id
    # change values of habit
    # commit to db.session
    return 'update habit by id'

# GET all habits
@habit_routes.route('/', methods=['GET'])
def get_habits():
    habits_query = Habit.query.filter(Habit.user_id == current_user.id).all()
    habits_to_dict = [h.to_dict() for h in habits_query]
    return habits_to_dict


# CREATE a new habit
# @habit_routes.route('/', methods=['POST'])
# def post_habit():
    # gather form data
    # create a new habit
    # add new habit db.session
    # commit new habit to db.session
    # newUser =
    # return 'post to habits'
