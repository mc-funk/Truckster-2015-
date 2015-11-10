
from haversine import haversine
from time import sleep
import requests, json

FB_URL = "https://exo-foodtruck.firebaseio.com/trucks.json"
FB_SEND_MSG_FMT_URL = "https://exo-foodtruck.firebaseio.com/trucks/{truck_rid}/subscribers/{UID}/{subscriber_contact}/.json"
def main():
	while True:
		all_trucks = requests.get(FB_URL).json()

		for truck_rid, blob in all_trucks.items():
			# print("WILL :: ",truck_rid, "\n", json.dumps(blob, indent=2))
			if blob.get('subscribers'):
				# print("BLOB :: ", blob.get('subscribers'))
				for UID in blob['subscribers']:
					contact_info = list(blob['subscribers'][UID].keys())[0]
					# print("UID :: ", UID)
					contact = blob['subscribers'][UID][contact_info]
					# print("contact :: ", contact)
					truckLocation = (blob['status']['gps']['lat'], blob['status']['gps']['long'])
					subscriberLocation = (	contact['addresses'][0]['address_string']['lat'],
											contact['addresses'][0]['address_string']['lng']
					)
					proximity = haversine(truckLocation, subscriberLocation, miles=True)
					print(	"Truck: ", blob['name'],
							"Truck location: ", truckLocation, 
							"Subscriber location: ", subscriberLocation,
							"Haversine Dist: ", proximity
					)
					if proximity <= contact['addresses'][0]['geofence_data']:
						# set flag to tell 1P to send notification
						requests.patch(
							FB_SEND_MSG_FMT_URL.format(
								truck_rid=truck_rid,
								UID=UID,
								subscriber_contact=contact_info
							),
							json={"sendmessage": True, "messagesent":False}
						)
						print("Notifying subscriber that truck is near designated watch-point.")
					else:
						print("Truck not close enough for notification.")


			else:
				print("No subscribers for ", blob['name'])
		sleep(15)

if __name__ == '__main__':
	main()

