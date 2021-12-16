from flask_login import login_required
from flask import Blueprint, request
from operator import itemgetter
from app.forms import AnswerForm
from datetime import date, datetime, timedelta
from app.models import User, db, Answer, Question, UpVoteAnswer

answers_routes = Blueprint('answers', __name__)
today = datetime.now()


#add an upvote to a question
@answers_routes.route('/addupvote', methods=["POST"])
@login_required
def add_upvote():
    answer, user_id = itemgetter("answer", "user_id")(request.json)
    existing_upvote = UpVoteAnswer.query.filter(UpVoteAnswer.user_id==user_id).filter(UpVoteAnswer.answer_id==answer)
    if existing_upvote.one_or_none():
        db.session.delete(existing_upvote.one_or_none())
        db.session.commit()
        return "upVote removed"
    upVote = UpVoteAnswer(user_id=user_id, answer_id=answer)
    db.session.add(upVote)
    db.session.commit()
    return "success"


# add a answer (create)
@answers_routes.route('/add', methods=["POST"])
@login_required
def add_question():
    image = itemgetter("image")(request.json)
    # user = User.query.get(user_id)
    form = AnswerForm()
    print("==========================",form.data["body"])
    print("==========================",image)
    if(form.validate_on_submit):
        newAnswer = Answer(
            body = form.data["body"],
            image = image,
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
@answers_routes.route('/<int:id>', methods=["PUT"])
@login_required
def question_answers(id):
    session_user = itemgetter("sessionUserId")(request.json)
    session_user = session_user["id"]
    # question = Question.query.get(id)
    answers = {answer.id: answer.to_dict() for answer in Answer.query.filter(Answer.question_id==id)}
    for ans in answers.values():
        answers[ans["id"]]["username"] = User.query.get(ans['user_id']).to_dict()['username']
        answers[ans["id"]]["upVotes"] = len(UpVoteAnswer.query.filter(UpVoteAnswer.answer_id==ans['id']).all())
        exisiting_upvote = UpVoteAnswer.query.filter(UpVoteAnswer.user_id==session_user).filter(UpVoteAnswer.answer_id==ans["id"])
        if exisiting_upvote.one_or_none():
            answers[ans["id"]]["upVoted"] = True
    return answers
    # return {question.id:question.to_dict() for question in Question.query.filter(Question.user_id==user.id)}

# delete an answer (delete)
@answers_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_answers(id):
    question = Answer.query.get(id)
    db.session.delete(question)
    db.session.commit()
    return {"delete": "success"}

# edit an aswer (delete)
@answers_routes.route('/edit/<int:id>', methods=["PUT"])
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
