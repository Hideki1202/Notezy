from flask import Blueprint, request, jsonify
from app import mongo

notes_bp = Blueprint('notes', __name__)


@notes_bp.route('/')
def home():
    return 'API Flask + MongoDB funcionando!'


@notes_bp.route('/list', methods=['GET'])
def get_notes():
    notes = mongo.db.notes.find()
    result = []

    for note in notes:
        result.append({
            "id": str(note["_id"]),
            "color": note.get("color", ""),
            "title": note.get("title", ""),
            "content": note.get("content", "")
        })

    return jsonify(result)

@notes_bp.route('/create', methods=['POST'])
def save_note():
    data = request.get_json()

    title = data.get('title')
    content = data.get('content')
    color = data.get('color')


    if not title or not content or not color:
        return jsonify({"error": "title, color e content são obrigatórios"}), 400

    result = mongo.db.notes.insert_one({
        "title": title,
        "content": content,
        "color": color
    })

    return jsonify({
        "msg": "Nota salva com sucesso",
        "id": str(result.inserted_id)
    }), 201