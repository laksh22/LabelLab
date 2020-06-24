from flask import Blueprint

from api.controllers import modelscontroller

modelsprint = Blueprint("models", __name__)

modelsprint.add_url_rule(
    "/models/save",
    view_func=modelscontroller.modelController["save"],
    methods=["POST"]
)

modelsprint.add_url_rule(
    "/models/train",
    view_func=modelscontroller.modelController["train"],
    methods=["POST"]
)

modelsprint.add_url_rule(
    "/models/export",
    view_func=modelscontroller.modelController["export"],
    methods=["GET"]
)