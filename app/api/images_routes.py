import boto3
import botocore
from flask import Blueprint, request
from flask_login import login_required
from operator import itemgetter

from app.config import Config
from app.aws_s3 import *
from app.models import db
#any other imports as needed

images_routes = Blueprint('images', __name__)
  #Don't forget to register your Blueprint

@images_routes.route('/add', methods=["POST"])
@login_required
def upload_image():

    image_form = None if "image" not in request.files else upload_file_to_s3(request.files["image"], Config.S3_BUCKET)

    if image_form:
         # create an instance of <Your_Model>
         return {"image":image_form}
    else:
        return "not found"
