from flask import Flask, render_template, request, jsonify

app = Flask("__main__")


@app.route("/notify", methods=["POST"])
def notify():
    data = request.get_json()
    print(data);
    print(data.get("email"));
    return jsonify({'result': 'success'});

@app.route("/")
def my_index():
    return render_template("index.html")

app.run(debug=True)
