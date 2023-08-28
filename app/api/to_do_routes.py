from flask import Blueprint, jsonify, request, abort
from app.models.to_do import ToDo
from flask_login import current_user, login_required
from app.models import db

todo_routes = Blueprint('todos', __name__)

# Get all ToDos for a user
@todo_routes.route('/users/<int:user_id>/todos', methods=['GET'])
@login_required
def get_todos_for_user(user_id):
    if current_user.id != user_id:
        abort(403)

    todos = ToDo.query.filter_by(user_id=user_id).order_by(ToDo.created_at.desc()).all()
    return jsonify([todo.to_dict() for todo in todos])

