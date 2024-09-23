import json


prompts = []
with open("processed_prompts.json") as prompt_file:
    prompts = json.load(prompt_file)


job_postings = []
with open("job_postings.json") as postings_file:
    job_postings = json.load(postings_file)

combined_data = []
for i, prompt in enumerate(prompts):
    job_posting = job_postings[i]

    job_posting.update(prompt)

    combined_data.append(job_posting)


for job_post in combined_data:
    if job_post["company_name"]:
        if "grupalia" in job_post["company_name"].lower():
            print(
                f"{job_post['salary_range']['min_bound']} - {job_post['salary_range']['max_bound']}"
            )
            print(job_post["date"]["year"])
