from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# question form

class AnswerForm(FlaskForm):
    body = StringField("body", validators = [DataRequired()])
    image = StringField("image")
    user_id = StringField("user_id", validators = [DataRequired()])
    question_id = StringField("question_id", validators = [DataRequired()])
