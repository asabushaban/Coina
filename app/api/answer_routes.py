from flask_login import login_required
from flask import Blueprint, request
from operator import itemgetter
from app.forms import AnswerForm
from datetime import date, datetime, timedelta
from app.models import User, db, Answer, Question, question

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


# get a users answers (read)
@answers_routes.route('/<int:id>')
@login_required
def question_answers(id):
    # question = Question.query.get(id)
    answers = {answer.id: answer.to_dict() for answer in Answer.query.filter(Answer.question_id==id)}
    for ans in answers.values():
        answers[ans["id"]]["username"] = User.query.get(ans['user_id']).to_dict()['username']
    return answers
    # return {question.id:question.to_dict() for question in Question.query.filter(Question.user_id==user.id)}

# delete a question (delete)
@answers_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_answers(id):
    question = Answer.query.get(id)
    db.session.delete(question)
    db.session.commit()
    return {"delete": "success"}

# delete a question (delete)
@answers_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_answers(id):
    answer = Answer.query.get(id)
    form = AnswerForm()
    if(form.validate_on_submit):
        answer.body = form.data["body"]
        db.session.commit()
        answers = {answer.id: answer.to_dict() for answer in Answer.query.filter(Answer.question_id==id)}
        return answers
    else:
        return None
