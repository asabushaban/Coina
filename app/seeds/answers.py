from app.models import db, Answer
from datetime import datetime
today = datetime.now()


# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/4IR.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/Doge-Glasses.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/ETH-Gas.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/ETH-Rocket.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/Ocean.png"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/chainlink-Alltrue.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/coinbase-execute.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/decenteralized.jpeg"
image="https://coina.s3.amazonaws.com/seeder-Images-Coina/HODL.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/NFT-are-the-future.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/one-does-not-simply-avax.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/scaling-IE.jpeg"
# image="https://coina.s3.amazonaws.com/seeder-Images-Coina/why-would-I-nft.jpeg"

def seed_answers():
    db.session.add(Answer(body="Without a doubt it's chainlink!", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/chainlink-AllTrue.jpeg", user_id=5, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="Doge to the moon", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/Doge-Glasses.jpeg", user_id=3, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="Avalanche is fast and easy.", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/one-does-not-simply-avax.jpeg", user_id=4, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="Ocean and Status have some very big goals", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/Ocean.png", user_id=9, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="Bitcoin is the first and the best", user_id=1, question_id=1, created_at=today, updated_at=today))
    db.session.add(Answer(body="They are here to stay!", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/why-would-I-nft.jpeg", user_id=7, question_id=2, created_at=today, updated_at=today))
    db.session.add(Answer(body="Certificates of digital authenticity. An amazing leap for buying a peice of culture. Memes.. Art.. the list goes on!", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/NFT-are-the-future.jpeg", user_id=1, question_id=2, created_at=today, updated_at=today))
    db.session.add(Answer(body="Solidity", user_id=10, question_id=3, created_at=today, updated_at=today))
    db.session.add(Answer(body="Plutus or Glow", user_id=12, question_id=3, created_at=today, updated_at=today))
    db.session.add(Answer(body="Build it on Avalanche", user_id=13, question_id=3, created_at=today, updated_at=today))
    db.session.add(Answer(body="C#", user_id=9, question_id=3, created_at=today, updated_at=today))
    db.session.add(Answer(body="15 eth", user_id=2, question_id=4, created_at=today, updated_at=today))
    db.session.add(Answer(body="1 million euros", user_id=12, question_id=4, created_at=today, updated_at=today))
    db.session.add(Answer(body="no less than what you bought it for!", user_id=7, question_id=4, created_at=today, updated_at=today))
    db.session.add(Answer(body="less than 1!", user_id=9, question_id=5, created_at=today, updated_at=today))
    db.session.add(Answer(body="billions... they're a fraction of a penny", user_id=7, question_id=5, created_at=today, updated_at=today))
    db.session.add(Answer(body="1 million by 2023", user_id=4, question_id=5, created_at=today, updated_at=today))
    db.session.add(Answer(body="if they're a dollar each then I would say 100k is making it", user_id=8, question_id=5, created_at=today, updated_at=today))
    db.session.add(Answer(body="you can never have enough", user_id=12, question_id=5, created_at=today, updated_at=today))
    db.session.add(Answer(body="It's hard to say, but Vitalik is estimating thousands per second with layer two help", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/ETH-Rocket.jpeg", user_id=1, question_id=6, created_at=today, updated_at=today))
    db.session.add(Answer(body="It doesn't matter if gas fees are stay so high!", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/ETH-Gas.jpeg", user_id=2, question_id=6, created_at=today, updated_at=today))
    db.session.add(Answer(body="more than you", user_id=3, question_id=6, created_at=today, updated_at=today))
    db.session.add(Answer(body="clearly Litecoin!!!", user_id=5, question_id=7, created_at=today, updated_at=today))
    db.session.add(Answer(body="Ethereum.. is that a real question?", user_id=6, question_id=7, created_at=today, updated_at=today))
    db.session.add(Answer(body="Chainlink is diamond", user_id=1, question_id=7, created_at=today, updated_at=today))
    db.session.add(Answer(body="not sure but I know it's not BSV", user_id=8, question_id=7, created_at=today, updated_at=today))
    db.session.add(Answer(body="HTTP... can you imagine investing in http in the the early 90s?? Early!", user_id=12, question_id=8, created_at=today, updated_at=today))
    db.session.add(Answer(body="Solona!", user_id=4, question_id=9, created_at=today, updated_at=today))
    db.session.add(Answer(body="not sure but I know it's not BSV", user_id=13, question_id=9, created_at=today, updated_at=today))
    db.session.add(Answer(body="Ethereum will scale.. patience is key!", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/scaling-IE.jpeg", user_id=15, question_id=9, created_at=today, updated_at=today))
    db.session.add(Answer(body="Why does no one consider the possibility of a multi chain world?", user_id=14, question_id=9, created_at=today, updated_at=today))
    db.session.add(Answer(body="less than 1!", user_id=9, question_id=10, created_at=today, updated_at=today))
    db.session.add(Answer(body="billions... they're a fraction of a penny", user_id=7, question_id=10, created_at=today, updated_at=today))
    db.session.add(Answer(body="1 million by 2023", user_id=4, question_id=10, created_at=today, updated_at=today))
    db.session.add(Answer(body="you can never have enough", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/HODL.jpeg", user_id=12, question_id=10, created_at=today, updated_at=today))
    db.session.add(Answer(body="memes", user_id=1, question_id=11, created_at=today, updated_at=today))
    db.session.add(Answer(body="founders, whitepaper, and token utility", user_id=2, question_id=11, created_at=today, updated_at=today))
    db.session.add(Answer(body="Like you value anything, supply and demand", user_id=10, question_id=11, created_at=today, updated_at=today))
    db.session.add(Answer(body="it's basically decentralizing the interent",image="https://coina.s3.amazonaws.com/seeder-Images-Coina/decenteralized.jpeg", user_id=3, question_id=12, created_at=today, updated_at=today))
    db.session.add(Answer(body="the fourth industrial revolution",image="https://coina.s3.amazonaws.com/seeder-Images-Coina/4IR.jpeg", user_id=6, question_id=12, created_at=today, updated_at=today))
    db.session.add(Answer(body="Coinbase has FDIC insurance!", image="https://coina.s3.amazonaws.com/seeder-Images-Coina/coinbase-execute.jpeg", user_id=7, question_id=13, created_at=today, updated_at=today))
    db.session.add(Answer(body="Binance is awesome", user_id=6, question_id=13, created_at=today, updated_at=today))
    db.session.add(Answer(body="Gemini.. those twins from Facebook figured it out", user_id=11, question_id=13, created_at=today, updated_at=today))
    db.session.add(Answer(body="I switched from coinbase to Kraken and so far all is good", user_id=2, question_id=13, created_at=today, updated_at=today))
    db.session.add(Answer(body="I think scaling is in my opinion", user_id=3, question_id=14, created_at=today, updated_at=today))
    db.session.add(Answer(body="Yeahhhh... good luck with that", user_id=5, question_id=14, created_at=today, updated_at=today))
    db.session.add(Answer(body="it would be a shame if your country was last to the party", user_id=15, question_id=14, created_at=today, updated_at=today))
    db.session.add(Answer(body="Craig Wright", user_id=3, question_id=15, created_at=today, updated_at=today))
    db.session.add(Answer(body="Seth Rogan", user_id=7, question_id=15, created_at=today, updated_at=today))
    db.session.add(Answer(body="Brad Simpson", user_id=3, question_id=15, created_at=today, updated_at=today))
    db.session.add(Answer(body="Probably Elon Musk", user_id=9, question_id=15, created_at=today, updated_at=today))
    db.session.add(Answer(body="Tom Brady", user_id=12, question_id=15, created_at=today, updated_at=today))
    db.session.add(Answer(body="Jesus", user_id=10, question_id=15, created_at=today, updated_at=today))
    db.session.commit()


def undo_answers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
