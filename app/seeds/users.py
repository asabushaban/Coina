from app.models import db, User
from datetime import date, datetime, timedelta

today = datetime.now()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(name = 'Demo',
        username='Demo', email='demo@aa.io', password='password', created_at=today, updated_at=today)
    marnie = User(name = 'marnie',
        username='marnie', email='marnie@aa.io', password='password', created_at=today, updated_at=today)
    bobbie = User(name = 'bobbie',
        username='bobbie', email='bobbie@aa.io', password='password', created_at=today, updated_at=today)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
