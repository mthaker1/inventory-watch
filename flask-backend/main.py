from flask import Flask, render_template, request, jsonify
from scriptTemplate import ScriptTemplate;
import uuid;
from inventoryDataManager import InventoryDataManager;
import requests
from bs4 import BeautifulSoup;
from win10toast import ToastNotifier;
import time;
import multiprocessing;


app = Flask("__main__")

processes = [];
idToProcessDict = {};

def checkInventory(url: str, productName: str, keyword: str):

    counter = 0;
    while(True):
        siteURL = url;

        headers = {
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"
        };

        searchWord = keyword;

        page = requests.get(url, headers=headers);

        soup = BeautifulSoup(page.content, 'html.parser');

        if(soup.find(searchWord) != -1):
            toaster = ToastNotifier();
            toaster.show_toast(productName, productName + " is now in stock");
            break;

        if(counter == 2):
            toaster = ToastNotifier();
            toaster.show_toast("Process", "Process has been completed");
            break;
        time.sleep(60);
        counter+=1;




@app.route("/getInventoryData", methods=["GET"])
def getInventoryData():
    inventoryData = InventoryDataManager.getInventory();
    return jsonify(inventoryData);


@app.route("/deleteProductWatch", methods=["POST"])
def deleteProductWatch():
    data = request.get_json();
    id = data.get("id");
    InventoryDataManager.deleteProductWatch(id);

    processes[idToProcessDict[id]].terminate();
    processes[idToProcessDict[id]].join();

    return jsonify({'result': 'success'});


@app.route("/updateProductWatch", methods=["POST"])
def updateProductWatch():
    data = request.get_json();
    # Declare variables for the data that was passed through
    id = data.get("id");
    productName = data.get("productName");
    url = data.get("url");
    keyword = data.get("keyword");
    email = data.get("email");
    startWatchDate = data.get("startWatchDate");
    endWatchDate = data.get("endWatchDate");

    addedId = InventoryDataManager.updateProductWatch(id, productName, url, keyword, email, startWatchDate, endWatchDate);

    processes[idToProcessDict[id]].terminate();
    processes[idToProcessDict[id]].join();

    p = multiprocessing.Process(target=checkInventory, args=[url, productName, keyword]);
    p.start();
    processes[idToProcessDict[id]] = p;

    return jsonify({'result': 'success'});


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

    p = multiprocessing.Process(target=checkInventory, args=[url, productName, keyword]);
    p.start();

    idToProcessDict[addedId] = len(processes);
    processes.append(p);

    return jsonify({'result': 'success'});

@app.route("/closeInventoryWatch", methods=["POST"])
def closeInventoryWatch():
    for process in processes:
        process.terminate();
        process.join();

@app.route("/")
def my_index():
    return render_template("index.html")

app.run(debug=True)
