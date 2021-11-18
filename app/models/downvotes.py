from datetime import timezone
from .db import db
from sqlalchemy.orm import relationship


class DownVoteAnswer(db.Model):
    __tablename__ = 'down_vote_answer'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    answer_id = db.Column(db.Integer, db.ForeignKey("answers.id", ondelete='CASCADE'), nullable=False, )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'answer_id': self.answer_id,
        }


class DownVoteQuestion(db.Model):
    __tablename__ = 'down_vote_question'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id", ondelete='CASCADE'), nullable=False, )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id': self.question_id,
        }
