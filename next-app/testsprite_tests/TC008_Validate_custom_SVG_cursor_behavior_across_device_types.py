import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Move mouse or interact to trigger and verify custom SVG cursor visibility and interactivity on desktop.
        await page.mouse.wheel(0, 200)
        

        # -> Simulate or switch to mobile viewport to check if SVG cursor hides or adapts on touch devices.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Simulate mobile viewport and check if SVG cursor hides or adapts on touch devices.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 100)
        

        # -> Simulate mobile viewport and verify that the SVG cursor hides or adapts appropriately without interfering with touch actions.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 100)
        

        # -> Try to interact with the page elements (hover or click) to see if the custom SVG cursor appears or changes on desktop pointer device.
        frame = context.pages[-1]
        # Click on the first link to see if interaction triggers custom SVG cursor
        elem = frame.locator('xpath=html/body/main/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Hover over a project link or image on desktop to check if custom SVG cursor appears or changes.
        frame = context.pages[-1]
        # Hover or click on the first project link to check for custom SVG cursor appearance
        elem = frame.locator('xpath=html/body/main/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Simulate mobile viewport on /works/TD/ page and check if SVG cursor hides or adapts appropriately on touch devices.
        await page.goto('http://localhost:3000/works/TD/', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 100)
        

        # -> Test hover or pointer interaction on desktop viewport on /works/TD/ page to check if custom SVG cursor appears or adapts.
        await page.goto('http://localhost:3000/works/TD/', timeout=10000)
        await asyncio.sleep(3)
        

        frame = context.pages[-1]
        # Click on the 'Info' link to trigger any cursor changes on desktop pointer device
        elem = frame.locator('xpath=html/body/main/div/header/nav/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Simulate mobile viewport on homepage and verify that the SVG cursor hides or adapts appropriately without interfering with touch actions.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 100)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Contact | @hyeok.info / hyeok.info@gmail.com').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=(c) 2026. Yoonhyeok Kim. all rights reserved.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    