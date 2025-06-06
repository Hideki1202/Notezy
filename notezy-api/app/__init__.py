from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = os.getenv("MONGO_URL", "mongodb://localhost:27017/meu_banco")
    CORS(app)

    mongo.init_app(app)

    # Importa e registra as rotas
    from .notes_routes import notes_bp
    app.register_blueprint(notes_bp, url_prefix='/notes')

    return app
