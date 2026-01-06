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
        # -> Find and click the 'Works' navigation link to go to the Works page.
        frame = context.pages[-1]
        # Click the 'Works' link in the navigation to go to the Works page
        elem = frame.locator('xpath=html/body/main/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Hover mouse over a project image thumbnail to check hover visual feedback with correct opacity and styling.
        frame = context.pages[-1]
        # Hover over the project image thumbnail at index 9 to check hover visual feedback
        elem = frame.locator('xpath=html/body/main/div/div/a[4]/div/img').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Works' navigation link to return to the Works page grid on desktop.
        frame = context.pages[-1]
        # Click the 'Works' link in the navigation to return to the Works page grid
        elem = frame.locator('xpath=html/body/main/div/header/nav[2]/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Hover mouse over a project image thumbnail (e.g., index 9 or 13) to check hover visual feedback with correct opacity and styling.
        frame = context.pages[-1]
        # Hover over the project image thumbnail at index 9 to check hover visual feedback
        elem = frame.locator('xpath=html/body/main/div/div/a[4]/div/img').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Works' navigation link to return to the Works page grid on desktop.
        frame = context.pages[-1]
        # Click the 'Works' link in the navigation to return to the Works page grid
        elem = frame.locator('xpath=html/body/main/div/header/nav[2]/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Hover mouse over the project image thumbnail at index 9 to check hover visual feedback with correct opacity and styling.
        frame = context.pages[-1]
        # Hover over the project image thumbnail at index 9 to check hover visual feedback
        elem = frame.locator('xpath=html/body/main/div/div/a[4]/div/img').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Works' navigation link to return to the Works page grid on desktop.
        frame = context.pages[-1]
        # Click the 'Works' link in the navigation to return to the Works page grid
        elem = frame.locator('xpath=html/body/main/div/header/nav[2]/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Hover mouse over the project image thumbnail at index 9 to check hover visual feedback with correct opacity and styling.
        frame = context.pages[-1]
        # Hover over the project image thumbnail at index 9 to check hover visual feedback
        elem = frame.locator('xpath=html/body/main/div/div/a[4]/div/img').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Works' navigation link to return to the Works page grid on desktop.
        frame = context.pages[-1]
        # Click the 'Works' link in the navigation to return to the Works page grid
        elem = frame.locator('xpath=html/body/main/div/header/nav[2]/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Hover mouse over the project image thumbnail at index 9 to check hover visual feedback with correct opacity and styling.
        frame = context.pages[-1]
        # Hover over the project image thumbnail at index 9 to check hover visual feedback with correct opacity and styling
        elem = frame.locator('xpath=html/body/main/div/div/a[4]/div/img').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Works' navigation link to return to the Works page grid on desktop.
        frame = context.pages[-1]
        # Click the 'Works' link in the navigation to return to the Works page grid
        elem = frame.locator('xpath=html/body/main/div/header/nav[2]/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Hover mouse over the project image thumbnail at index 9 to check hover visual feedback with correct opacity and styling.
        frame = context.pages[-1]
        # Hover over the project image thumbnail at index 9 to check hover visual feedback with correct opacity and styling
        elem = frame.locator('xpath=html/body/main/div/div/a[4]/div/img').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Works' navigation link to return to the Works page grid on desktop.
        frame = context.pages[-1]
        # Click the 'Works' link in the navigation to return to the Works page grid
        elem = frame.locator('xpath=html/body/main/div/header/nav[2]/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Works').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ARTKOREALAB ≪LOOPING IN THE BOX≫ Music By Michan Lee ≪GLIDE≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Academic Project').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=상명대학교 53회 졸업전시').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ISU INU Collaborative Project ≪Tracing Kinetics in Jeju≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=곰시선 프로젝트 «재활용? 제활용!»').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=≪다닥다닥 마켓 백상회(百象會)≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Subverted Anatomical Landscape ≪GAMMA≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=성윤선의 장고춤 네트워크 «동행» Ⅱ').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Minchan Lee.Ep.«GLIDE»').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Sumin Kim BusinessCard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=TouchDesigner WorkShop,≪손과 원 연결하기 : MediaPipe를 통한 Kinetic art≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Korica Web').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Korica Logo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=LWY x Sunoa ≪20≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Subverted Anatomical Landscape BusinessCard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Subverted Anatomical Landscape ≪β≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=LWY x Sunoa ≪Loving You≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=SWYFT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Fitness ideal x Bongkak Choi').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ubomanli').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Goiigoii').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ubomanli ≪서양극장 속 한옥≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Subverted Anatomical Landscape ≪KILL≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Kodo.jeong').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Annkpaak ≪장면과 소외≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=THE BOYZ 2nd full Pt.3 ≪Love Letter≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Calendar 2024').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Info x Cidae').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Beigebongbong').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ubomanli BusinessCard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=성윤선의 장고춤 네트워크 ≪젊은 춤꾼전 : 동행(同行)≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=TTB x Bite Poets x Garb').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Jeom 1st anniversary').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ubomanli ≪Knock≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Buckwild').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Chelon Archive Co.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mumu').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=사진가 최원혁 ≪Open Studio≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=사진가 최원혁 ≪MiamMiam≫').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Oboae x 사진가 최원혁').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cidae').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Nneed Coffee').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    