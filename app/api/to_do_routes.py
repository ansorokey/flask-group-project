from flask import Blueprint, jsonify, request, abort
from app.models.to_do import ToDo
from flask_login import current_user, login_required
from app.models import db
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, DateTimeField, Form, validators
from wtforms.validators import DataRequired, Optional



def todo_form_validation_errors(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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
class ToDoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    due_date = DateField('due_date', validators=[Optional()])
    # csrf_token is implicitly included by FlaskForm

@todo_routes.route('/users/<int:user_id>/todos', methods=['POST'])
@login_required
def create_todo_for_user(user_id):
    if current_user.id != user_id:
        abort(403)

    form = ToDoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_todo = ToDo(
            user_id=user_id,
            title=form.data['title'],
            description=form.data['description'],
            due_date=form.data.get('due_date'),
            completed=False
        )

        try:
            db.session.add(new_todo)
            db.session.commit()
            return jsonify(new_todo.to_dict()), 201

        except Exception as e:
            # we can log the exception if needed
            print(f"Error occurred: {e}")
            
            # Rolling back in case of error ensures the database remains in a consistent state
            db.session.rollback()
            return {"errors": "An error occurred while saving the todo. Please try again."}, 500

    return {'errors': todo_form_validation_errors(form.errors)}, 401


@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>', methods=['PUT'])
@login_required
def update_todo_for_user(user_id, todo_id):
    if current_user.id != user_id:
        abort(403)

    todo = ToDo.query.get(todo_id)
    if not todo or todo.user_id != user_id:
        return jsonify({"error": "ToDo not found or unauthorized"}), 404

    form = ToDoForm()  # Initialize the form
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            todo.title = form.data['title']
            todo.description = form.data['description']
            todo.due_date = form.data.get('due_date')
            todo.updated_at = db.func.current_timestamp()

            db.session.commit()
            return jsonify(todo.to_dict()), 200

        except Exception as e:
            # we can log the exception if needed
            print(f"Error occurred: {e}")

            # Rolling back in case of error ensures the database remains in a consistent state
            db.session.rollback()
            return {"errors": "An error occurred while updating the todo. Please try again."}, 500

    return {'errors': todo_form_validation_errors(form.errors)}, 401

# Delete a ToDo
@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>', methods=['DELETE'])
@login_required
def delete_todo_for_user(user_id, todo_id):
    todo = ToDo.query.get(todo_id)
    if todo and todo.user_id == user_id:
        try:
            db.session.delete(todo)
            db.session.commit()
            return jsonify({"message": "Deleted successfully"}), 200

        except Exception as e:
            # we can log the exception if needed
            print(f"Error occurred: {e}")

            # Rolling back in case of error ensures the database remains in a consistent state
            db.session.rollback()
            return jsonify({"error": "An error occurred while deleting the todo. Please try again."}), 500

    return jsonify({"error": "ToDo not found or unauthorized"}), 404
