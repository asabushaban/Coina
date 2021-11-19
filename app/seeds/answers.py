from app.models import db, Answer
from datetime import date, datetime, timedelta
from random import randint
today = datetime.now()



def seed_answers():
    db.session.add(Answer(body="Without a doubt it's chainlink!", user_id=5, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="Doge to the moon", user_id=3, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="Avalanche is fast and easy.", user_id=4, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="Ocean and Status have some very big goals", user_id=9, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="Bitcoin is the first and the best", user_id=1, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="They are here to stay!", user_id=7, question_id=2, created_at=today, updated_at=today))
    db.session.add(Answer(body="Certificates of digital authenticity. An amazing leap for buying a peice of culture. Memes.. Art.. the list goes on!", user_id=1, question_id=2, created_at=today, updated_at=today))
    db.session.add(Answer(body="Solidity", user_id=10, question_id=3, created_at=today, updated_at=today))
    db.session.add(Answer(body="Plutus or Glow", user_id=12, question_id=3, created_at=today, updated_at=today))
    db.session.add(Answer(body="Build it on Avalanche", user_id=13, question_id=3, created_at=today, updated_at=today))
    db.session.add(Answer(body="C#", user_id=9, question_id=3, created_at=today, updated_at=today))
    db.session.add(Answer(body="15 eth", user_id=2, question_id=4, created_at=today, updated_at=today))
    db.session.add(Answer(body="1 million euros", user_id=12, question_id=4, created_at=today, updated_at=today))
    db.session.add(Answer(body="no less than what you bought it for!", user_id=7, question_id=4, created_at=today, updated_at=today))
    db.session.add(Answer(body="don't sell it!!", user_id=8, question_id=4, created_at=today, updated_at=today))
    db.session.commit()


def undo_answers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
