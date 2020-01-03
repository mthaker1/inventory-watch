import uuid;
import csv;

class InventoryDataManager:

    def getInventory():
        return False;

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