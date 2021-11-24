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


#id is the id of the user whose questions you need
#session_user is the session user
def question_getter(id, session_user):

    # sets the user for the specific user you are getting questions for
    # and initializes empty obj to store all questions
    user = User.query.get(id)
    questions = {}

    # queries for all questions made by that user and loops through each question
    for question in Question.query.filter(Question.user_id==user.id):

        # turns query question into a dictionary, adds it to main question dict (on 54)
        # with the key of the question id
        # adds total upvote count
        # adds the username of the user who posted it
        questions[question.id] = question.to_dict()
        questions[question.id]["upVotes"] = len(UpVoteQuestion.query.filter(UpVoteQuestion.question_id==question.id).all())
        questions[question.id]["username"] = user.username

        #queries to see if the session user has upvotes the question
        #if true "upvoted" key added to object with value of true
        exisiting_upvote = UpVoteQuestion.query.filter(UpVoteQuestion.user_id==session_user).filter(UpVoteQuestion.question_id==question.id)
        if exisiting_upvote.one_or_none():
            questions[question.id]["upVoted"] = True

        #checks if the question has at least one answer
        if Answer.query.filter(Answer.question_id == question.id).first():
            mostVotes = []

            #loops through all the answers
            # adds an upvotes key to each answer with the total upvote count
            # adds the answer along with the total vote count to a mostVotes list
            for answer in Answer.query.filter(Answer.question_id == question.id).all():
                answer = answer.to_dict()
                totalVotes = len(UpVoteAnswer.query.filter(UpVoteAnswer.answer_id==answer["id"]).all())
                answer["upVotes"] = totalVotes
                mostVotes.append(answer)

            # loops through the most votes list to find
            # the answer with the highest vote count
            highestVotes = mostVotes[0]["upVotes"]
            highest = mostVotes[0]
            for ans in mostVotes:
                if ans["upVotes"] > highestVotes:
                    highestVotes = ans["upVotes"]
                    highest = ans
            topAnswer = highest

            #gets the username for whoever user's answer has the most upvotes
            #adds the username to the top answer dictionary
            topAnswer["username"] = User.query.get(topAnswer["user_id"]).to_dict()['username']

            #adds the top answer to the question dictionary
            questions[question.id]["topAnswer"] = topAnswer

    # returns a dictionary with all a users questions with the question id as keys
    return questions


# get a users questions (read)
@questions_routes.route('/myquestions/<int:id>', methods=["PUT"])
@login_required
def user_questions(id):
        session_user = itemgetter("sessionUserId")(request.json)
        return question_getter(id, session_user)

# get users follow questions (read)
@questions_routes.route('/follows', methods=["PUT"])
@login_required
def user_follow_questions():
    questions = {}
    follows = itemgetter("follows")(request.json)
    sessionUser = follows["id"]
    follows = follows["follows"]
    for id in follows.keys():
        for qId, q in question_getter(id, sessionUser).items():
            questions[qId] = q
    for session_user_q_id, session_user_q in question_getter(sessionUser, sessionUser).items():
        questions[session_user_q_id] = session_user_q
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
