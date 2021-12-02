from app.models import db, Follow
from random import randint



# Adds a follow data
def seed_follows():
    i = 1
    j = 1
    for i in range(1, 42):
        for j in range(1, 42, randint(1, 4)):
            if i != j:
                db.session.add(Follow(follower=i,followed=j))
    i+=1
    j+=1
    db.session.commit()



def undo_follows():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
