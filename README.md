# Ethiguard Browser Extension

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Ethiguard is an innovative browser extension designed to enhance online privacy and promote ethical web practices by detecting tracking pixels and dark patterns. Tracking pixels are tiny, often invisible images used to monitor user activity, while dark patterns are deceptive design techniques intended to manipulate user behavior. Ethiguard helps users identify and avoid these intrusive elements, providing a safer and more transparent browsing experience.

## Features
### Tracking Pixel Detection:
- Monitors network requests to identify tracking pixels based on image size (e.g., 1x1 pixel).
- Scans web pages for suspicious `img` tags and alerts the user.

### Dark Pattern Detection:
- Analyzes forms and interactive elements for pre-checked checkboxes, hidden terms, and misleading buttons.
- Identifies CSS and JavaScript patterns that manipulate user choices.

### User Interface:
- Simple, intuitive interface for viewing detected tracking pixels and dark patterns.
- Options for user feedback and customization.

## Installation
1. Clone this repository or download the ZIP file.
   ```bash
   git clone https://github.com/M-Aadhi/ethiguard.git

2. **Open your browser and navigate to the extensions page:**
   - For Chrome: [chrome://extensions/](chrome://extensions/)
   - For Firefox: [about:addons](about:addons)
3. **Enable "Developer mode" or "Debug mode".**
4. **Click "Load unpacked" or "Load Temporary Add-on" and select the cloned/downloaded directory.**

### Usage
1. Once installed, the Ethiguard icon will appear in your browser toolbar.
2. Click the icon to open the Ethiguard popup.
3. Browse the web as usual. Ethiguard will automatically scan pages for tracking pixels and dark patterns.
4. View detected items and take action as needed through the popup interface.

### Contributing
We welcome contributions to Ethiguard! To contribute:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

Please make sure to update tests as appropriate.

### License
Ethiguard is licensed under the MIT License. See the LICENSE file for more information.
