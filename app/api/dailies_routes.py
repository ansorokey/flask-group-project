from flask import Blueprint, request, jsonify
from app.models import Daily, db
from datetime import date, timedelta
from flask_login import login_required, current_user
from app.forms import DailyForm


daily_bp = Blueprint('dailies',  __name__)


today = date.today()

def getDueDate(frame, frequency,last=today):
    """
    Returns an updated due date based on two arguments: frame <int> and frequency <int> and a third optional parameter of last due date (defaults to todays date)
    """

    due_multiplier = int(frame) * int(frequency)
    due_date = last + timedelta(days=due_multiplier)
    return due_date

def changeDueDate(d):
    """
    Changes the streak, completed and then sends the date to getDueDate to update a record when a due date has passed
    """

    if d.completed == False:
        d.streak = 0
    else:
        d.completed = False
    while d.due_date < today:
        new_due_date = getDueDate(d.repeats_frame, d.repeats_frequency, d.due_date)
        d.due_date = new_due_date


    db.session.commit()
    return d



@daily_bp.route('/', methods=['GET'])
@login_required
def all_dailies():
    """
    Query for all dailies for the current user and returns them in a list of daily dictionaries.
    """
    dailys = Daily.query.filter(Daily.user_id == current_user.id).all()

    updated_dailies = []

    for d in dailys:
        if d.due_date < today:
            d = changeDueDate(d)
        updated_dailies.append(d.to_dict())

    return updated_dailies

@daily_bp.route('/<id>', methods=['GET'])
@login_required
def one_daily(id):
    """
    Query for a single daily by id and return the daily as a dictionary.
    """
    daily = Daily.query.get_or_404(id)
    if current_user.id != daily.user_id:
        return {'Unauthorized': 'You do not have permission to view this Daily'}

    if daily.due_date < today:
        daily = changeDueDate(daily)
    return  daily.to_dict()


@daily_bp.route('/', methods=['POST'])
@login_required
def new_daily():
    """
    Take in form data for title, description, repeats_frame, repeats_frequency, and strength, perform some logic, and then return a dictionary for a new daily record
    """

    # initialize the form and add csrf
    form = DailyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user_id = current_user.id
        # perform logic to calculate the due date based on the the parameters given by the user

        due_date = today
        # maybe impliment a place for the user to specify first due date?


        # create the new record
        newDaily = Daily(
            user_id=user_id,
            title=form.data['title'],
            description=form.data['description'],
            strength=form.data['strength'],
            repeats_frame=form.data['repeats_frame'],
            repeats_frequency=form.data['repeats_frequency'],
            due_date=due_date
        )

        db.session.add(newDaily)
        db.session.commit()

        # send back the record in json formatt
        return newDaily.to_dict()
    if form.errors:
        return form.errors


@daily_bp.route('/<id>', methods=['PUT'])
@login_required
def update_daily(id):
    """
    update a specific record of daily by id
    """
    record = Daily.query.get_or_404(id)
    if current_user.id != record.user_id:
        return {'Unauthorized': 'You do not have permission to update this Daily'}

    form = DailyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # populate the columns that the user is allowed to change
        form.populate_obj(record)

        # Update the fields that require extra logic

        record.updated_at = today
        record.due_date = today

        db.session.commit()

        return record.to_dict()
    if form.errors:
        return form.errors, 400

@daily_bp.route('/<id>/completed', methods=['PUT'])
@login_required
def complete_daily(id):
    """
    Toggle a Dailies completed status and adjust streak accordingly
    """
    record = Daily.query.get_or_404(id)
    if current_user.id != record.user_id:
        return {'Unauthorized': 'You do not have permission to update this Daily'}

    record.completed = not record.completed
    if record.completed:
        record.streak +=1
    else:
        record.streak -=1

    db.session.commit()
    return record.to_dict()

@daily_bp.route('/<id>',methods=['DELETE'] )
@login_required
def delete_daily(id):
    """
    Delete a daily from an id. Signed in user must be owner of the Daily
    """
    daily = Daily.query.get_or_404(id)
    if current_user.id == daily.user_id:
        db.session.delete(daily)
        db.session.commit()
        return {'message': 'Daily deleted successfully!'}
    else:
        return {"Unauthorized": "You do not have permission to delete this Daily"}
