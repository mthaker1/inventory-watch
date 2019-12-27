def ScriptTemplate():

    template = """
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options;
    from win10toast import ToastNotifier;
    import random
    import time

    options = Options();
    options.add_argument("--headless");
    driver = webdriver.Chrome("drivers\chromedriver.exe", options=options);

    driver.get("%s");

    html = driver.execute_script("return document.body.innerHTML;");

    word = "%s";

    productName = "%s";

    if word in html:
        toaster = ToastNotifier();
        toaster.show_toast(productName, productName + " is now in stock");
    else:
        print(False);

    driver.quit();

    """

    return template;
