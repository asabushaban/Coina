from datetime import timezone
from .db import db
from sqlalchemy.orm import relationship

class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    user = relationship("User", back_populates="answers")
    questions = relationship("Question", back_populates="answers")
    comments = relationship("Comment", back_populates="answers")

    def to_dict(self):
        return {
                        'id': self.id,
                        'body': self.body,
                        'user_id': self.user_id,
                        'question_id': self.question_id,
                        'created_at' : self.created_at.strftime("%m-%d-%Y %I:%M %p"),
                        'updated_at' : self.updated_at.strftime("%m-%d-%Y %I:%M %p"),
                    }
