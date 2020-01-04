import uuid;
import csv;

class InventoryDataManager:

    def getInventory():

        inventoryData = [];
        with open('inventoryWatchData.csv', "r", newline='') as f:
            csvreader = csv.reader(f, delimiter=",")
            for row in csvreader:
                productData = {
                    "id": row[0],
                    "productName": row[1],
                    "url": row[2],
                    "keyword": row[3],
                    "email": row[4],
                    "startWatchDate": row[5],
                    "endWatchDate": row[6]
                };
                inventoryData.append(productData);

        inventoryData.pop(0);
        return inventoryData;

    def addProductWatch(productName: str, url: str, keyword: str, email: str, startWatchDate: str, endWatchDate: str) -> str:

        # Generate Unique Id
        newId = str(uuid.uuid4());

        # Note UUId has a very low chance of generating the same id twice, however, I just thought it was important to check
        # Confirm whether Id is Unique
        with open('inventoryWatchData.csv', "r", newline='') as f:
            csvreader = csv.reader(f, delimiter=",")
            isIdDifferent = True;
            while(isIdDifferent):
                isIdDifferent = False;
                for row in csvreader:
                    if newId in row[0]:
                        newId = str(uuid.uuid4());
                        isIdDifferent = True;
                        break;

        # Write Row to the Excel CSV file
        with open('inventoryWatchData.csv', 'a', newline='') as newFile:
            newFileWriter = csv.writer(newFile);
            newFileWriter.writerow([str(newId), productName, url, keyword, email, startWatchDate, endWatchDate]);

        return newId;


    def deleteProductWatch():
        return False;
