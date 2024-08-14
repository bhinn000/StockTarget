import requests
from bs4 import BeautifulSoup

# Define the headers to mimic a real browser request
headers = {
    'Referer': 'https://www.sharesansar.com/',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

# Fetch the page content
response = requests.get('https://www.sharesansar.com/today-share-price', headers=headers)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table with id 'headFixed'
table = soup.find('table', {'id': 'headFixed'})

if table:
    # Extract table headers
    headers = [header.text.strip() for header in table.find_all('th')]

    # Locate indices for 'Symbol' and 'Close'
    try:
        symbol_index = headers.index('Symbol')
        close_index = headers.index('Close')
    except ValueError as e:
        print(f"Error finding index: {e}")
        symbol_index = close_index = None

    # Extract table rows, skipping the header
    rows = []
    for row in table.find_all('tr')[1:]:  # Skip the header row
        cells = row.find_all('td')
        if len(cells) > max(symbol_index, close_index, 0):  # Ensuring there are enough cells in the row
            symbol = cells[symbol_index].text.strip() if symbol_index is not None else 'N/A'
            close = cells[close_index].text.strip() if close_index is not None else 'N/A'
            rows.append({'symbol': symbol, 'close': close})

    # Send data to the Node.js server
    node_server_url = 'http://localhost:3000/update-stock-prices'
    try:
        response = requests.post(node_server_url, json=rows)
        if response.status_code == 200:
            print("Data successfully sent to Node.js server.")
        else:
            print(f"Failed to send data to Node.js server. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending data to Node.js server: {e}")
else:
    print("Table not found.")











# import requests
# from bs4 import BeautifulSoup

# # Define the headers to mimic a real browser request
# headers = {
#     'Referer': 'https://www.sharesansar.com/',
#     'Upgrade-Insecure-Requests': '1',
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
#     'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
#     'sec-ch-ua-mobile': '?0',
#     'sec-ch-ua-platform': '"Windows"',
# }

# # Fetch the page content
# response = requests.get('https://www.sharesansar.com/today-share-price', headers=headers)

# # Parse the HTML content using BeautifulSoup
# soup = BeautifulSoup(response.content, 'html.parser')

# # Find the table with id 'headFixed'
# table = soup.find('table', {'id': 'headFixed'})

# if table:
#     # Extract table headers
#     headers = [header.text.strip() for header in table.find_all('th')]

#     # Locate indices for 'Symbol' and 'Close'
#     try:
#         symbol_index = headers.index('Symbol')
#         close_index = headers.index('Close')
#     except ValueError as e:
#         print(f"Error finding index: {e}")
#         symbol_index = close_index = None

#     # Extract table rows, skipping the header
#     rows = []
#     for row in table.find_all('tr')[1:]:  # Skip the header row
#         cells = row.find_all('td')
#         if len(cells) > max(symbol_index, close_index, 0):  # Ensuring there are enough cells in the row
#             symbol = cells[symbol_index].text.strip() if symbol_index is not None else 'N/A'
#             close = cells[close_index].text.strip() if close_index is not None else 'N/A'
#             rows.append({'Symbol': symbol, 'Close': close})

#     # Send data to the Node.js server
#     node_server_url = 'http://localhost:3000/update-stock-prices'
#     response = requests.post(node_server_url, json=rows)
#     if response.status_code == 200:
#         print("Data successfully sent to Node.js server.")
#     else:
#         print("Failed to send data to Node.js server.")
# else:
#     print("Table not found.")
