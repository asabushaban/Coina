from datetime import timezone
from .db import db
from sqlalchemy.orm import relationship

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    answer_id = db.Column(db.Integer, db.ForeignKey("answers.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    user = relationship("User", back_populates="comments")
    answer = relationship("Answer", back_populates="comments")

def to_dict(self):
    return {
                    'id': self.id,
                    'body': self.body,
                    'user_id': self.user_id,
                    'answer_id': self.answer_id,
                    'created_at' : self.created_at.strftime("%m-%d-%Y %I:%M %p"),
                    'updated_at' : self.updated_at.strftime("%m-%d-%Y %I:%M %p"),
                }
