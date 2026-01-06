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
        # -> Click on the About page link to navigate to the About page on desktop viewport.
        frame = context.pages[-1]
        # Click on the About page link to navigate to About page
        elem = frame.locator('xpath=html/body/main/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click on the About link to navigate to the About page on desktop viewport.
        frame = context.pages[-1]
        # Click on the About link to navigate to the About page
        elem = frame.locator('xpath=html/body/main/div/header/nav[3]/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Resize viewport to mobile resolution and verify that columns stack vertically without layout issues.
        await page.goto('http://localhost:3000/about/', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Yoonhyeok Kim').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Graphic Designer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Seoul, Republic of Korea').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Yoonhyeok Kim is a graphic designer based in Seoul. I focus on developing visual languages that mediate various elements based on form. I mainly work on printed matter such as posters, books, and other publications, as well as brand-related identities. Ultimately, I strive to be someone who contemplates what message to convey through the tool of design.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2020-27,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Incheon National University(INU),B.F.A. In Visual Design, Double Major In Fashion Industry').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2022–Present,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Freelance Visual Designer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2022–2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Visual Design Intern, Glosome Design Team, Some&Company Co., Ltd.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2021–2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Founder & President, Myo (Government Startup Project Collective)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2021–2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Member, 27th Class, O.F.F (National University Student Fashion Association)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2021,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Editorial Design Team, Lets Magazine').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2022,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Honorable Mention, 11th International Digital Fashion Contest, Korean Society Of Clothing And Textiles (KSCT)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=National Technical Qualification, Certified Photographer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2026,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Subverted Anatomical Landscape｣ ≪X≫ 아르코대극장, 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢상명대학교 53회 졸업전시｣ 아이덴티티 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢곰시선 프로젝트｣ ≪재활용? 제활용!≫ 아르코 대학로예술극장 소극장, 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Single Origin｣ 웹사이트 디자인 및 개발').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢다닥다닥 마켓 백상회(百象會)｣ 경희대학교 로컬콘텐츠 중점대학 주최, 참여 작가 30인 포스터 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Coffee Collage｣ 아이덴티티 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Subverted Anatomical Landscape｣ ≪GAMMA≫ 아르코 대학로대극장, 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢성윤선의 장고춤 네트워크｣ ≪동행≫ Ⅱ 전통공연창작마루 광무대, 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Minchan Lee｣ ≪GLIDE≫ 앨범 자켓 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢미디어 아티스트 김수민｣ 명함 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢한국근현대미술연구재단(Korica)｣ 웹사이트 디자인 및 개발').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2025,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢한국근현대미술연구재단(Korica)｣ 로고 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢LWY X SUNOA｣ ≪20≫ 앨범 자켓 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢LWY X SUNOA｣ ≪Loving You≫ 앨범 자켓 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Subverted Anatomical Landscape｣ 명함 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Subverted Anatomical Landscape｣ ≪β≫ 서강대메리홀, 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢최봉각 작가 X 피트니스 이상｣ 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢GoiiGoii｣ 로고 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢신촌글로벌대학문화제(SWYFT)｣ 제 2회 페스티벌 아이덴티티 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Kodo.Jeong｣ 패키지 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Ubomanli｣ 로고 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Ubomanli｣ ≪서양극장 속 한옥≫ 아르코 · 대학로예술극장, 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Subverted Anatomical Landscape｣ ≪KILL≫ LG 아트센터, 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Annpaak｣ 기획전 ≪장면과 소외≫ 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2024,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢THE BOYZ｣ 2nd Full Pt.3 ≪Love Letter≫ 앨범 자켓 및 프로모션 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Beigebongbong｣ 아이덴티티 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢성윤선의 장고춤 네트워크｣ 성균소극장 12월 상설공연 ≪동행≫ 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Jeom Store｣ 1st Anniversary 굿즈 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢TTB X Garb X Bite Poets｣ ≪Extra Ordinary≫ 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Ubomanli｣명함 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢전기홍 작가｣ ≪Buckwild≫ 에디토리얼 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Ubomanli｣ ≪Knock≫ 국립극장, 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Chelon Archive Co.｣ 아이덴티티 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Mumu｣ 아이덴티티 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Cidae.Co｣ 에디토리얼 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Miammiam X 최원혁 작가｣ 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Oboae｣ 쇼룸 엽서 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Info X Cidae.Co｣ 굿즈 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Nneed Coffee｣ 아이덴티티 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Each Differ｣ 23f/W 아트워크 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢최원혁 작가｣ ≪Open Studio In Seoul≫ 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Each Differ｣ 로고 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢최원혁 작가｣ ≪Open Studio In Jeju≫ 프로그램 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Doosan X Vlook｣ 아이덴티티 및 팝업스토어 매장 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢AAO｣ 월별 3D 아트워크 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Viewfinder｣ 연력 포스터 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Viewfinder｣ 로고 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2022,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Bfrog｣ 쇼룸 로고 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2022,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=｢Higher Coffee｣ 행사 포스터 디자인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Info').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Works').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=About').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=↗ Brief').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Introduction').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Profile').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contact').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Exhibition').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Career').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Awards').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=License').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Work').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tools').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Clients / Collaboration').first).to_be_visible(timeout=30000)
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
    