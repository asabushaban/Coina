from app.models import db, UpVoteQuestion, UpVoteAnswer
from random import randint



# Adds a follow data
def seed_upVoteQuestions():
    i = 1
    j = 1
    for i in range(1, 42):
        for j in range(1, 16, randint(1, 4)):
                db.session.add(UpVoteQuestion(user_id=i,question_id=j))
    i+=1
    j+=1
    db.session.commit()

def seed_upVoteAnswers():
    i = 1
    j = 1
    for i in range(1, 42):
        for j in range(1, 53, randint(1, 4)):
                db.session.add(UpVoteAnswer(user_id=i,answer_id=j))
    i+=1
    j+=1
    db.session.commit()


def undo_upVoteQuestions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_upVoteAnswers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
