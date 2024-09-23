import json


prompts = []
with open("processed_prompts.json") as prompt_file:
    prompts = json.load(prompt_file)


job_postings = []
with open("job_postings.json") as postings_file:
    job_postings = json.load(postings_file)

combined_data = []
offset = 1527

for i, prompt in enumerate(prompts):
    job_posting = job_postings[i]

    job_posting.update(prompt)
    job_posting["id"] = offset + i + 1
    combined_data.append(job_posting)


with open("final-enumerated.json", "w") as outfile:
    json.dump(combined_data, outfile, indent=4)
