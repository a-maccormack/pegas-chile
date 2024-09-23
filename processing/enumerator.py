import json

newData = []

with open("final.json") as file:
    data = json.load(file)

    for i, j in enumerate(data):
        j["id"] = i + 1
        newData.append(j)

with open("final-enumerated.json", "w") as outfile:
    json.dump(newData, outfile, indent=4)
