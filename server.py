# pip install -r requirements.txt
# We need Flask
from flask import Flask
# NINJA API need API key set in headers
from flask_headers import *
from flask_cors import CORS
import json
import requests

# import secret keys
from dotenv import load_dotenv, find_dotenv
import os

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)

# allow client to connect from other origin
# localhost:3000 -> localhost:5000
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

# API Ninja for geocoding
#ninja_api = os.getenv("NINJA_API")
load_dotenv(find_dotenv())

api_url = 'https://api.api-ninjas.com/v1/geocoding?city='

# check if it works
@app.route('/')
def hello_world():
    return 'Main route'

# Get city lat and long from geocoding API
@app.route('/city/<city>')
def getWeather(city):
    response = requests.get(api_url + city, headers={'X-Api-Key': os.environ.get("NINJA_API")})
    if response.status_code == requests.codes.ok:
        # save to disk
        with open('city.json','w') as f:
            json.dump(response.json(),f)
        return response.json()
    else:
        print("Error:", response.status_code, response.text)
        return response.status_code

# Read last saved city
@app.route('/city_suggestion/')
def getSuggestions():
    with open('city.json','r') as f:
        data = json.load(f)
    return data


# Read last saved weather
@app.route('/weather/')
def local_weather():
    with open('weather.json','r') as f:
        data = json.load(f)
    print(data)
    return data

# Check weather at specifued coordinates 
@app.route('/city/<lat>/<long>')
def get_weather(lat,long):
    # Weather API URL
    url = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&current=&daily=&forecast_days=3"
    response = requests.get(url)
    if response.status_code == requests.codes.ok:
        # save to disk
        with open('weather.json','w') as f:
            json.dump(response.json(),f)
        return response.json()
    else:
        print("Error:", response.status_code, response.text)

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()