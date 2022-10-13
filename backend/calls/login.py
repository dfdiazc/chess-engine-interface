import requests

endpoint = "https://unrealchess.pythonanywhere.com/users/login"

userdata = {
    "username": "jotas",
    "password": "test_password777"
}

response = requests.post(endpoint, json=userdata)

print(response.json())
