from flask import Blueprint, request, jsonify
from app.models import Daily, db, repeatOptions, difficulty
from datetime import date, timedelta
from flask_login import login_required, current_user
from app.forms import DailyForm


daily_bp = Blueprint('dailies',  __name__)


today = date.today()
def updateDueDate(frame, frequency,last=today):
    """
    Returns an updated due date based on two arguments: frame <int> and frequency <int> and a third optional parameter of last due date (defaults to todays date)
    """

    due_multiplier = int(frame) * int(frequency)
    due_date = today + timedelta(days=due_multiplier)
    return due_date




@daily_bp.route('/', methods=['GET'])
@login_required
def all_dailies():
    """
    Query for all dailies for the current user and returns them in a list of daily dictionaries.
    """
    dailys = Daily.query.all()

    updated_dailies = []

    for d in dailys:
        if d.due_date < today:
            if d.completed == False:
                d.streak = 0
            else:
                d.completed = False
                d.streak += 1
            new_due_date = updateDueDate(d.repeats_frame.value, d.repeats_frequency, d.due_date)
            d.due_date = new_due_date
            updated_dailies.append(d)
            db.session.commit()
        else:
            updated_dailies.append(d)

    formattedDailies = [d.to_dict() for d in updated_dailies]


    return formattedDailies

@daily_bp.route('/<id>', methods=['GET'])
@login_required
def one_daily(id):
    """
    Query for a single daily by id and return the daily as a dictionary.
    """
    daily = Daily.query.get_or_404(id)
    return  daily

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
        frame = int(form.data['repeats_frame'])
        frequency = form.data['repeats_frequency']
        due_date = updateDueDate(frame, frequency)

        # Convert form data to enum values
        repeats_frame_enum = repeatOptions(int(form.data['repeats_frame']))
        strength_enum = difficulty(int(form.data['strength']))

        # create the new record
        newDaily = Daily(
            user_id=user_id,
            title=form.data['title'],
            description=form.data['description'],
            strength=strength_enum,
            repeats_frame=repeats_frame_enum,
            repeats_frequency=form.data['repeats_frequency'],
            streak=0,
            completed=False,
            created_at=today,
            updated_at=today,
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
    record = Daily.query.get_or_404(id)
    form = DailyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = current_user.id

    if form.validate_on_submit():

        # calculate the due date based on user inputs
        frame = int(form.data['repeats_frame'])
        frequency = form.data['repeats_frequency']
        due_date = updateDueDate(frame, frequency)

        # convert the user input into correct format for the enum
        repeats_frame_enum = repeatOptions(int(form.data['repeats_frame']))
        strength_enum = difficulty(int(form.data['strength']))

        # populate the columns that the user is allowed to change
        form.populate_obj(record)

        # Update the fields that require extra logic
        record.strength = strength_enum
        record.repeats_frame = repeats_frame_enum
        record.updated_at = today
        record.due_date = due_date

        db.session.commit()

        return record.to_dict()
    if form.errors:
        return form.errors

@daily_bp.route('/<id>',methods=['DELETE'] )
@login_required
def delete_daily(id):
    """
    Delete a daily from an id
    """
    daily = Daily.query.get_or_404(id)
    db.session.delete(daily)
    db.session.commit()
    return {'message': 'Daily deleted successfully!'}
