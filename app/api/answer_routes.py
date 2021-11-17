from flask_login import login_required
from flask import Blueprint, request
from operator import itemgetter
from app.forms import AnswerForm
from datetime import date, datetime, timedelta
from app.models import User, db, Answer

answers_routes = Blueprint('answers', __name__)
today = datetime.now()

# add a question (create)
@answers_routes.route('/add', methods=["POST"])
@login_required
def add_question():
    # question, user_id = itemgetter("question", "user_id")(request.json)
    # user = User.query.get(user_id)
    form = AnswerForm()
    if(form.validate_on_submit):
        newAnswer = Answer(
            body = form.data["body"],
            user_id = form.data["user_id"],
            question_id = form.data["question_id"],
            created_at=today,
            updated_at=today
        )
        db.session.add(newAnswer)
        db.session.commit()
        return newAnswer.to_dict()
    else:
        return None


# get a users questions (read)
@answers_routes.route('/myquestions/<int:id>')
@login_required
def user_questions(id):
    user = User.query.get(id)
    return {question.id:question.to_dict() for question in Question.query.filter(Question.user_id==user.id)}

# delete a question (delete)
@answers_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_questions(id):
    question = Question.query.get(id)
    db.session.delete(question)
    db.session.commit()
    return {"delete": "success"}

# delete a question (delete)
@answers_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_questions(id):
    question = Question.query.get(id)
    user_id = question.user_id
    form = AnswerForm()
    if(form.validate_on_submit):
        question.question = form.data["question"]
        db.session.commit()
        return {question.id:question.to_dict() for question in Question.query.filter(Question.user_id==user_id)}
    else:
        return None
