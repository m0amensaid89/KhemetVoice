from playwright.sync_api import sync_playwright
import time
import re

def verify_autoplay_fix():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the local server
        page.goto('http://localhost:3000')

        # Wait for hydration and carousel to load
        page.wait_for_timeout(3000)

        # 1. Take a screenshot of the initial state (should say UNMUTE (AUTO PLAY OFF))
        page.screenshot(path='initial_state_fixed.png')
        print("Initial state screenshot captured: initial_state_fixed.png")

        # Find the Mute/Unmute button
        button = page.get_by_role("button", name=re.compile('UNMUTE', re.IGNORECASE))

        if button.count() > 0:
            print("Found Unmute button!")
            button.click()
            print("Clicked Unmute.")

            # Wait a moment for state change
            page.wait_for_timeout(2000)

            # 2. Take a screenshot of the unmuted state (should say MUTE (AUTO PLAY ON))
            page.screenshot(path='unmuted_state_fixed.png')
            print("Unmuted state screenshot captured: unmuted_state_fixed.png")
        else:
            print("Could not find the mute/unmute button.")

        browser.close()

if __name__ == "__main__":
    verify_autoplay_fix()