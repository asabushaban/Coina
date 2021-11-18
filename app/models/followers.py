from datetime import timezone
from .db import db
from sqlalchemy.orm import relationship



class Follow(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    follower = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    followed = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )

    def to_dict(self):
        return {
            'id': self.id,
            'follower': self.follower,
            'followed': self.followed,
        }
