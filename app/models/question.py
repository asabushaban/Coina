from datetime import timezone
from .db import db
from sqlalchemy.orm import relationship

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    user = relationship("User", back_populates="questions")

def to_dict(self):
    return {
                    'id': self.id,
                    'title': self.title,
                    'body': self.body,
                    'user_id': self.user_id,
                    'created_at' : self.created_at.strftime("%m-%d-%Y %I:%M %p"),
                    'updated_at' : self.updated_at.strftime("%m-%d-%Y %I:%M %p"),
                }
