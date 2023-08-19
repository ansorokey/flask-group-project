from flask import Blueprint
from app.models import db, Habit

habit_routes = Blueprint('habits',  __name__)

# @habit_routes.route('/', methods=['GET'])
# def test_route():
#     return { 'message': 'hello'}

# GET all habits
@habit_routes.route('/<userId>', methods=['GET'])
def get_habits(userId):
    habitsQ = Habit.query.all()
    habits_response = [h.to_JSON() for h in habitsQ]
    return habits_response

# CREATE a new habit
@habit_routes.route('/', methods=['POST'])
def post_habit():
    # gather form data
    # create a new habit
    # add new habit db.session
    # commit new habit to db.session
    # newUser =
    return 'post to habits'

# UPDATE a habit by id
@habit_routes.route('/<int:id>', methods=['PUT'])
def put_habit(id):
    # query habit by id
    # change values of habit
    # commit to db.session
    return 'update habit by id'
