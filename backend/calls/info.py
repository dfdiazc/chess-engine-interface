import requests

login_point = "http://127.0.0.1:8000/users/login"
userdata = {"username": "jotas", "password": "test_password"}

auth_response = requests.post(login_point, json = userdata)

token = auth_response.json()["access"]

endpoint = f"http://127.0.0.1:8000/users/{userdata['username']}"

d = {"Authorization": f"Bearer {token}"}
response = requests.get(endpoint, headers = d)

print(response.json())
