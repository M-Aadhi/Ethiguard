let switchValue;
let verifiedElements = [];
import json from './common.json';

function updateBadge(newValue) {
    console.log("Sending message from content script to background script");
    chrome.runtime.sendMessage({
        message: "update__badge",
        payload: {
            name: "newValue",
            value: newValue,
        },
    });
}

function updateElementList(numElements, elements) {
    if (switchValue) {
        console.log("Sending message from content script to background script");
        chrome.runtime.sendMessage({
            message: "update",
            payload: {
                name: "numDarkPatternIdentified",
                value: numElements,
            },
        });

        chrome.runtime.sendMessage({
            message: "update",
            payload: {
                name: "darkPatternIdentified",
                value: elements,
            },
        });
        updateBadge(numElements);
    } else {
        updateBadge("X");
    }
}

function checkImageSizes() {
    verifiedElements = [];
    // Desired maximum dimensions
    const maxWidth = 1;
    const maxHeight = 1;

    // Select all elements to be checked within the page
    const images = document.querySelectorAll("img, svg, img[src$='.png'], img[src$='.gif']");

    for (const imgOrSvg of images) {
        let width, height;
        let value = "";

        if (imgOrSvg.tagName.toLowerCase() === "img") {
            width = imgOrSvg.naturalWidth;
            height = imgOrSvg.naturalHeight;
            value = "img";

            const parentLink = imgOrSvg.closest("a");
            if (parentLink && parentLink.href) {
                const linkDimensions = getLinkDimensions(parentLink);
                if (linkDimensions.width <= maxWidth || linkDimensions.height <= maxHeight) {
                    verifiedElements.push(imgOrSvg);
                }
            }
        } else if (imgOrSvg.tagName.toLowerCase() === "svg") {
            const bbox = imgOrSvg.getBBox();
            width = bbox.width;
            height = bbox.height;
            value = "svg";

            const svgLinks = imgOrSvg.querySelectorAll("a");
            for (const svgLink of svgLinks) {
                if (svgLink.href) {
                    const linkDimensions = getLinkDimensions(svgLink);
                    if (linkDimensions.width <= maxWidth || linkDimensions.height <= maxHeight) {
                        verifiedElements.push(imgOrSvg);
                    }
                    break;
                }
            }
        }
    }
}


// Process the JSON data
const text = document.body.innerText.toLowerCase();
for (const word of json.words) {
    if (text.includes(word)) {
        verifiedElements.push(word);
    }
}

        if (switchValue) {
            updateElementList(verifiedElements.length, verifiedElements);
        } else {
            updateElementList(0, verifiedElements);
        }
    

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "background_ready") {
        chrome.runtime.sendMessage({
            message: "content__retrieve",
            payload: "switchValue",
        });
    }
    if (request.message === "delete_success") {
        // Handle delete success
    } else if (request.message === "update_success") {
        // Handle update success
        console.log("PAYLOAD: " + request.payload);
    }
    if (request.message.includes("retrieve_success")) {
        if (request.message.includes("switchValue")) {
            switchValue = request.payload.value;
            checkImageSizes();
        }
    }
    if (request.message.includes("scrollTo")) {
        // Handle scrollTo message
    }
});

// Inform the background script that the content script is ready to receive messages
chrome.runtime.sendMessage({
    message: "content_script_ready"
});

// Other functions and code as needed

if (switchValue) {
	verifiedElements.forEach((elem) => {
		// elem.style.border = "5px solid pink";
	});
	updateElementList(verifiedElements.length, verifiedElements);
} else {
	verifiedElements.forEach((elem) => {
		elem.style.border = "none";
	});
	updateElementList(0, verifiedElements);
}
 
