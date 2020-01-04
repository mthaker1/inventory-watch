from flask import Flask, render_template, request, jsonify
from scriptTemplate import ScriptTemplate;
import uuid;
from inventoryDataManager import InventoryDataManager;


app = Flask("__main__")

results = [];


@app.route("/getInventoryData", methods=["GET"])
def getInventoryData():
    inventoryData = InventoryDataManager.getInventory();
    return jsonify(inventoryData);

@app.route("/addProductWatch", methods=["POST"])
def addProductWatch():
    data = request.get_json();

    # Declare variables for the data that was passed through
    productName = data.get("productName");
    url = data.get("url");
    keyword = data.get("keyword");
    email = data.get("email");
    startWatchDate = data.get("startWatchDate");
    endWatchDate = data.get("endWatchDate");

    addedId = InventoryDataManager.addProductWatch(productName, url, keyword, email, startWatchDate, endWatchDate);

    results.append(1);
    print(results);
    return jsonify({'result': 'success'});

@app.route("/")
def my_index():
    return render_template("index.html")

app.run(debug=True)
