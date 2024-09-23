import json
from typing import List, Optional, Dict, Any
from bs4 import BeautifulSoup, Tag
import os
import re
import time
from openai import OpenAI


class JobScraper:
    BASE_DIRECTORY = "chat_export"

    def __init__(self) -> None:
        self.chat_export_files: List[str] = []
        self.openai_client = OpenAI(api_key=self._load_openai_credentials())
        self.job_post_parsing_prompt = self._load_job_post_parsing_prompt()

    def _load_job_post_parsing_prompt(self) -> str:
        """Reads the parsing prompt and loads it from a file."""
        with open("prompt.txt") as file:
            return file.read()

    def _load_openai_credentials(self) -> str:
        """Loads OpenAI API credentials from a JSON file."""
        with open("creds.json") as file:
            credentials = json.load(file)
        return credentials["OPENAI_KEY"]

    def fetch_chat_export_files(self) -> None:
        """Fetches chat export files within the backup directory."""
        pattern = re.compile(r"^messages\d*\.html$")
        self.chat_export_files = sorted(
            f for f in os.listdir(self.BASE_DIRECTORY) if pattern.match(f)
        )

    def read_file(self, file_name: str) -> str:
        """Reads the content of a file from the base directory."""
        file_path = os.path.join(self.BASE_DIRECTORY, file_name)
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()

    def parse_job_post_data(self, file_content: str) -> List[List[Tag]]:
        """Parses job post content, extracting text and corresponding dates."""
        soup = BeautifulSoup(file_content, "html.parser")
        messages = soup.find_all(class_="text")

        filtered_messages = []
        for message in messages:
            if message.find_parent(class_="body"):
                filtered_messages.append(message)

        dates = soup.find_all(class_="pull_right date details")
        return [dates, filtered_messages]

    def extract_sender(self, job_post: Tag) -> Optional[str]:
        """Extracts the sender of the job post."""
        telegram_links = job_post.find_all("a", href=True)
        for link in telegram_links:
            if link["href"].startswith("https://t.me"):
                return link.text
        return None

    def extract_contact_email(self, job_post: Tag) -> List[str]:
        """Extracts contact emails from the job post."""
        return [
            link["href"].replace("mailto:", "").lower()
            for link in job_post.find_all("a", href=True)
            if link["href"].startswith("mailto:")
        ]

    def extract_contact_phone(self, job_post: Tag) -> List[str]:
        """Extracts phone numbers from the job post."""
        return [
            link["href"].replace("tel:", "")
            for link in job_post.find_all("a", href=True)
            if link["href"].startswith("tel:")
        ]

    def extract_links(self, job_post: Tag) -> List[str]:
        """Extracts external links from the job post."""
        return [
            link["href"].lower()
            for link in job_post.find_all("a", href=True)
            if not (
                link["href"].startswith("https://t.me")
                or link["href"].startswith("mailto:")
                or link["href"].startswith("tel:")
            )
        ]

    def extract_post_text(self, job_post: Tag) -> Optional[str]:
        """Extracts and cleans the text content of the job post."""
        post_copy = BeautifulSoup(str(job_post), "html.parser")
        for link in post_copy.find_all("a", href=True):
            if link["href"].startswith("https://t.me"):
                link.decompose()
        return post_copy.get_text(separator="\n").strip() or None

    def extract_post_date(self, date_tag: Tag) -> Dict[str, str]:
        """Extracts the date and time of the job post."""
        if "title" in date_tag.attrs:
            date_str = date_tag["title"]
            date, time, timezone = date_str.split()
            day, month, year = date.split(".")
            return {"day": day, "month": month, "year": year, "time": time}
        return {}

    def get_key_details_from_post(self, job_post_text: str) -> Dict[str, Any]:
        """Uses OpenAI to extract structured job post details."""
        for attempt in range(3):
            try:
                response = self.openai_client.chat.completions.create(
                    model="gpt-4o-mini",
                    max_completion_tokens=700,
                    messages=[
                        {
                            "role": "system",
                            "content": self.job_post_parsing_prompt,
                        },
                        {"role": "user", "content": job_post_text},
                    ],
                )

                job_details = json.loads(response.choices[0].message.content)

                return job_details
            except json.JSONDecodeError:
                print("Received non-JSON response. Retrying...")
                time.sleep(2)
            except Exception as e:
                print(f"Got exception during call: {str(e)}")

    def process_messages(self) -> None:
        """Processes all chat export files and extracts job post details."""
        self.fetch_chat_export_files()
        all_job_posts = []

        for file_name in self.chat_export_files:
            file_content = self.read_file(file_name)
            dates, job_posts = self.parse_job_post_data(file_content)

            for i, job_post in enumerate(job_posts):
                print(f"Processing job post {i+1}/{len(job_posts)}")
                if job_post:
                    post_date = self.extract_post_date(dates[i])
                    job_post_text = self.extract_post_text(job_post)

                    job_post_data = {
                        "sender": self.extract_sender(job_post),
                        "contact_email": self.extract_contact_email(job_post),
                        "contact_phone": self.extract_contact_phone(job_post),
                        "links": self.extract_links(job_post),
                        "text": job_post_text,
                        "date": post_date,
                    }

                    all_job_posts.append(job_post_data)

        with open("job_postings.json", "w", encoding="utf-8") as output_file:
            json.dump(all_job_posts, output_file, indent=4)

    def extract_details(self) -> None:
        """Processes all chat export files and extracts details."""
        self.fetch_chat_export_files()

        for file_name in self.chat_export_files:
            file_content = self.read_file(file_name)
            _, job_posts = self.parse_job_post_data(file_content)
            for i, job_post in enumerate(job_posts):
                print(
                    f"Processing job post {i+1}/{len(job_posts)} on filename {file_name}"
                )
                if job_post:
                    job_post_text = self.extract_post_text(job_post)
                    job_details = self.get_key_details_from_post(job_post_text or "")
                    job_details["text"] = job_post_text

                    with open("processed_prompts.json", "a") as outfile:
                        json.dump(job_details, outfile, indent=4)
                        outfile.write(",\n")


job_scraper = JobScraper()
job_scraper.extract_details()
