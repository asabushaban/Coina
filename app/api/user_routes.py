from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Follow, db
from operator import itemgetter

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

def follow_getter(id):
    relationships = {}
    user = User.query.get(id)
    follows =  {f.followed: User.query.get(f.followed).to_dict() for f in Follow.query.filter(Follow.follower == user.id).all()}
    followers = {f.follower: User.query.get(f.follower).to_dict() for f in Follow.query.filter(Follow.followed == user.id).all()}
    relationships['following'] = follows
    relationships["totalFollowing"] = len(follows)
    relationships["followers"] = followers
    relationships["totalFollowers"] = len(followers)
    return relationships

@user_routes.route('/follows/<int:id>')
@login_required
def follows(id):
    return follow_getter(id)


@user_routes.route('/addfollow', methods=["POST"])
@login_required
def add_follow():
    followed, follower = itemgetter("followed", "follower")(request.json)
    existing_follow = Follow.query.filter(Follow.follower == follower).filter(Follow.followed == followed)
    if existing_follow.one_or_none():
        db.session.delete(existing_follow.one_or_none())
        db.session.commit()
        return follow_getter(followed)
    follow = Follow(follower=follower, followed=followed)
    db.session.add(follow)
    db.session.commit()
    return follow_getter(followed)

# code below just in case
# refactored code has a bug

# @user_routes.route('/addfollow', methods=["POST"])
# @login_required
# def add_follow():
#     relationships = {}
#     followed, follower = itemgetter("followed", "follower")(request.json)
#     user = User.query.get(followed)
#     existing_follow = Follow.query.filter(Follow.follower == follower).filter(Follow.followed == followed)
#     if existing_follow.one_or_none():
#         db.session.delete(existing_follow.one_or_none())
#         db.session.commit()
#         follows =  {f.followed: User.query.get(f.followed).to_dict() for f in Follow.query.filter(Follow.follower == user.id).all()}
#         followers = {f.follower: User.query.get(f.follower).to_dict() for f in Follow.query.filter(Follow.followed == user.id).all()}
#         relationships['following'] = follows
#         relationships["totalFollowing"] = len(follows)
#         relationships["followers"] = followers
#         relationships["totalFollowers"] = len(followers)
#         return relationships
#     follow = Follow(follower=follower, followed=followed)
#     db.session.add(follow)
#     db.session.commit()
#     follows =  {f.followed: User.query.get(f.followed).to_dict() for f in Follow.query.filter(Follow.follower == user.id).all()}
#     followers = {f.follower: User.query.get(f.follower).to_dict() for f in Follow.query.filter(Follow.followed == user.id).all()}
#     relationships['following'] = follows
#     relationships["totalFollowing"] = len(follows)
#     relationships["followers"] = followers
#     relationships["totalFollowers"] = len(followers)
#     return relationships



# @auth_routes.route('/')
# def authenticate():
#     """
#     Authenticates a user.
#     """
#     if current_user.is_authenticated:
#         user = User.query.filter(User.email == current_user.email).first()
#         follows =  {f.followed: User.query.get(f.followed).to_dict() for f in Follow.query.filter(Follow.follower == user.id).all()}
#         followers = {f.follower: User.query.get(f.follower).to_dict() for f in Follow.query.filter(Follow.followed == user.id).all()}
#         login_user(user)
#         user = user.to_dict()
#         user["follows"] = follows
#         user["followers"] = followers
#         return user
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
#         follows =  {f.followed: User.query.get(f.followed).to_dict() for f in Follow.query.filter(Follow.follower == user.id).all()}
#         followers = {f.follower: User.query.get(f.follower).to_dict() for f in Follow.query.filter(Follow.followed == user.id).all()}
#         login_user(user)
#         user = user.to_dict()
#         user["follows"] = follows
#         user["followers"] = followers
#         return user
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
