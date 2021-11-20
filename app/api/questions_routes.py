from flask_login import login_required
from flask import Blueprint, request
from operator import itemgetter
from app.forms import QuestionForm
from datetime import date, datetime, timedelta
from app.models import User, db, Question, UpVoteAnswer, UpVoteQuestion, Answer

questions_routes = Blueprint('questions', __name__)
today = datetime.now()


#add an upvote to a question
@questions_routes.route('/addupvote', methods=["POST"])
@login_required
def add_upvote():
    question, user_id = itemgetter("question", "user_id")(request.json)
    existing_upvote = UpVoteQuestion.query.filter(UpVoteQuestion.user_id==user_id).filter(UpVoteQuestion.question_id==question)
    if existing_upvote.one_or_none():
        db.session.delete(existing_upvote.one_or_none())
        db.session.commit()
        return "upVote removed"
    upVote = UpVoteQuestion(user_id=user_id, question_id=question)
    db.session.add(upVote)
    db.session.commit()
    return "success"



# add a question (create)
@questions_routes.route('/add', methods=["POST"])
@login_required
def add_question():
    # question, user_id = itemgetter("question", "user_id")(request.json)
    # user = User.query.get(user_id)
    form = QuestionForm()
    if(form.validate_on_submit):
        newQuestion = Question(
            question = form.data["question"],
            user_id = form.data["user_id"],
            created_at=today,
            updated_at=today
        )
        db.session.add(newQuestion)
        db.session.commit()
        return newQuestion.to_dict()
    else:
        return None


def question_getter(id):
    user = User.query.get(id)
    questions = {}
    # print("one users qs========================", Question.query.filter(Question.user_id==user.id).all())
    # print("all qs==============================", Question.query.all())
    for question in Question.query.filter(Question.user_id==user.id):
        questions[question.id] = question.to_dict()
        questions[question.id]["upVotes"] = len(UpVoteQuestion.query.filter(UpVoteQuestion.question_id==question.id).all())
        questions[question.id]["username"] = user.username
        if Answer.query.filter(Answer.question_id == question.id).first():
            topAnswer = Answer.query.filter(Answer.question_id == question.id).first().to_dict()
            topAnswer["username"] = User.query.get(topAnswer["user_id"]).to_dict()['username']
            questions[question.id]["topAnswer"] = topAnswer
    return questions


# get a users questions (read)
@questions_routes.route('/myquestions/<int:id>')
@login_required
def user_questions(id):
    return question_getter(id)

# get users follow questions (read)
@questions_routes.route('/follows', methods=["PUT"])
@login_required
def user_follow_questions():
    questions = {}
    follows = itemgetter("follows")(request.json)
    for id in follows.keys():
        for qId, q in question_getter(id).items():
            questions[qId] = q
    return questions

# get one question (read)
@questions_routes.route('/<int:id>')
@login_required
def get_question(id):
    question = Question.query.get(id)
    return question.to_dict()

# delete a question (delete)
@questions_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_questions(id):
    question = Question.query.get(id)
    db.session.delete(question)
    db.session.commit()
    return {"delete": "success"}

# edits a question (delete)
@questions_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_questions(id):
    question = Question.query.get(id)
    user_id = question.user_id
    form = QuestionForm()
    if(form.validate_on_submit):
        question.question = form.data["question"]
        db.session.commit()
        return {question.id:question.to_dict() for question in Question.query.filter(Question.user_id==user_id)}
    else:
        return None
