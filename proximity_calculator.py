
from haversine import haversine
from time import sleep
import requests, json

FB_URL = "https://exo-foodtruck.firebaseio.com/trucks.json"
FB_SEND_MSG_FMT_URL = "https://exo-foodtruck.firebaseio.com/trucks/{rid}/subscribers/0/.json"
def main():
	while True:
		all_trucks = requests.get(FB_URL).json()

		for truck, blob in all_trucks.items():
			print("WILL :: ",truck, "\n", json.dumps(blob, indent=2))
			if blob.get('subscribers'):
				truckLocation = (blob['status']['gps']['lat'], blob['status']['gps']['long'])
				subscriberLocation = (	blob['subscribers']['addresses'][0]['address_string']['lat'],
										blob['subscribers']['addresses'][0]['address_string']['lng']
				)
				proximity = haversine(truckLocation, subscriberLocation, miles=True)
				print(	"Truck: ", truckLocation, 
						"Subscriber: ", subscriberLocation,
						"Haversine Dist: ", proximity
				)
				if proximity >= blob['subscribers']['addresses'][0]['geofence_data']:
					# set flag to tell 1P to send notification
					pass


			else:
				print("No subscribers for ", blob['name'])
		sleep(15)

if __name__ == '__main__':
	main()

