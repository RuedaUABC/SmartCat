from flask import Flask, render_template, jsonify, request
import random
import json

app = Flask(__name__)

# Cargar preguntas desde un archivo JSON
def load_questions():
    with open('questions.json', 'r', encoding='utf-8') as file:
        return json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/play')
def play():
    return render_template('play.html')

@app.route('/ranking')
def ranking():
    return render_template('ranking.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/get_question')
def get_question():
    questions = load_questions()
    question = random.choice(questions)
    return jsonify(question)

@app.route('/submit_score', methods=['POST'])
def submit_score():
    data = request.get_json()
    score = data.get('score', 0)
    return jsonify({'message': 'Score received', 'score': score})

if __name__ == '__main__':
    app.run(debug=True)
