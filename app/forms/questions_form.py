from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# question form

class QuestionForm(FlaskForm):
    question = StringField("question", validators = [DataRequired()])
    user_id = StringField("user_id", validators = [DataRequired()])
