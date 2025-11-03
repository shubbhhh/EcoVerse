import requests
import json

API_KEY = "dMdHfeX7d51tupZXkcK3xaDgAYUjDMR6aGlYQj3K"
BASE_URL = "https://api.globalforestwatch.org/v1/loss"

params = {
    "bbox": "68.0,6.5,97.0,37.0",  # Bounding box for India
    "start_date": "2000-01-01",  # Start date
    "end_date": "2023-01-01"  # End date
}

headers = {
    "Authorization": f"Bearer {API_KEY}"
}

response = requests.get(BASE_URL, params=params, headers=headers)

if response.status_code == 200:
    data = response.json()

    # Save GeoJSON response
    with open("forest_loss_india_2000_2023.geojson", "w") as f:
        json.dump(data, f)
    print(f"Data saved to forest_loss_india_2000_2023.geojson. Features count: {len(data.get('features', []))}")
else:
    print(f"Error: {response.status_code}, {response.text}")
