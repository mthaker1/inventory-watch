from flask import Flask, render_template, request, jsonify
from scriptTemplate import ScriptTemplate;
import uuid;


app = Flask("__main__")


@app.route("/notify", methods=["POST"])
def notify():
    data = request.get_json();
    fileString = ScriptTemplate() % (data.get("url"), data.get("keyword"), data.get("name"));
    f = open("demofile2.py", "a")
    f.write(fileString);
    f.close();
    print(data);
    print(data.get("email"));
    return jsonify({'result': 'success'});

@app.route("/")
def my_index():
    return render_template("index.html")

app.run(debug=True)
