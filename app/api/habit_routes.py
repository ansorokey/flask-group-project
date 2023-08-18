from flask import Blueprint

habit_bp = Blueprint('habits',  __name__, prefix='habits')

@habit_bp.route('/habits')
def get_habits():
    return 'This is where habits will go.'
