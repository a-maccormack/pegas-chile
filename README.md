# Job Scrapper
## TODO:
- [ ] Job Post Company Categorize

## Prompt
Reply only with JSON. I will provide text containing a job post. I need you to extract data like salary range, company name, technologies, remote work policy and exployment type and only reply in json with the following format:

{
"company_name": <string>,
"remote_work_policy": <remote, hybrid, in person>,
"employment_type": <practica, fulltime, trabajo de titulo, part time>,
"salary_range": {
   "currency": "CLP",
   "min_bound": <only-money-amount>,
   "max_bound": <only-money-amount>
},
"technologies": []
}