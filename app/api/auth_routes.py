from flask import Blueprint, jsonify, session, request
from app.models import User, db, Follow
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import date, datetime, timedelta

today = datetime.now()
auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        user = User.query.filter(User.email == current_user.email).first()
        follows =  {f.followed: User.query.get(f.followed).to_dict() for f in Follow.query.filter(Follow.follower == user.id).all()}
        followers = {f.follower: User.query.get(f.follower).to_dict() for f in Follow.query.filter(Follow.followed == user.id).all()}
        login_user(user)
        user = user.to_dict()
        user["follows"] = follows
        user["followers"] = followers
        return user
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        follows =  {f.followed: User.query.get(f.followed).to_dict() for f in Follow.query.filter(Follow.follower == user.id).all()}
        followers = {f.follower: User.query.get(f.follower).to_dict() for f in Follow.query.filter(Follow.followed == user.id).all()}
        login_user(user)
        user = user.to_dict()
        user["follows"] = follows
        user["followers"] = followers
        return user
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            name=form.data['name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            created_at=today,
            updated_at=today
        )
        db.session.add(user)
        db.session.commit()
        made_user = User.query.filter(User.username == form.data['username']).one_or_none()
        follow = Follow(follower = made_user.to_dict()["id"], followed = 1)
        followed = Follow(follower = 1, followed = made_user.to_dict()["id"])
        db.session.add(follow)
        db.session.add(followed)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


#the below code is kept just in case I need to revert

# @auth_routes.route('/')
# def authenticate():
#     """
#     Authenticates a user.
#     """
#     if current_user.is_authenticated:
#         return current_user.to_dict()
#     return {'errors': ['Unauthorized']}


# @auth_routes.route('/login', methods=['POST'])
# def login():
#     """
#     Logs a user in
#     """
#     form = LoginForm()
#     # Get the csrf_token from the request cookie and put it into the
#     # form manually to validate_on_submit can be used
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         # Add the user to the session, we are logged in!
#         user = User.query.filter(User.email == form.data['email']).first()
#         login_user(user)
#         return user.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
