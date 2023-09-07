from flask import Blueprint, request
from app.models import db, Avatar
from flask_login import current_user, login_required

avatar_routes = Blueprint('avatars',  __name__)

#  GET starter avatars
@avatar_routes.route('/starters', methods=['GET'])
def get_starter_avatars():
    """
    Returns all default avatars for new users.
    """
    avatar_query = Avatar.query.filter(Avatar.is_starter == True).all();
    return [a.to_dict() for a in avatar_query]

#  GET all avatars
@avatar_routes.route('/', methods=['GET'])
def get_avatars():
    """
    Returns all available avatars
    """
    avatar_query = Avatar.query.all();
    return [a.to_dict() for a in avatar_query]
