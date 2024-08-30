from typing import List, Optional
from bs4 import BeautifulSoup, ResultSet
import os
import re


class JobScrapper:
    BASE_DIRECTORY = 'chat_export'
    
    def __init__(self):
        self.chat_export_files = []

    def retrieve_chat_export_files(self) -> None: 
        pattern = re.compile(r'^messages\d*\.html$')

        matching_files = [f for f in os.listdir(self.BASE_DIRECTORY) if pattern.match(f)]
        matching_files.sort()

        self.chat_export_files = matching_files

    def read_file(self, file_path: str) -> str:
        file_location = os.path.join(self.BASE_DIRECTORY, file_path)
        with open(file_location, 'r') as file:
            data = file.read() 
        return data

    def extract_job_posts_data(self, file_data: str) -> ResultSet:
        soup = BeautifulSoup(file_data, 'html.parser')
        messages = soup.find_all(class_='text') return messages

    def extract_job_post_sender(self, job_post_text: BeautifulSoup) -> Optional[str]:
        all_links = job_post_text.find_all('a')

        for link in all_links:
            href = link.get('href')
            if href and href.startswith('https://t.me'):
                return link.text 
        
        return None 

    def extract_job_post_contact_email(self, job_post_text: BeautifulSoup) -> List[str]:
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        job_post_text_str = job_post_text.get_text()
        return re.findall(email_pattern, job_post_text_str)

    def extract_job_post_contact_phone(self, job_post_text: BeautifulSoup) -> List[str]:
        links = job_post_text.find_all('a', href=True)
        
        phone_numbers = [
            link['href'] for link in links if link['href'].startswith('tel:')
        ]
        
        return phone_numbers

    
    def extract_salary_range(self, job_post_text: BeautifulSoup) -> Optional[str]:
        salary_pattern = r'\$\s*[0-9\.,]+[kKmM]?\s*(?:-\s*\$\s*[0-9\.,]+[kKmM]?)?'
        job_post_text_str = job_post_text.get_text()
        match = re.search(salary_pattern, job_post_text_str)
        return match.group(0) if match else None

    def extract_remote_work_policy(self, job_post_text: BeautifulSoup) -> Optional[str]:
        patterns = {
            'remoto': r'\bremoto\b',
            'presencial': r'\bpresencial\b',
            'teletrabajo': r'\bteletrabajo\b',
            'flexible': r'\bflexible\b',
            'híbrido': r'\bhíbrido\b',
            'presencialidad': r'\bpresencialidad\b',
            'virtual': r'\bvirtual\b',
            'trabajo desde casa': r'\btrabajo desde casa\b',
            'trabajo a distancia': r'\btrabajo a distancia\b'
        }

        text = job_post_text.get_text(separator=' ', strip=True)
        
        matches = []
        
        for keyword, pattern in patterns.items():
            if re.search(pattern, text, re.IGNORECASE):
                matches.append(keyword)
        
        if matches:
            summary = ', '.join(matches)
            return summary
        else:
            return None 
    
    def extract_job_type(self, job_post_text: BeautifulSoup) -> Optional[str]:
        patterns = {
            'practica profesional': r'\bpractica profesional\b',
            'practica': r'\bpractica\b',
            'pasantia': r'\bpasantia\b',
            'ingeniero': r'\bingeniero\b',
            'trabajo de titulo': r'\btrabajo de titulo\b',
            'software engineer': r'\bsoftware engineer\b',
            'pasante': r'\bpasante\b'
        }

        text = job_post_text.get_text(separator=' ', strip=True)
        
        matches = []
        
        for keyword, pattern in patterns.items():
            if re.search(pattern, text, re.IGNORECASE):
                matches.append(keyword)
        
        if matches:
            summary = ', '.join(matches)
            return summary
        else:
            return None

    def extract_job_post_links(self, job_post_text: BeautifulSoup) -> Optional[List]:
        links = job_post_text.find_all('a', href=True)
        
        non_filtered_links = [
            link['href'].lower() for link in links
            if len(link['href']) > 0 and not (link['href'].startswith('https://t.me') or link['href'].startswith('mailto:') or link['href'].startswith('tel:'))
        ]
        
        return non_filtered_links

    def extract_job_post_text(self, job_post:BeautifulSoup) -> Optional[str]:
        job_post_copy = BeautifulSoup(str(job_post), 'html.parser')
        for link in job_post_copy.find_all('a', href=True):
            if link['href'].startswith('https://t.me'):
                link.decompose()
    
        return job_post_copy.get_text(separator='\n') or None

    def process_messages(self):
        self.retrieve_chat_export_files() 
        
        for chat_export_file in self.chat_export_files:
            data = self.read_file(chat_export_file)
            
            job_posts = self.extract_job_posts_data(data)           
            for job_post in job_posts:
                if job_post:
                    job_post_sender = self.extract_job_post_sender(job_post)
                    # job_post_image = self.extract_job_post_image(data)
                    job_post_contact_email = self.extract_job_post_contact_email(job_post)
                    job_post_contact_phone_number = self.extract_job_post_contact_phone(job_post)
                    job_post_salary_range = self.extract_salary_range(job_post)
                    job_post_remote_work_policy = self.extract_remote_work_policy(job_post)
                    job_post_employment_type = self.extract_job_type(job_post)
                    job_post_links = self.extract_job_post_links(job_post)
                    job_post_text = self.extract_job_post_text(job_post)

                                        

job_scrapper = JobScrapper()
job_scrapper.process_messages()

