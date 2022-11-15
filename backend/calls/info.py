import requests

login_point = "http://127.0.0.1:8000/users/login"
userdata = {"username": "test_username2", "password": "hello,world"}

auth_response = requests.post(login_point, json = userdata)

token = auth_response.json()["access"]

endpoint = "http://127.0.0.1:8000/users/info"

d = {"Authorization": f"Bearer {token}"}
response = requests.get(endpoint, headers = d)

print(response.text)
