import requests

# get token

login_point = "http://127.0.0.1:8000/users/login"
userdata = {"username": "jotas", "password": "test_password"}

auth_response = requests.post(login_point, json = userdata)

token = auth_response.json()["access"]

# get user info

userdata["Authorization"] = f"Bearer {token}"

endpoint = "http://127.0.0.1:8000/users/info"

response = requests.get(endpoint, json = userdata)

print(response.json())
