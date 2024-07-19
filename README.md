# Пару слов о использованных технологиях
Стэк -  Python + Flask + React + Axios
Питон и Фласк коммандуют бэкэндом. Реакт и Эксиос берут данные с Фласк сервера.


# API
1. Требуется чтобы из названия города получить географические координаты
```Python
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
```
2. Позволяет читать с сервера данные о последнем запросе пользователя
```Python
# Read last saved city
@app.route('/city_suggestion/')
def getSuggestions():
    with open('city.json','r') as f:
        data = json.load(f)
    return data
```
3. Позволяет читать погоду с последнего запроса пользователя
```Python
# Read last saved weather
@app.route('/weather/')
def local_weather():
    with open('weather.json','r') as f:
        data = json.load(f)
    print(data)
    return data
```
4. Требуется для того чтобы получить данные о погоде по географическим координатом
```Python
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
```


# Настройка
0. Скачать этот репозиторий.
1. Перейти на сайт https://api-ninjas.com/  и получить бесплатный ключ (после регистрации).
2. Создать .env файл в корневой директории проекта(рядом с server.py), а в нем переменную ```NINJA_API=КЛЮЧ_ИЗ_ПЕРВОГО_ШАГА```
3. Открыть терминал из корневой директории и запустить команду ```pip install -r /path/to/requirements.txt```
4. Перейти в папку client/ и запустить команду ```npm install``` 

## Как запустить
1. Из корневой директории ```python server.py```
2. Из директории ./client/ ```npm run start```
   
## Дополнительно:
- [x] сделаны автодополнение (подсказки) при вводе города (работают не быстро и только если город существует)
