from flask import Blueprint
from app.models import Daily, db

daily_bp = Blueprint('dailies',  __name__)

@daily_bp.route('/', methods=['GET'])
def all_dailies():
    """
    Query for all dailies for the current user and returns them in a list of daily dictionaries.
    Recieve a dictionary of a daily item and create a new instance of a daily to be added into the dailies list.
    """
    dailys = Daily.query.all()
    formattedDailies = [d.to_dict() for d in dailys]
    
    return formattedDailies

@daily_bp.route('/<id>', methods=['GET'])
def one_daily():
    """
    Query for a single daily by id and return the daily as a dictionary.
    Edit a daily dictionary
    """
    return 'THIS WILL SHOW A SINGLE DAILIES INFORMATION'

@daily_bp.route('/', methods=['POST'])
def new_daily():
    return 'THIS WILL BE THE ENDPOINT FOR A NEW DAILY'

@daily_bp.route('/<id>', methods=['PUT'])
def update_daily():
    """
    Update a Daily from id
    """
    return 'THIS WILL SHOW A SINGLE DAILIES INFORMATION'

@daily_bp.route('/<id>',methods=['DELETE'] )
def delete_daily():
    """
    Delete a daily from an id
    """
    return 'This is the endpoint to delete a daily based on an id'
