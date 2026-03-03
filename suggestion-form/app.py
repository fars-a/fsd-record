from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
@app.route('/')
def home():
    return render_template('simple_suggestion.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    name = data.get("name")
    suggestion = data.get("suggestion")
    if not name or not suggestion:
        return jsonify({"message": "Please fill all fields"})
    return jsonify({"message": f"Thank you {name}, suggestion received!"})

if __name__ == '__main__':
    app.run(debug=True)