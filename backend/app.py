from flask import Flask, request, jsonify
from flask_cors import CORS

import requests

app = Flask(__name__)
CORS(app,resources={r"/*": {"origins": "https://botpredict.vercel.app"}})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    response = requests.post('https://barasa.pythonanywhere.com/predict', json=data)
    prediction = response.json()['prediction']
    return jsonify({'prediction':prediction})

if __name__ == '__main__':
    app.run(debug=True)