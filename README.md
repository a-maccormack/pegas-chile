# Pegas Chile

# 🔧 Project Overview

<div>
    <code><img width="10" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
    <code><img width="10" src="https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png" alt="Figma" title="Figma"/></code>
    <code><img width="10" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
    <code><img width="10" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
    <code><img width="10" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></code>
    <code><img width="10" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/></code>
    <code><img width="10" src="https://user-images.githubusercontent.com/25181517/183423507-c056a6f9-1ba8-4312-a350-19bcbc5a8697.png" alt="Python" title="Python"/></code>
</div>
This project involves scrapping job postings from a Telegram Channel and presenting them via a frontend built with Next.js. The jobs are categorized "manually" (with BeautifulSoup) and through the assistance of language models (LLMs).

## Key Features

- Automated Scraping: Scrapes and parses job posts from a dynamic Telegram group chat.
- Categorization: Job postings are categorized both manually and using LLM assistance.
- Frontend with Next.js: Displays categorized job posts with a clean UI.
- Hosted on Vercel: Free and easy-to-use deployment.

# 📸 Screenshots

![Landing](/media/landing.png)
![Internal](/media/internal.png)

# 📂 Project Structure

## Scraping Process

The scraping process targets the DCCEmpleo Telegram Channel, which regularly posts job listings. I scraped over 1,400 job posts, categorizing them with a combination of manual tagging and language model assistance (GPT-4 mini).

- Scraper Code: All the scraping logic is located in the [/processing/](/processing/) directory.
- Output Data: The final job post data is stored as JSON and can be found in [/frontend/src/job-posts.json](/frontend/src/job-posts.json).

## 🤖 LLM Assistance

I used GPT-4 mini to assist in processing and categorizing job posts where manual effort was too time-consuming. You can view the LLM prompt I used here.
Frontend

The frontend is built using Next.js, allowing for easy static data API generation to serve the job data scraped during the first phase. The frontend consumes the JSON data and displays it through a clean, responsive UI.

- Frontend Code: Check the frontend implementation in the [/frontend/](/frontend/) directory.
- Hosting: Deployed on Vercel, which provides free hosting and seamless integration with Next.js.
