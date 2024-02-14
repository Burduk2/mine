from flask import Flask, render_template, request, jsonify
import requests
from bs4 import BeautifulSoup


app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():    
    return render_template('index.html', error='none')



@app.route('/scrape', methods=['POST'])
def scrape():
    key1 = request.form.get('st')
    key2 = request.form.get('nd')
    depth = int(request.form.get('depth'))
    unformattedDepth = int(depth / 2)
    
    depthMatches = [2, 4, 6, 8, 16, 24, 32]
    
    if (depth not in depthMatches):
        return render_template('index.html', error='depth') 
    
    elif (key1 == '' or key2 == ''):
        return render_template('index.html', error='emptyKey')
    
    elif (key1 == key2):
        return render_template('index.html', error='sameKey')
    else:
        error = 'none'
        
    
    searchKeys = [f"{key1}+vs+{key2}", f"{key1}+or+{key2}"]
    
    totalFirst = 0
    totalSecond = 0

    for key in range(2):
        searchKey = searchKeys[key]
        
        for i in range(unformattedDepth):
            site = f'https://www.google.com/search?q={searchKey}&start={i}0'
            response = requests.get(site)

            if response.status_code == 200:
                html = response.text
                soup = BeautifulSoup(html, "html.parser")

                if (key == 0):
                    occurrences = soup.get_text().lower().count(key1.lower())
                    totalFirst += occurrences
                else:
                    occurrences = soup.get_text().lower().count(key2.lower())
                    totalSecond += occurrences
                    
    totalFirst = int(totalFirst * 101.4); totalSecond = int(totalSecond * 101.4) 
    
    if totalFirst == totalSecond and totalFirst == 0: 
        return render_template('index.html', reachedLimitLtx='active')
    
    if depth == 2:
        totalFirst = int(totalFirst * 3)
        totalSecond = int(totalSecond * 3)
    elif depth == 4:
        totalFirst = int(totalFirst * 1.5)
        totalSecond = int(totalSecond * 1.5)
    elif depth == 8:
        totalFirst = int(totalFirst / 1.333)
        totalSecond = int(totalSecond / 1.333) 
    elif depth == 16:
        totalFirst = int(totalFirst / 2.66)
        totalSecond = int(totalSecond / 2.66)
    elif depth == 24:
        totalFirst = int(totalFirst / 4)
        totalSecond = int(totalSecond / 4)
    elif depth == 32:
        totalFirst = int(totalFirst / 5.33)
        totalSecond = int(totalSecond / 5.33)
    
    return render_template('index.html', key1=key1, key2=key2, firstPts=totalFirst, secondPts=totalSecond, 
                           depth=depth, error=error, resultLtx='active')
    


if __name__ == '__main__':
    app.run(debug=True)