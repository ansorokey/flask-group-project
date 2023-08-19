from flask import Blueprint

daily_bp = Blueprint('dailies',  __name__, prefix='dailies')

@daily_bp.route('/', methods=['GET', 'POST'])
def all_dailies():
    """
    Query for all dailies for the current user and returns them in a list of daily dictionaries.
    Recieve a dictionary of a daily item and create a new instance of a daily to be added into the dailies list.
    """
    return 'SHOW THE DAILIES LATER'

@daily_bp.route('/<id>', methods=['GET','PATCH'])
def one_daily():
    """
    Query for a single daily by id and return the daily as a dictionary.
    Edit a daily dictionary
    """
    return 'THIS WILL SHOW A SINGLE DAILIES INFORMATION'
