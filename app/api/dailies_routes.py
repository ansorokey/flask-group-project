from flask import Blueprint, request, jsonify
from app.models import Daily, db, repeatOptions, difficulty
from datetime import date, timedelta
from flask_login import login_required, current_user
from app.forms import DailyForm


daily_bp = Blueprint('dailies',  __name__)

@daily_bp.route('/', methods=['GET'])
@login_required
def all_dailies():
    """
    Query for all dailies for the current user and returns them in a list of daily dictionaries.
    Recieve a dictionary of a daily item and create a new instance of a daily to be added into the dailies list.
    """

    dailys = Daily.query.all()

    formattedDailies = [d.to_dict() for d in dailys]

    return formattedDailies

@daily_bp.route('/<id>', methods=['GET'])
@login_required
def one_daily(id):
    """
    Query for a single daily by id and return the daily as a dictionary.
    Edit a daily dictionary
    """

    daily = Daily.query.filter(Daily.id == id).first().to_dict()
    return  daily

@daily_bp.route('/', methods=['POST'])
@login_required
def new_daily():
    form = DailyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        today = date.today()
        dueMultiplier = int(form.data['repeats_frame']) * form.data['repeats_frequency']  # Convert to integer
        due_date = today + timedelta(days=dueMultiplier)
        user_id = current_user.id

        # Convert form data to enum values
        repeats_frame_enum = repeatOptions(int(form.data['repeats_frame']))
        strength_enum = difficulty(int(form.data['strength']))

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
        return newDaily.to_dict()
    if form.errors:
        return form.errors


@daily_bp.route('/<id>', methods=['PUT'])
@login_required
def update_daily(id):
    """
    Update a Daily from id
    """
    return 'THIS WILL SHOW A SINGLE DAILIES INFORMATION'

@daily_bp.route('/<id>',methods=['DELETE'] )
@login_required
def delete_daily(id):
    """
    Delete a daily from an id
    """
    daily = Daily.query.filter(Daily.id == id).first()
    db.session.delete(daily)
    db.session.commit()
    return {'message': 'Daily deleted successfully!'}
