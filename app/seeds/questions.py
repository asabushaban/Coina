from app.models import db, Question
from datetime import date, datetime, timedelta
from random import randint
today = datetime.now()


def seed_questions():
    db.session.add(Question(question="What's the most exiciting project in crypto?", body="seed", user_id=1, created_at=today, updated_at=today))
    db.session.add(Question(question="What's the big deal with NFTs? Are they all hype?", body="seed", user_id=2, created_at=today, updated_at=today))
    db.session.add(Question(question="In what language should I build a smart contract for weather insurance?", body="seed", user_id=3, created_at=today, updated_at=today))
    db.session.add(Question(question="How much should I sell my cryptopunk for?", body="seed", user_id=4, created_at=today, updated_at=today))
    db.session.add(Question(question="How many shiba will I need to retire??", body="seed", user_id=5, created_at=today, updated_at=today))
    db.session.add(Question(question="How many TPS will ethereum be able to handle after the merge?", body="seed", user_id=6, created_at=today, updated_at=today))
    db.session.add(Question(question="If bitcoin is digital gold, then what is digital silver?", body="seed", user_id=7, created_at=today, updated_at=today))
    db.session.add(Question(question="Can you name something comparable to chainlink from the early days of the internet?", body="seed", user_id=8, created_at=today, updated_at=today))
    db.session.add(Question(question="If ethereum can't scalr what's the next best alternative?", body="seed", user_id=9, created_at=today, updated_at=today))
    db.session.add(Question(question="How much doge could a doge chuck chuck if a doge chuck could chuck doge?", body="seed", user_id=10, created_at=today, updated_at=today))
    db.session.add(Question(question="How do you value a token?", body="seed", user_id=11, created_at=today, updated_at=today))
    db.session.add(Question(question="What is web 3?", body="seed", user_id=12, created_at=today, updated_at=today))
    db.session.add(Question(question="What's the best crypto exchange?", body="seed", user_id=13, created_at=today, updated_at=today))
    db.session.add(Question(question="Is regulation the biggest hurdle for adoption of cryptocurrency?", body="seed", user_id=14, created_at=today, updated_at=today))
    db.session.add(Question(question="Who invented bitcoin?", body="seed", user_id=15, created_at=today, updated_at=today))
    db.session.commit()


def undo_questions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
