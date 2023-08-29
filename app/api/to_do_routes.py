from flask import Blueprint, jsonify, request, abort
from app.models.to_do import ToDo
from flask_login import current_user, login_required
from app.models import db

todo_routes = Blueprint('todos', __name__)
# STILL NEED TO DO: Add something for when a user has no to-do's
# Get all ToDos for a user
@todo_routes.route('/users/<int:user_id>/todos', methods=['GET'])
@login_required
def get_todos_for_user(user_id):
    if current_user.id != user_id:
        abort(403)

    todos = ToDo.query.filter_by(user_id=user_id).order_by(ToDo.created_at.desc()).all()
    return jsonify([todo.to_dict() for todo in todos])

# Get ToDo by ID
@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>', methods=['GET'])
@login_required
def get_single_todo_for_user(user_id, todo_id):
    todo = ToDo.query.get(todo_id)
    if todo and todo.user_id == user_id:
        return jsonify(todo.to_dict())
    return jsonify({"error": "ToDo not found"}), 404

# Create a new ToDo
@todo_routes.route('/users/<int:user_id>/todos', methods=['POST'])
@login_required
def create_todo_for_user(user_id):
    if current_user.id != user_id:
        abort(403)

    data = request.json
    new_todo = ToDo(
        user_id=user_id,
        title=data['title'],
        description=data['description'],
        due_date=data.get('due_date'),  # This allows for an optional due_date
        created_at=data.get('created_at')
        completed=False,  # Newly created todos will not be completed
    )

    db.session.add(new_todo)
    db.session.commit()
    return jsonify(new_todo.to_dict()), 201

# Update an existing ToDo
@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>', methods=['PUT'])
@login_required
def update_todo_for_user(user_id, todo_id):
    if current_user.id != user_id:
        abort(403)

    todo = ToDo.query.get(todo_id)
    if todo and todo.user_id == user_id:
        data = request.json
        todo.title = data['title']
        todo.description = data['description']
        todo.due_date = data.get('due_date')
        todo.updated_at = db.func.current_timestamp()  

        db.session.commit()
        return jsonify(todo.to_dict())
    return jsonify({"error": "ToDo not found or unauthorized"}), 404

# Delete a ToDo
@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>', methods=['DELETE'])
@login_required
def delete_todo_for_user(user_id, todo_id):
    todo = ToDo.query.get(todo_id)
    if todo and todo.user_id == user_id:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({"message": "Deleted successfully"}), 204
    return jsonify({"error": "ToDo not found or unauthorized"}), 404