from flask import Blueprint, jsonify, request, abort, make_response
from app.models.to_do import ToDo
from flask_login import current_user, login_required
from app.models import db
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, DateTimeField, BooleanField, Form, validators
from wtforms.validators import DataRequired, Optional
from flask_wtf.csrf import generate_csrf

# A helper function to turn form validation errors into readable messages
def todo_form_validation_errors(validation_errors):
    """
    Takes the validation errors from the form and returns them in a readable format.
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Blueprint helps in organizing our application into modules
todo_routes = Blueprint('todos', __name__)

# Route to get all ToDos for a specific user
@todo_routes.route('/users/<int:user_id>/todos', methods=['GET'])
@login_required  # ensures only logged-in users can access this route
def get_todos_for_user(user_id):
    # Check if the currently logged-in user is the one making the request
    if current_user.id != user_id:
        # If not, return an unauthorized error
        return {"errors": ["Unauthorized access to user's todos"]}, 403

    # Query the database to get all ToDos for the user, ordered by creation date
    todos = ToDo.query.filter_by(user_id=user_id).order_by(ToDo.created_at.desc()).all()
    return jsonify([todo.to_dict() for todo in todos])

# Route to get a specific ToDo by its ID for a user
@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>', methods=['GET'])
@login_required
def get_single_todo_for_user(user_id, todo_id):
    # Fetch the specific ToDo from the database
    todo = ToDo.query.get(todo_id)
    # If the ToDo doesn't exist or belongs to another user
    if not todo or todo.user_id != user_id:
        return {"errors": ["ToDo item not found or unauthorized access"]}, 404

    # Return the ToDo details
    return jsonify(todo.to_dict())




# Form setup to create a new ToDo
class ToDoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])  # Title is mandatory
    description = StringField('description', validators=[DataRequired()])  # Description is mandatory
    due_date = DateField('due_date', validators=[Optional()])  # Due date is optional

@todo_routes.route('/users/<int:user_id>/todos', methods=['POST'])
@login_required
def create_todo_for_user(user_id):
    # Ensure the user creating the ToDo is the logged-in user
    if current_user.id != user_id:
        return {"errors": ["Unauthorized creation attempt"]}, 403

    # Create an instance of the ToDo form
    form = ToDoForm()
    # Set the csrf_token from the cookie for security
    form['csrf_token'].data = request.cookies['csrf_token']

    # If the form is valid
    if form.validate_on_submit():
        # Create a new ToDo with the data from the form
        new_todo = ToDo(
            user_id=user_id,
            title=form.data['title'],
            description=form.data['description'],
            due_date=form.data.get('due_date'),
            completed=False
        )

        try:
            # Add the new ToDo to the database
            db.session.add(new_todo)
            db.session.commit()
            # Return the details of the new ToDo
            return jsonify(new_todo.to_dict()), 201

        except Exception as e:
            # If there's a database error, rollback and return an error message
            print(f"Database error: {e}")
            db.session.rollback()
            return {"errors": "Database error: Unable to save the todo item."}, 500

    # If the form isn't valid, return the form errors
    return {'errors': todo_form_validation_errors(form.errors)}, 401



# Form setup to mark a ToDo as completed
class MarkTodoCompletedForm(FlaskForm):
    completed = BooleanField('completed', validators=[DataRequired()])

@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>/completed', methods=['PUT'])
@login_required
def mark_todo_completed(user_id, todo_id):
    # Ensure only the rightful user can update the ToDo
    if current_user.id != user_id:
        abort(403)

    # Fetch the ToDo to be marked as completed from the database
    todo = ToDo.query.get(todo_id)
    if not todo or todo.user_id != user_id:
        return jsonify({"error": "ToDo item not found or unauthorized update attempt"}), 404

    # Initialize the form with the request data
    form = MarkTodoCompletedForm(data=request.json)
    # Set the csrf_token for security
    form['csrf_token'].data = request.cookies['csrf_token']

    # If the form is valid
    if form.validate_on_submit():
        try:
            # Mark the ToDo as completed and set the completion date
            todo.completed = form.data['completed']
            todo.completed_at = datetime.utcnow() if form.data['completed'] else None
            todo.updated_at = datetime.utcnow()

            # Save the updated details in the database
            db.session.commit()
            # Return the updated details
            return jsonify(todo.to_dict()), 200

        except Exception as e:
            # If there's a database error, rollback and return an error message
            print(f"Database error: {e}")
            db.session.rollback()
            return {"errors": "Database error: Unable to mark the todo item as completed."}, 500

    # If the form isn't valid, return the form errors
    return {'errors': todo_form_validation_errors(form.errors)}, 401


@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>', methods=['PUT'])
@login_required
def update_todo_for_user(user_id, todo_id):
    # Ensure only the rightful user can update the ToDo
    if current_user.id != user_id:
        abort(403)

    # Fetch the ToDo to be updated from the database
    todo = ToDo.query.get(todo_id)
    if not todo or todo.user_id != user_id:
        return jsonify({"error": "ToDo item not found or unauthorized update attempt"}), 404

    # Initialize the form with the current ToDo data
    form = ToDoForm()
    # Set the csrf_token for security
    form['csrf_token'].data = request.cookies['csrf_token']

    # If the form is valid
    if form.validate_on_submit():
        try:
            # Update the ToDo details
            todo.title = form.data['title']
            todo.description = form.data['description']
            todo.due_date = form.data.get('due_date')
            todo.updated_at = db.func.current_timestamp()

            # Save the updated details in the database
            db.session.commit()
            # Return the updated details
            return jsonify(todo.to_dict()), 200

        except Exception as e:
            # If there's a database error, rollback and return an error message
            print(f"Database error: {e}")
            db.session.rollback()
            return {"errors": "Database error: Unable to update the todo item."}, 500

    # If the form isn't valid, return the form errors
    return {'errors': todo_form_validation_errors(form.errors)}, 401

# Form just to validate CSRF, used when deleting a ToDo
class CSRFOnlyForm(FlaskForm):
    pass

@todo_routes.route('/users/<int:user_id>/todos/<int:todo_id>', methods=['DELETE'])
@login_required
def delete_todo_for_user(user_id, todo_id):
    # Fetch the ToDo to be deleted
    todo = ToDo.query.get(todo_id)
    if not todo or todo.user_id != user_id:
        return jsonify({"error": "ToDo item not found or unauthorized delete attempt"}), 404

    # Create a CSRF validation form
    form = CSRFOnlyForm()
    # Set the csrf_token from the cookie
    form['csrf_token'].data = request.cookies['csrf_token']

    # Ensure the CSRF token is valid
    if not form.validate():
        return jsonify({"error": "Invalid CSRF token."}), 401

    try:
        # Delete the ToDo from the database
        db.session.delete(todo)
        db.session.commit()
        # Return a success message
        return jsonify({"message": "Todo item deleted successfully"}), 200
    
    except Exception as e:
            # If there's a database error during deletion, log it and rollback the transaction
        print(f"Database error: {e}")
        db.session.rollback()
        return jsonify({"error": "Database error: Unable to delete the todo item."}), 500

# CSRF fetch route for the front end: 
# @todo_routes.route.route('/csrf', methods=['GET'])
# def get_csrf_token():
#     response = make_response(jsonify(success=True))
#     csrf_token = generate_csrf()
#     response.set_cookie('csrf_token', csrf_token)
#     return response
