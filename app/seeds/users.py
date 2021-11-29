from app.models import db, User
from datetime import date, datetime, timedelta

import random
import string

def random_char(y):
       return ''.join(random.choice(string.ascii_letters) for x in range(y))

today = datetime.now()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(name = 'Demo',
        username='Demo', email='demo@aa.io', password='password', created_at=today, updated_at=today)
    marnie = User(name = 'marnie',
        username='marnie', email='marnie@aa.io', password='password', created_at=today, updated_at=today)
    bobbie = User(name = 'bobbie',
        username='bobbie', email='bobbie@aa.io', password='password', created_at=today, updated_at=today)
    cryptoBit = User(name = 'cryptoBit',
        username='cryptoBit', email='cryptoBit@aa.io', password='password', created_at=today, updated_at=today)
    coinCollector = User(name = 'coinCollector',
        username='coinCollector', email='coinCollector@aa.io', password='password', created_at=today, updated_at=today)
    ethereumLover = User(name = 'ethereumLover',
        username='ethereumLover', email='ethereumLover@aa.io', password='password', created_at=today, updated_at=today)
    bitcorn = User(name = 'bitcorn',
        username='bitcorn', email='bitcorn@aa.io', password='password', created_at=today, updated_at=today)
    chainlinkHero = User(name = 'chainlinkHero',
        username='chainlinkHero', email='chainlinkHero@aa.io', password='password', created_at=today, updated_at=today)
    LinkLover = User(name = 'LinkLover',
        username='LinkLover', email='LinkLover@aa.io', password='password', created_at=today, updated_at=today)
    DogeToTheMoon = User(name = 'DogeToTheMoon',
        username='DogeToTheMoon', email='DogeToTheMoon@aa.io', password='password', created_at=today, updated_at=today)
    TechGuy88 = User(name = 'TechGuy88',
        username='TechGuy88', email='TechGuy88@aa.io', password='password', created_at=today, updated_at=today)
    jimmyBucks = User(name = 'jimmyBucks',
        username='jimmyBucks', email='jimmyBucks@aa.io', password='password', created_at=today, updated_at=today)
    twinklevoss = User(name = 'twinklevoss',
        username='twinklevoss', email='twinklevoss@aa.io', password='password', created_at=today, updated_at=today)
    mayTheFourth = User(name = 'John Jacob',
        username='4thIndustrialRevolution', email='mayTheFourth@aa.io', password='password', created_at=today, updated_at=today)
    goCoogs = User(name = 'goCoogs',
        username='goCoogs', email='goCoogs@aa.io', password='password', created_at=today, updated_at=today)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(cryptoBit)
    db.session.add(coinCollector)
    db.session.add(ethereumLover)
    db.session.add(bitcorn)
    db.session.add(chainlinkHero)
    db.session.add(LinkLover)
    db.session.add(DogeToTheMoon)
    db.session.add(TechGuy88)
    db.session.add(jimmyBucks)
    db.session.add(twinklevoss)
    db.session.add(mayTheFourth)
    db.session.add(goCoogs)
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))
    db.session.add(User(name = random_char(5), username=random_char(10), email=random_char(4)+"@aa.io", password='password', created_at=today, updated_at=today))


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
