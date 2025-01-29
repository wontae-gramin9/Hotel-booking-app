import os
import requests


def set_output(file_path, key, value):
  with open(file_path, 'a') as file:
    print(f'{key}={value}', file=file)


def ping_url(website_url, delay, max_trials):
  trials = 0

  while trials < max_trials:
    try:
      response = requests.get(website_url)
      if response.status_code == 200:
        print(f"Website {website_url} is reachable.")
        return True
    except requests.ConnectionError:
      print(f"Website {website_url} is unreachable. Retrying in {delay} seconds...")
      time.sleep(delay)
      trials += 1
    except requests.exceptions.MissingSchema:
      print(f"Invalid URL format: {website_url}. Make sure the URL has a valid schema")
      return False
  
    return False


def run():
  # Fetch the inputs
  website_url = os.getenv('INPUT_URL')
  delay = int(os.getenv('INPUT_DELAY'))
  max_trials = int(os.getenv('INPUT_MAX_TRIALS'))
  website_reachable = ping_url(website_url, delay, max_trials)


  set_output(os.getenv('GITHUB_OUTPUT'), 'url-reachable', website_reachable)
  if not website_reachable:
    raise Exception(f"Website: {website_url} is malformed or unreachable.")

  print(f"Website {website_url} is reachable.")

if __name__ == "__main__":
  run()
  