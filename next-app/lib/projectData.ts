export interface Project {
  slug: string;
  title: string;
  scope: string;
  category: string;
  completion: string;
  thumbnail: string;
  description: string;
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "LeeSeungYoon",
    title: "Seungyoon Lee 4th Full-length Studio Album ≪0≫",
    scope: "Physical Album Design",
    category: "Commercial",
    completion: "Jun. 2026",
    thumbnail: "Thumbnail.mp4",
    description: "",
    images: ["Thumbnail.mp4", "Main.jpg", "Main2.jpg", "Main3.jpg", "Main4.jpg", "Main5.jpg", "Main6.jpg", "Main7.jpg", "Main8.jpg", "Main9.jpg", "Main10.jpg", "Main11.jpg", "Main12.jpg", "Main13.jpg", "Main14.jpg", "Main15.jpg", "Main16.jpg", "Main17.jpg", "Main18.jpg", "Main19.jpg", "Main20.jpg"]
  },
  {
    slug: "InuScore",
    title: "Divergent Consequences With Single Image",
    scope: "Poster Design, Web Design and Development",
    category: "Non-Commercial",
    completion: "Apr. 2026",
    thumbnail: "MainPoster.jpg",
    description: "This project explores the epistemic asymmetry that arises when two observers encounter the same visual object under different conditions of knowledge and biological capacity. Taking four types of visual media—the Ishihara color-blindness test chart, a musical score, Hans Holbein's painting, and an MRI scan—as its core subjects, the work visualizes the divergent cognitive realities produced for observer A (limited to surface-level perception) and observer B (capable of full decoding).\n\nThe project was realized as a web-based interactive archiving poster, designed around a three-column grid: the left column represents A's restricted visual perspective, the right column represents B's decoded reality, and the center column overlays both observers' eye-tracking trajectories onto the original base canvas in contrasting colors. This structure objectively documents how the absence of specific knowledge or physical conditions generates radically polarized informational outcomes from a single image.\n\nThe companion web application component renders a real-time Color Vision Deficiency (CVD) simulator, allowing users to directly experience the visual world of an observer with color blindness across multiple deficiency types. By enabling the user to toggle between chromatic perspectives, the tool makes the epistemic gap legible as a lived experience rather than an abstract claim.\n\nTheoretical grounding was drawn from Miranda Fricker's Epistemic Injustice (2007), applied to the context of visual media, alongside empirical studies on quality of life impacts of color vision deficiency and philosophical literature on perceptual structure and epistemic significance.",
    images: ["MainPoster.jpg", "AppPoster.jpg", "sns_02.jpg", "sns_03.jpg", "sns_04.jpg", "sns_05.jpg", "colour_changes.mp4"]
  },
  {
    slug: "Notefolio",
    title: "Notefolio WorkShop 6-week course ≪Workshop for the Beginning≫",
    scope: "Workshop",
    category: "Commercial",
    completion: "Jul. 2026",
    thumbnail: "Thumbnail.jpg",
    description: "",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"]
  },
  {
    slug: "Collage",
    title: "Coffee Collage",
    scope: "Identity Design",
    category: "Commercial",
    completion: "Apr. 2026",
    thumbnail: "Thumbnail.mp4",
    description: "",
    images: ["Thumbnail.mp4", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "38.jpg", "39.jpg"]
  },
  {
    slug: "Sketched",
    title: "SKETCHED.Space Web",
    scope: "Web Design Development",
    category: "Commercial",
    completion: "Mar. 2026",
    thumbnail: "Thumbnail.mp4",
    description: "The development of the sketched.space website was carried out by rendering the concept of 'Point of View (POV)' as a visualized mind-map structure. The overall architecture adopted a full-screen layout based on Canvas. A Circle Packing algorithm was applied to arrange multiple nodes, implementing the narrative structure of the website that transitions from the point of raising a problem to the point of deriving a solution. During this process, coordinate operations for multiple objects to render the canvas in invisible areas and state management functions for keyword nodes within the Viewport were integrated. \nIn terms of design and functionality, the focus was on implementing interaction through scroll control. To achieve this, a method of blocking the user's Wheel Event and executing Programmatic Scroll was introduced. For the Landing page, a Gravity Scroll Inducement mechanism was applied, triggering an event where the keyword cluster in the center of the screen moves downwards to force viewport movement. In particular, since the particle animation on the landing page operates based on scrolling, rendering optimization was prioritized to minimize experience variance based on user environments and maintain a consistent, smooth frame rate. \nSequence Line Animation was applied to the Service and Works pages to control page transitions and information exposure. The progression rate of the animation extending the baseline downwards was synchronized with the scroll value, and it was designed so that the exposure of subsequent sections is determined by the line's extension state. The Service page applied a visual effect where content seems to rise upwards upon scrolling, preventing monotony during the scrolling process. The Works page was implemented so that content automatically moves downwards without user scroll input, and upon a mouse Hover event, screen movement stops and detailed descriptions are exposed. Technically, this function works by detecting viewport entry and controlling the screen by coordinate units set in the script through animation library calculations. \nIn terms of data management, content update architecture was established by integrating Sanity CMS. During this process, considering that the client is also a user operating the administrator page, the Schema was structured to allow intuitive data input and modification, heavily prioritizing administrator UX.",
    images: ["01.mp4", "02.mp4", "03.mp4", "04.mp4", "05.mp4", "06.mp4"]
  },
  {
    slug: "X",
    title: "Subverted Anatomical Landscape ≪X≫",
    scope: "Identity Design",
    category: "Commercial",
    completion: "Mar. 2026",
    thumbnail: "Thumbnail.mp4",
    description: "This project is based on the performance Subverted Anatomical Landscape ≪X≫ and aims to build a visual identity that explores the relationship between humans and machines. Since the essential theme of the work—the conflict between <finite vitality> and <infinite machinic nature>—needed to be visualized, the process was guided by the premise of <presenting the physical collision and combination of differing materialities as tangible evidence> rather than relying on abstract narrative. While establishing the concept, taking the massive 'engine' and 'womb' on stage as motifs was deemed the appropriate direction. Based on this, a 'Metallic Totem' form was constructed, where mechanical parts and numerous human heads coagulate vertically. In particular, this colossal structure was designed with a silhouette that crosses and condenses in the shape of an 'X', intuitively connecting with the performance's title, ≪X≫. Rather than listing complex images, the intent was to symbolize the human crowd trapped in mechanical repetitive motion, as well as the new hybrid humanity cultivated within the mother matrix of the machine, all condensed into a single massive lump. Ultimately, by precisely depicting disparate materials such as artificial metal, organic living flesh, and viscous liquids, the goal was to deliver an immediate tactile stimulation that transcends visual perception. Specifically, by adding the movement of viscous fluid flowing down a rough, dark metallic surface, a process of <dynamic fusion> was expressed rather than <static combination>. Using this <tension> generated when two distinct beings mechanically merge, an attempt was made to unify and express all visual artifacts.",
    images: ["00.mp4", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.mp4", "10.jpg", "11.jpg", "12.mp4", "13.mp4", "14.mp4", "15.mp4"]
  },
  {
    slug: "TD",
    title: "ARTKOREALAB ≪LOOPING IN THE BOX≫ Music By Michan Lee ≪GLIDE≫",
    scope: "Interactive Design",
    category: "Non-Commercial",
    completion: "Jan. 2026",
    thumbnail: "Thumbnail.mp4",
    description: "This project is an Audio Reactive piece that separates the six stem files constituting the music (Main Riff, EGTR, Bass, Pad, Drums, Strings) and converts each audio signal into visual variables. Avoiding the simple substitution of volume changes for size changes, it was designed so that the signal of each instrument acts as a physical computational value that moves or mixes the pixel coordinates on the screen. Through this, a system was established where auditory data directly controls the movement of visual data.\nData processing was executed at the CHOP Operators stage in TouchDesigner. The audio waveform of each stem file is analyzed by frequency band through an Audio Spectrum, then converted into a single numerical value via Analyze (RMS Power) and Filter. Striking sounds like Drums and EGTR instantly reflect numerical fluctuations, acting as triggers that adjust the intensity of screen distortion, while sustaining sounds like Pad and Bass are mapped as base data that continuously shift the entire coordinates of the screen.\nThe core structure of visualization is the 'Feedback Loop' system in the TOP Operator stage. By connecting Feedback TOP and Displace TOP in a recursive structure, the current frame's image is accumulated onto the next frame, implementing an effect where pixels leave motion trajectories. The audio data extracted from CHOP is connected to the Displace Weight parameter, controlling the distance pixels are pushed based on volume in real-time to generate fluid flow.\nFor texture, Slope TOP was used to express shading. Brightness variation amounts of the flowing image evaluate shading information, which is blended with the original image via Hard Light mode to add topographical curves and elevation to flat graphics. To prevent color interference during this shading calculation, the image is converted to black and white so that only shape and contrast are evaluated. Finally, colors were mapped using the color data of the artwork ≪Glide≫ via Lookup TOP, substituting designated color ramps according to the brightness levels of the simulated black-and-white fluid video. Through this, the color info from the original artwork remains undistorted amidst the complex movements of the feedback loop.",
    images: ["01.mp4", "02.mp4", "03.mp4", "04.mp4", "05.mp4", "06.mp4", "07.mp4", "08.mp4", "09.mp4", "10.mp4"]
  },
  {
    slug: "AcademicMotionGraphic",
    title: "Academic Project",
    scope: "Motion Graphic",
    category: "Non-Commercial",
    completion: "Dec. 2025",
    thumbnail: "Thumbnail.mp4",
    description: "This project is a title sequence interpreting the film <The Substance (2024)>'s trailer, reinterpreting the graphic language of <a planar structure where two bodies bifurcate>. Core movie scenes—administration, door, body, consumption—were simplified into semiotic shapes (point, line, plane) to express self-replication. It was planned centrally around primary color RGB contrasts and thick Gothic typography. Ultimately, the project aimed to extract characteristics from the trailer and translate them into a graphical system, proposing a planar experimental approach.",
    images: ["01.mp4"]
  },
  {
    slug: "AcademicPackage",
    title: "Academic Project",
    scope: "Package Design",
    category: "Non-Commercial",
    completion: "Dec. 2025",
    thumbnail: "Thumbnail.jpg",
    description: "This project is based on the brand <Bareunsaenggak> and aims to plan and produce a sound sex life guide kit for prospective adults entering their 20s. To communicate the topic of <sex> from a healthy and positive perspective, the brand's image of honesty, consideration, and safety was expanded and implemented through packaging design. The kit is structured around the pre, mid, and post stages of sexual activity, encompassing necessary products for each stage: tongue candy (pre), condoms (mid), cleansers (post), and a manual. Each product's packaging retains independent structures and graphics while seamlessly integrating into a unified brand experience. Through this, the design seeks to help users develop proper awareness and responsible attitudes toward sex, presenting packaging design as an <educational medium> that functions far beyond simple wrappings.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg"]
  },
  {
    slug: "Sangmyung",
    title: "Sangmyung University 53rd Graduation Exhibition",
    scope: "Identity Design",
    category: "Commercial",
    completion: "Nov. 2025",
    thumbnail: "Thumbnail.jpg",
    description: "I took charge of the identity design for the 53rd Graduation Exhibition of Sangmyung University's Life Arts Major held in November 2025. The core task was creating a visual interpretation of how two distinct majors, Furniture and Textile, could be presented equally within a single exhibition structure. As the two sub-majors possessed differing production methods and formative aesthetics, the goal was to integrate them into a unified system while clearly conveying their individual expertise and distinctiveness. Accordingly, the overall layout and vertical format were kept identical to visually secure their equal hierarchy. Simultaneously, the main visuals were designed with differing formal languages that reflected each major's materiality, formative rhythm, and patterned characteristics. This aimed to realize a composition where balance and differentiation coexist within one system. The developed identity system was then modularized so it could extend uniformly across various media like exhibition posters and brochures.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"]
  },
  {
    slug: "INUISO",
    title: "ISU INU Collaborative Project ≪Tracing Kinetics in Jeju≫",
    scope: "Pictogram Design",
    category: "Non-Commercial",
    completion: "Nov. 2025",
    thumbnail: "Thumbnail(Test).jpg",
    description: "This project traces a series of physical movements in Jeju through the formal language of pictograms, using ≪Futura≫ geometric structure. By visualizing daily kinetics, it explores how motion can be transformed into a universal visual system.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg"]
  },
  {
    slug: "Recylce",
    title: "Gomsiseon Project ≪Recycle? Jecycle!≫",
    scope: "Identity Design",
    category: "Commercial",
    completion: "Sep. 2025",
    thumbnail: "Thumbnail.jpg",
    description: "",
    images: ["01.jpg", "02.jpg", "03.jpg"]
  },
  {
    slug: "SuwonExhibition",
    title: "≪Dadakdadak Market Baeksanghoe (百象會)≫",
    scope: "Poster Design",
    category: "Commercial",
    completion: "Aug. 2025",
    thumbnail: "Thumbnail.jpg",
    description: "≪Dadakdadak Market Baeksanghoe (百象會)≫ is a collaborative project between universities and local regions, hosted by the Ministry of SMEs and Startups, the Small Enterprise and Market Service, and Kyung Hee University's Local Content Focus College, with cooperation from the Suwon City Foundation, Yeongdong Market Merchants Association, and Nammun Fashion 1st Street Merchants Association. At the request of Project Director Studio NA1 and BOBU OFFICE, I was selected as one of 30 domestic and international designers/artists to participate in the exhibition. \nThe poster design theme for the exhibition was <Selling What Doesn't Exist>. The concept was to express something imaginary that wouldn't likely be sold at Nammun Market, specifically expressing an object that does not exist and would not be sold upon the real location of a traditional market.\nBased on the slogan, I first reflected on the past and present of Suwon's Nammun Market. In the process, I learned that the market was formed around <Suwon Paldalmun (Gate)>, and I sought to find something that remains unchanging regardless of time passing, from the past to the present, while simultaneously expressing the existing market as stated in the slogan. Ultimately, I defined that object as <Paldalmun>, because I believed that <Paldalmun> has formed the core of the market since its initial formation until now. Interpreting <What isn't sold = The time of Nammun Market>, I intended to express the <symbols and immutable values of Nammun Market> through <Paldalmun>, which perfectly represents the market itself.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.mp4"]
  },
  {
    slug: "Gamma",
    title: "Subverted Anatomical Landscape ≪GAMMA≫",
    scope: "Identity Design",
    category: "Commercial",
    completion: "Jul. 2025",
    thumbnail: "Thumbnail.mp4",
    description: "Following ≪β≫ in November 2024, this performance—the group's third production—was titled ≪GAMMA≫, encompassing two works of equal hierarchy within it. Because the shared concept between the two included works was <human desire and suffering>, the work proceeded under the premise that <the overall visual output should give off an eerie yet subtle impression>.\nWhile establishing the concept, I considered it an appropriate direction to induce <subtle discomfort> in potential audiences, and judged that developing an intuitive image was necessary for this. If a complex image is used, the thought <what is this?> might occur before feeling discomfort. Consequently, I intended to create an image that immediately brings <blood> to mind upon viewing, while directing the endpoint of that gaze toward the outside of the poster. Specifically, by granting <movement = directionality>, I expressed <dynamic blood> rather than simply <static blood>, hoping that viewers could imagine the unseen starting point at the upper left based on the flowing downward movement.\nBased on this <flowing movement>, I attempted to unify and express all visual materials.",
    images: ["Thumbnail.mp4", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.mp4", "19.mp4", "20.mp4", "21.jpg", "22.jpg", "23.jpg", "24.jpg"]
  },
  {
    slug: "Seong2025",
    title: "Seong Yoon-seon's Janggu Dance Network ≪Companion≫ Ⅱ",
    scope: "Identity Design",
    category: "Commercial",
    completion: "Jun. 2025",
    thumbnail: "Thumbnail.mp4",
    description: "Following ≪Companion≫ in November 2023, I was in charge of designing the second ≪Companion≫ project in June 2025.\nThis performance was based on the premise of conveying the message, <Even if alone, we are moving forward together>. Since the structure presented seven pieces within a single performance, I had to deliver the message that the dancers of the seven pieces were moving forward together within a limited space. Also, as the title suggests, I had to consider that the atmosphere of the performance was warm and familial.\nTo visually express <alone yet together>, I needed to express both <alone = separation> and <together = fusion>. For this, understanding the true meaning of <alone>, capturing the main characteristics of the 7 pieces, was necessary. Therefore, with permission, I conducted a photo shoot for each piece during the first demonstration. Through preliminary research and demonstrations, I received the impression that the components taken in the pieces (costumes, instruments, main movements) were different. Utilizing this, I tried to express <alone = separation> by emphasizing the differences between the main images representing each piece.\nAs a method to express <together = fusion>, I adopted a method of sharing the same baseline against a horizontal line. Considering the meaning of <Companion (Donghaeng)>, it can be interpreted as <walking together> or <moving forward together>. When people walk a path together, the line their feet touch becomes identical, so I judged that the message of <together> would be clearly conveyed if the bottom edges of the 7 pieces touched the same line. However, if constructed this way, due to the size of the page, the main scenes of each piece would inevitably have to take either a horizontal (ㅡ) or vertical (ㅣ) form. In the case of horizontal, since seven pieces have to fit horizontally, the size of the main scene is forced to become smaller. In a vertical format, the size of the scenes can be maintained, but there's an issue where the main scenes of the pieces clump in one place, failing to maintain their shape. More specifically, the horizontal format gives the impression of emphasizing <alone> rather than <together> when listed, due to the number of pieces. The vertical format has overlapping surfaces as a drawback, but simultaneously intuitively delivers the message of <together>. Thus, I chose the vertical format, thinking I only needed to solve the problem of shapes not being maintained due to overlapping surfaces.\nI thought the issue of shape maintenance could be easily solved by emphasizing the individuality of the main images of each piece, which were structured centrally around their differences. Since the main scenes were selected, the shapes were already different, and I thought I just needed to pinpoint the differences with something other than shape. As a solution, I tried to pinpoint differences through the most intuitive color assignment. If the shapes and colors of each piece are different, one can simply think that different pieces are gathered together.\nThrough various contemplations and decisions, the problems I had thought of at the beginning of the work were solved, but there was one last problem remaining. Ultimately, if images of different colors are overlapped in one place, the overlapping center surface darkens during the printing process. Having chosen the vertical format, I couldn't completely solve this problem. Therefore, later on, I sub-divided the colors assigned to the main images of each piece into three stages (dark yellow, medium yellow, light yellow), adjusted the color values, and controlled the sequence of those values, striving to minimize the side effects of the overlapping surfaces as much as possible.",
    images: ["01.mp4", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg"]
  },
  {
    slug: "Glide",
    title: "Minchan Lee.Ep.≪GLIDE≫",
    scope: "Album Jacket Design",
    category: "Commercial",
    completion: "Jun. 2025",
    thumbnail: "Thumbnail.jpg",
    description: "In the project visualization stage, the work proceeded by establishing four keywords: <Expression of Flow>, <Clear Directionality>, <Dark-toned Colors>, and <Complex state of gliding>.\nLooking closely, the four keywords can be re-categorized into form and color. For the form, I thought an image should express flow internally, and there must be an ultimate direction that flow tries to communicate. Thinking about the state of <gliding>, it has the characteristic of <having direction and movement, but no active motion>. Therefore, I tried to express the complex characteristics that the final directional state possesses—that is, the simultaneous dynamic and static state—through the thickness of each form.\nRegarding color, the form was set conservatively while flow was intended to be expressed through color. In the early and middle parts, I tried to express a wandering, resisting image using narrow and contrasting colors. Toward the latter half, I tried to express a stable sense of form using wide, similar-toned bright colors.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.mp4", "06.mp4"]
  },
  {
    slug: "Sumin",
    title: "Sumin Kim BusinessCard",
    scope: "Paper Design",
    category: "Commercial",
    completion: "Apr. 2025",
    thumbnail: "Thumbnail.jpg",
    description: "I designed a business card for Sumin, who teaches me TouchDesigner. Kept concise, using an inkless printing method.",
    images: ["01.jpg"]
  },
  {
    slug: "TDWorkShop",
    title: "TouchDesigner WorkShop, ≪Connecting Hand to Circle: Kinetic art via MediaPipe≫",
    scope: "Interactive Design",
    category: "Non-Commercial",
    completion: "Jan. 2025",
    thumbnail: "Thumbnail.mp4",
    description: "The workshop theme is ≪Connecting Hand to Circle: Kinetic art via MediaPipe≫. The example work proceeds like this: 1. Set areas on the screen. 2. Create 4 circles outputted when the hand reaches each area, such as zone 1, zone 2, zone 3, zone 4. 3. Establish a structure so the circle outputted per zone tracks the hand within that zone. 4. Through steps 1-3, movement of the circles can be controlled with the left hand (h1). Afterward, a structure is set where if the right hand (h2) is raised and rotated together, it modifies the color of the circles.",
    images: ["01.mp4", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"]
  },
  {
    slug: "KoricaWeb",
    title: "Korica Web",
    scope: "Web Design Development",
    category: "Commercial",
    completion: "Jan. 2025",
    thumbnail: "custom", // Placeholder, logic handles render
    description: "I was in charge of the web design and development for the Korea Research Institute of Contemporary Art (KoRICA). Through data analysis, I chose <Connection> and <Maximization> as visual languages representing KoRICA, and proceeded with design and development based on the concept of <Connection and Maximization: Considering Color Combinations>.\nSpecifically, I emphasized differences between pages and materials through color and lines. On a dynamically functioning web, I thought users could visually recognize selected pages and materials via color combinations. Furthermore, rather than localized connections using only points or lines, I judged that the image of <Meeting> and <Intersection> arising from overlapping planes with planes, and planes with lines, better aligned with KoRICA's ethos of connecting our culture and art to the world.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.mp4", "10.jpg", "11.jpg"]
  },
  {
    slug: "KoricaLogo",
    title: "Korica Logo",
    scope: "Logo Design",
    category: "Commercial",
    completion: "Jan. 2025",
    thumbnail: "Thumbnail.jpg",
    description: "The Korea Research Institute of Contemporary Art (KoRICA) is an art research foundation established by Park Myung-ja, Chairperson of Hyundai Hwarang (currently Gallery Hyundai). It conducts various projects to research the art historical value of Korean modern and contemporary art and connect the context of Korean art with global art. It supports the research activities of domestic and international researchers, sponsors exhibitions and professional book publications to introduce Korean art to the global stage, operates museums on consignment, and pursues communication with global art by deploying various projects to preserve and maximize the value of Korean art.\nDuring the visualization process for the two word-type logo designs for KoRICA, I established two working standards: 1. It shouldn't be too static. 2. There should be a visual focal point among the letters. I thought Serif (Myeongjo) fonts could express a serious and trustworthy atmosphere, but they carried a heavy and somewhat stale vibe. While there was no disagreement that the foundation should have a serious and trustworthy visual language as its brand characteristic, I believed the most ideal brand form would express the concepts of connection and maximization dynamically while keeping the internally published content itself serious and reliable. \nTherefore, I set a Sans-serif (Gothic) font as the default, and among them, I ultimately adopted <Futura>, which possesses more vitality and rhythm than other Sans-serif fonts. Also, I deemed it appropriate for the concept because it featured points among its letters like <A, t, u> that could be utilized as focal points.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"]
  },
  {
    slug: "20",
    title: "LWY x Sunoa ≪20≫",
    scope: "Album jacket design",
    category: "Commercial",
    completion: "Dec. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "I established the project's visual concept from the title intended for the album, [Freedom and Pressure]. Specifically, I went through a stage of defining the direction with the phrase [Freedom and Pressure: Expanding Forms and Confining Frames]. A process of finding an appropriate form to express [Expanding Forms] preceded, and as a result, I adopted an approach using [Firecrackers]. I believed it functioned as a metaphor because it has a form that diffuses in all directions as it heads outward from the center. \nSubsequently, to express [Confining Frames], the main image [Firecracker] was portrayed in a format that breaks out of the standard 3000*3000px dimensions. To achieve this, I extracted the [Firecracker] from the original image at roughly 1/300 of its size and structured it to increase contrast with the background.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.mp4"]
  },
  {
    slug: "SALNamecard",
    title: "Subverted Anatomical Landscape BusinessCard",
    scope: "Paper design",
    category: "Commercial",
    completion: "Nov. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "Both the front and back were processed with inkless foil stamping (black foil). For the back, to correct the visual spacing between the name and title, I adopted an approach of partially adjusting the scale of the first letter of the name.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg"]
  },
  {
    slug: "beta",
    title: "Subverted Anatomical Landscape ≪β≫",
    scope: "Identity design",
    category: "Commercial",
    completion: "Nov. 2024",
    thumbnail: "Thumbnail.mp4",
    description: "During the stage of defining the project's visual concept, I went through a process of defining directionality with the phrase [Visualization of Power: Considering the program title and the two works it embraces]. The core premise was that the program title, ≪β≫, needed to be emphasized more than the two works belonging to it. However, it had to be taken into account that ≪β≫ functions as a program title rather than a standalone piece, and that two works of equal hierarchy function within it. \nUltimately, I defined ≪β≫ as an [intangible fence] in the final outcome, intentionally trying to visually express power through the difference in ratio it occupies within the limited space. Finally, during the physical realization process, I tried to express the [intangible fence] by using low-opacity tracing paper.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.mp4", "16.mp4", "17.jpg", "18.jpg", "19.mp4", "20.jpg", "21.jpg", "22.jpg", "23.jpg"]
  },
  {
    slug: "lovingYou",
    title: "LWY x Sunoa ≪Loving You≫",
    scope: "Album jacket design",
    category: "Commercial",
    completion: "Oct. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "I established the project's visual concept from the fact that the [love] and [farewell] defined in the album are not extreme forms of severance but have ambiguous boundaries. Specifically, defining the direction with the phrase [Boundary between abstract themes (love and farewell): Considering afterimage and contrast], we proceeded with the shoot so that the photo itself has strong contrast, but its boundaries gradually disperse, and adopted those images.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.mp4"]
  },
  {
    slug: "swyft",
    title: "SWYFT",
    scope: "Identity design",
    category: "Commercial",
    completion: "Sep. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "The main tasks of the project included developing illustrations representing the five keywords chosen by the organizers—Music, Media, Food, Education, and Booths—along with a symbol logo that could be used for future festivals. According to the plan, I first set the direction for visualization: 1. Develop a main composition integrating the individual illustrations. 2. Express the festival's dynamism through design.\nAfter setting the direction, I developed the symbol logo first through meetings with the festival planning committee. Next, we proceeded with a photoshoot at the studio, setting up a model and mediums to symbolize each keyword. Based on the shot images, individual illustrations and the main composition were developed. Based on these developed elements, they were utilized across a total of 7 outcomes: the main poster, banner, street sky banner, booth name bands, brochures, nametags, and business cards.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"]
  },
  {
    slug: "fitnessIdeal",
    title: "Fitness ideal x Bongkak Choi",
    scope: "Identity design",
    category: "Commercial",
    completion: "Aug. 2024",
    thumbnail: "Thumbnail.mp4",
    description: "During the stage of defining the project's visual concept, I went through a process of defining directionality with the phrase [An Invitation-like letter: Considering the power of photography on a limited page]. Because the main medium of the exhibition was photography, the photo had to be emphasized the most even on the main promotional poster, alongside the challenge that the exhibition poster must act as an invitation like a letter.\nTo solve the tasks, I first deliberated on solutions for texts containing exhibition information, layouts, etc. With the common vertical formats (A2, A3), there were two approaches: 1. Reducing the size of the photo within the page to express it so that other info doesn't intrude on the photo. 2. Using the photo at the same size as the page, expressing the power of the photo through its scale.\nIn the case of [1], it had the advantage of granting pure photographic territory as other info doesn't intrude, but because it reduces the size itself, there was a question of whether it possessed an intuitively felt power within the page. In the case of [2], by using the photo at page size, the problem of [1] could be solved. However, as other info was placed over the photo, an issue arose where the poster didn't have smooth layers but rather clearly divided strata (1st floor photo, 2nd floor info), creating a heterogeneous atmosphere. Ultimately, judging that the problem couldn't be solved with a vertical format, I finally adopted using the page itself in a horizontal format. \nSpecifically, assigning half the area to the photo and half to information, I designed an <envelope> style layout placing exhibition info at the bottom on the left, and based on the idea of attaching a stamp when sending a letter, I designed a photo-based [Stamp] in the center. The right side was dedicated entirely to pure photography to intentionally increase visibility.",
    images: ["Thumbnail.mp4", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.JPG", "07.jpg"]
  },
  {
    slug: "ubomanli",
    title: "Ubomanli",
    scope: "Logo design",
    category: "Commercial",
    completion: "Aug. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "I was in charge of designing the word-type logo for Team Ubomanli. I set a baseline character from the base typeface and restructured the horizontal and vertical widths of each letter to match the set baseline. Afterward, I checked the newly structured typographic balance by applying numerical kerning first. Finally, to adjust the visual imbalance caused by margins, I applied a value of 2/3 of the baseline kerning to adjust the visual balance, thereby finishing the work.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"]
  },
  {
    slug: "goii",
    title: "Goiigoii",
    scope: "Logo design",
    category: "Commercial",
    completion: "Jul. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "I took charge of the word-type and symbol logo design for the gift wrap brand Goiigoii. Even with the same wrapping tools and methods, the fact that every wrap is unique depending on the person gifting it became an important concept for this project. \nFor the symbol, although the brand name consists solely of repetitions of three letters [g, o, i], it was constructed so that each letter has a slight variation. Through this, I tried to express the feeling of earnestly making it by hand, folding the paper with bare hands, though a bit crooked and uneven. For the word-type, taking versatility into account from the crooked symbol, I constructed a balanced form.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.mp4", "07.JPG", "08.JPG", "09.JPG", "10.JPG", "11.JPG", "12.JPG", "13.JPG", "14.JPG", "15.JPG"]
  },
  {
    slug: "houseOfKorea",
    title: "Ubomanli ≪Hanok Within a Western Theater≫",
    scope: "Identity design",
    category: "Commercial",
    completion: "Jul. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "As the title ≪Hanok Within a Western Theater≫ suggests, the performance's characteristic was that an act symbolizing a Hanok takes place within the White Cube theater. Thus, the challenge was to develop a medium that functions visually between the contrasting [Western Theater] and [Hanok]. First, as an approach to develop a medium connecting [Western Theater] and [Hanok], I adopted [Harmony in Disharmony: Fusion] as the project's visual concept. After adopting the concept, there was consideration over [what parts of the two subjects to fuse]. Since I had to capture the characteristics of the two subjects within a limited format while simultaneously resolving them in a fused form, I adopted an approach utilizing the [Pillar] and [Eaves] representing the two subjects.\nUpon entering visualization, I proposed a form where the [Eaves] representing [Hanok] are built atop the [Pillar] representing [Western Theater]. The core content of the performance proceeds by symbolizing [Hanok], but since the performance was also scheduled to take place within the ARKO Arts Theater—which possesses Western theatrical architecture—I deemed it appropriate to adopt a new form as the performance's language by assembling the representative images. Ultimately, through the new form fusing [Pillar] and [Eaves], I aimed to evenly bring out the characteristics of both subjects while ensuring there were no significantly disparate points.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.JPG", "09.JPG", "10.JPG", "11.JPG", "12.JPG", "13.JPG", "14.JPG", "15.JPG", "16.JPG", "18.JPG", "19.JPG", "20.JPG", "21.JPG", "22.JPG", "23.JPG", "25.JPG", "26.JPG", "27.JPG", "28.JPG", "29.JPG", "30.JPG", "31.JPG", "32.JPG", "33.JPG", "34.JPG", "35.JPG", "36.JPG"]
  },
  {
    slug: "kill",
    title: "Subverted Anatomical Landscape ≪KILL≫",
    scope: "Identity design",
    category: "Commercial",
    completion: "Jun. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "In the stage of setting the visual concept for the project, the two reference parameters were as follows: 1. From chapter 1 to chapter 5, ≪KILL≫ progresses based on [Death]; how to define this visually. 2. How to visually define the question of imperfect human existence through recurring [Death].\nTo solve these two problems, I proposed the formal language of [Imbalance] as a concept, and based on this, I aimed to convey the message of the work through forms of repeated imbalance. Also, considering that the work progresses in a sequence from chapter 1 to 5, I intended to express an image holding a [Flow] rather than a disconnected image in the final piece.\nProceeding with the visualization, I interpreted that [Death] signified in the work was ['The state of 'None (無)' rather than the state of 'Being (有)']. Thus, I derived the title [Expressing Imbalance through Erasure Method] as an approach to depict [Death]. To effectively express repeated imbalance, I started visualization from the most complete form—a circle. Starting with the question, 'What kind of circle will it be?', I utilized two types of circles constructed of lines and dots, excluding solid circles, for the visualization.\nDuring the process, there was a condition to use a photographer's image and a task to express [Imperfect Human Existence] through it. Having to express imperfect forms based on photos taken of specific body parts, I intentionally combined torso images facing different directions to express an image that is a human body but doesn't exist in reality. Through the process of the line-constructed circle gradually changing into a dot-constructed circle from chapter 1 to 4, I tried to express the [Flow] of the work. Regarding color usage, I expressed backgrounds or circles excluding photographic images strictly in black or white. I intended to express the extreme situation of [Death] through the contrast between the image of 'None (無)' held by white and the image of 'Being (有)' held by black.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "10.mp4", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "38.jpg", "39.jpg", "40.jpg", "41.jpg", "42.jpg", "43.jpg", "44.jpg", "45.jpg", "46.jpg", "47.JPG", "48.JPG", "49.jpg", "50.jpg", "52.jpg", "53.jpg", "54.jpg", "55.jpg", "57.jpg", "58.jpg", "59.jpg", "60.jpg"]
  },
  {
    slug: "kodo",
    title: "Kodo.jeong",
    scope: "Package design",
    category: "Commercial",
    completion: "Jun. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "During the stage of defining the project's visual concept, I went through a process of defining direction with the phrase [Centering on Kodo's interior: Objects and textures within the space]. Given the nature of a to-go cup, visualization began with the finding that the design targets customers doing takeout rather than utilizing the shop's interior. Therefore, there was a challenge that the merits the shop possesses had to be recognizable externally through the to-go cup. \nI felt that the merit of the shop was the blend of a homey atmosphere and a cafe atmosphere. Based on this, visualization progressed by combining objects like plants, lighting, and furniture that could act as signature features within the shop, alongside traces of a home like torn door marks or air conditioner marks. Ultimately, by evenly placing elements across the full 360° surface, I intended for the to-go cup to function like a business card outside the shop.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.mp4"]
  },
  {
    slug: "annpaak",
    title: "Annkpaak ≪Scene and Alienation≫",
    scope: "Identity design",
    category: "Commercial",
    completion: "Apr. 2024",
    thumbnail: "Thumbnail.mp4",
    description: "I was in charge of the overall exhibition graphics for the exhibition held under the title ≪Scene and Alienation≫. Because the message the organizers intended to deliver through the exhibition lay in the 'process' rather than the 'result value', there were two concerns for image expression: 1. How to express the dynamic progressing state of [Process] in static results like posters and books. 2. How to express the contrasting messages of [Scene] (a dynamic form) and [Alienation] (a relatively static form).\nTo solve these problems, I went through a stage of defining a visual concept with the phrase [Observation: Things visible only if you stay]. For [1], I specifically adopted the method of using Scodix treatment without ink to minimize static elements on the resulting poster. Through Scodix, which has low opacity and the form of a thin film, I intended the poster's appearance to function dynamically depending on positioning and illumination, meaning the degree of reflected light changes based on location. \nFor [2], to intuitively express the dynamic state, I first experimented by expressing the title [Scene] in a way that it never separates but remains connected under any conditions. Based on experimental results, I adopted a structure where the title [Scene] spills over by 1/4 on both the left and right sides of the page. I thought that if [Not separating, continuing] was confined solely within the page, the message intended could clash. Subsequently, to express the static state of [Alienation], I sought the most alienated space on the page and completely separated it by setting the kerning wide to increase the contrast with the title [Scene].",
    images: ["Thumbnail.mp4", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.JPG", "08.JPG", "09.mp4"]
  },
  {
    slug: "theboyz",
    title: "THE BOYZ 2nd full Pt.3 ≪Love Letter≫",
    scope: "Album jacket design",
    category: "Commercial",
    completion: "Feb. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "I joined the visualization stage for this project after the entertainment agency confirmed the visual concept internally. Due to this, there was one baseline condition: 1. Utilize six types of flowers. Accordingly, after procuring six types of flowers—sweet pea, dahlia, baby's breath, carnation, chrysanthemum, and tulip—we conducted individual and group shoots at the studio. \nAfterwards, source images were developed through the process of vectorization. Ultimately, from the group shot images, we adopted the image that had the greatest expected effect within the 3000*3000px layout, and went through the same process to develop the final draft. The source images developed through individual shoots were used for a total of 26 designs spanning banners, schedulers, and physical mood cards.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"]
  },
  {
    slug: "Calendar",
    title: "Calendar 2024",
    scope: "Paper Design",
    category: "Non-Commercial",
    completion: "Jan. 2024",
    thumbnail: "Thumbnail.jpg",
    description: "Every new year brings the repetition of the same numbers, but the thought that 'no single day is exactly the same' led me to create an unusual calendar.\nUsually, calendars are expressed based on two axes: horizontal and vertical. Horizontal represents the day of the week, and vertical means the week of the month. Here, our lives represent fairly similar horizontals, but quite different verticals. A prime example would be regular weekdays and weekends occupying the same horizontal line repetitions, while adding special events from the first to the fourth week establishes a hierarchy among those horizontal lines. \nIn this regard, I tried my best to express 'every day' more three-dimensionally by largely keeping the unchanging horizontal axis intact while applying height differences to the vertical axis. Furthermore, contemplating the faded colors characteristic of wall-hung calendars, I utilized Riso printing to implement this. Since it wasn't a calendar for sale, I wrapped up the project by gifting it to the people I worked with throughout 2023.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.mp4"]
  },
  {
    slug: "infoxCidae",
    title: "Info x Cidae",
    scope: "Apparel design",
    category: "Non-Commercial",
    completion: "Dec. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I carried out the visualization via inkless foil stamping (black foil) on the front and embossing on the back. I adopted a method where the back's embossing operates without interfering with the information on the front.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg"]
  },
  {
    slug: "ttb",
    title: "Beigebongbong",
    scope: "Identity design",
    category: "Commercial",
    completion: "Dec. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "Before establishing the exact design concept, I conducted research into the characteristics of 'Beigebongbong' (and 'TTB Studio') and the customers who seek out this brand. \nBrand features: 1. Mainly capturing wedding photos. 2. Located in Jeju. \nFrom the customers' perspective: 1. A desire to boast and be envied. 2. A once-in-a-lifetime shoot in life, leaving no room for revisions or reshoots. 3. Expectations for outdoor shoots. 4. Paying higher fees compared to other wedding studios. \nBased on this research, I set the direction for rebranding. Since it's a once-in-a-lifetime event, I believed it needed a structure highlighting the subjects—i.e., the customers—the most on the shooting day and in the outcomes. Therefore, keeping studio logos or design elements minimal and ensuring the visitors' appearances stand out the most became the baseline standard.\nNext, there were pros and cons associated with the location: [Jeju]. Abundant outdoor shoot options presented the advantage of relative freedom from typical wedding-shoot attire norms. However, due to its location, there were non-shoot expenses like transportation (vehicles, flights) and accommodation that acted as disadvantages. Thus, I believed providing value for consumption—i.e., offering a multi-dimensional brand experience—was essential.\nBy verbalizing prior research, I established the brand features: 1. Restrained neatness (A commercial-shoot base, yet not emphasizing it). 2. Classic aesthetic (Work delivered to customers bears a permanent nature, unlike ephemeral ID photos/sticker booths). 3. An inconvenience to willingly endure (If studio location/costs are unchangeable, aiming to provide a systematically elaborate, multi-dimensional experience invoking 'Going this far?' surprise).\nThereafter, based on the verbalized brand characteristics, I established practical visual features to apply to the design: 1. Concise 2. Permanent 3. Completed by hand. \nBased on these visual features, I designed 3 types of logos. Adopting a design that leverages punctuation marks based on the wedding characteristic—[The end, while simultaneously a new beginning]. Specifically, I utilized periods (.) and commas (,). The period (.), found at the end of sentences, intuitively suggests atmospheres like finality or endings. By definition, it's used to indicate days holding specific meanings in Arabic numbers. Distinct from the period, the comma (,) incites imagination of continuity and progress rather than ends. Using two contrasting punctuation marks, the design was constructed adjusting to a ratio (1:1.618) to avoid hindering fundamental aesthetic balance and the system while retaining simplicity.\nFor applications, I categorized tasks into: Before customer visits, On the day of visit, and Post-visit. Converting contracts/guidance messages previously exchanged via phones/messengers to paper formatting, I introduced procedures reviewing contracts/necessary guidance before visits via [Price List], [Contract], [Contract Confirmation], and [Week-Prior Guide], designing them on paper stock.\nFor the visit day, I designed applications that could offer tangible experiences directly inside the studio: [Shoot location info/process sheet], [Sign-stand], [Receipt], [Receipt holder], [Cup sleeve], [Business Card], and [Guide regarding studio introduction and shoot system]. Lastly, post-visit, I designed the layout for [Postcards] and [Other paper supplies] based on the shot images, finishing up by finalizing the packaging.",
    images: [
      "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg",
      "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg",
      "21.jpg", "22.jpg", "23.JPG", "24.JPG", "25.JPG", "26.JPG", "27.JPG"
    ]
  },
  {
    slug: "ubomanliNameCard",
    title: "Ubomanli BusinessCard",
    scope: "Paper design",
    category: "Commercial",
    completion: "Dec. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I carried out the visualization via inkless foil stamping (black foil) on the front and embossing on the back. I adopted a method where the back's embossing operates without interfering with the information on the front.",
    images: ["01.jpg", "02.jpg", "03.jpg"]
  },
  {
    slug: "Seong",
    title: "Seong Yoon-seon's Janggu Dance Network ≪Young Dancers Exhibition: Companion (同行)≫",
    scope: "Identity design",
    category: "Commercial",
    completion: "Nov. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "There were two main tasks to solve through Project 1 visualization: 1. Express that a total of 4 performances take place. 2. Express the instruments and equipment used in the performance. \nFor [1], I adopted a method of segregating the weekly performances through color. Specifically, this was utilized in weekly hand-outs, as I thought segregating via color was relatively more intuitive compared to graphic elements or typography. \nFor [2], I centered on the Janggu (drum) and Buk (drum) which are the main instruments in the performance. We then proceeded with a photoshoot of the instruments and equipment used. As it was a performance using instruments, I concluded the visualization process by expressing the title dynamically.",
    images: ["Thumbnail.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg"]
  },
  {
    slug: "extraOrdinary",
    title: "TTB x Bite Poets x Garb",
    scope: "Identity design",
    category: "Commercial",
    completion: "Nov. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I was in charge of the offline event graphics for three brands: a photo studio and wine bar located in Jeju, and a select shop located in Seoul. In the stage of defining the project's visual concept, I thought a visual language tying the three distinct brands together was necessary. Based on this thought, I considered two approaches: 1. Symbolization 2. Formalization.\nUltimately, I adopted method [1], expressing the main image through the punctuation mark of parentheses ( ). Given that the main purpose of visualization was [Conveying news of the offline event involving three brands together], I believed [1] was effective as a means to intuitively convey the main purpose. Specifically, for [2], it would require two steps: making an image tying the three brands and granting meaning to it. On the other hand, for [1], I judged the meaning of [Being included] was already inherently bestowed through the symbol. Thus, since the intended meaning was already present in [1], I thought it was an advantageous approach for both the expression method and the viewers.",
    images: ["Thumbnail.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.JPG", "09.JPG", "10.JPG", "11.JPG", "12.JPG", "13.JPG", "14.JPG", "15.JPG", "16.JPG", "17.JPG", "18.JPG", "19.JPG", "20.JPG"]
  },
  {
    slug: "jeom",
    title: "Jeom 1st anniversary",
    scope: "Paper design",
    category: "Commercial",
    completion: "Nov. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I developed a 7-piece postcard set to commemorate the 1st anniversary of Jeom Store located in Aewol-eup, Jeju. Since they were using the period (.) mark as a brand element, I adopted expanding designs utilizing the period (.) as the main visualization concept. For cards 2 through 6 of the 7-piece set, I used photographer Choi Won-hyuk's ≪Flowers≫ series. Because they were to be sold exclusively as a set and not individually, I felt one piece needed to act as a cover. Consequently, for the 1st card, I intended it to function as a cover through a process of converting the ≪Flowers≫ series photo image used in cards 2-6 into dot patterns.",
    images: ["01.JPG", "02.mp4", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.mp4"]
  },
  {
    slug: "knock",
    title: "Ubomanli ≪Knock≫",
    scope: "Identity design",
    category: "Commercial",
    completion: "Nov. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "≪Knock≫ motives the novel 『L'Étranger (The Stranger)』 by Albert Camus and the premiere ≪Stranger≫ held by the choreographer at Critics' Choice in 2019. Specifically, the duality between [The me who meets others] and [The me who meets me] was emphasized through the act of [Knocking] in the work, and the main task was how to express this visually. \nI defined directionality with the phrase [Duality: Considering extreme contrast] as the project's visual concept. Accordingly, I limited the colors of all elements on the poster, including photographic images, to black and white. Also, aiming to create an atmosphere where the title watches based on the photographic image, I structured the layout by horizontally flipping the overlapping [k]. Through this, I intended to heighten the contrast between [The me who meets others] and [The me who meets me]. Ultimately, I aimed to convey the duality articulated in the work via extreme contrast across all graphic elements in the performance.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"]
  },
  {
    slug: "buckwild",
    title: "Buckwild",
    scope: "Editorial design",
    category: "Non-Commercial",
    completion: "Oct. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I carried out a 20-page editorial design project under the concept [buckwild] alongside photographer Jun Ki-hong.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg"]
  },
  {
    slug: "chelon",
    title: "Chelon Archive Co.",
    scope: "Identity design",
    category: "Commercial",
    completion: "Sep. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I oversaw the identity design for the photo studio run by photographer Choi Won-hyuk. At the request of Choi Won-hyuk, the team's operator and photographer, a word-type and symbol logo were designed.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg"]
  },
  {
    slug: "mumu",
    title: "Mumu",
    scope: "Identity design",
    category: "Commercial",
    completion: "Sep. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I was in charge of the identity design for a Korean beef distribution brand with the slogan [meet via meat]. The conditions finalized in the planning stage were as follows: 1. Use high-saturation colors 2. Use distinct colors per product 3. Use design elements different from existing market directions.\nSince the target age group was set to those in their 20s-30s within the existing market and consequently taking a position setting product prices low, based on this, the visual direction was set as follows: 1. Actively develop brand elements 2. Develop brand elements with many curves and thickness 3. Setting keywords: 3-1. Curvy 3-2. Bold 3-3. Cheerful 3-4. Organized 3-5. Colorful.\nBased on these three directions, I designed 3 types of logo types, 16 packages, 2 types of business cards, 4 types of message cards, 3 types of handouts, 2 types of tapes, and 2 types of mobile layouts.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.JPG", "11.JPG", "12.JPG", "13.JPG", "14.JPG", "15.JPG", "16.JPG", "17.JPG", "18.JPG"]
  },
  {
    slug: "ChoiSeoul",
    title: "Photographer Choi Won-hyuk ≪Open Studio≫",
    scope: "Identity design",
    category: "Commercial",
    completion: "Aug. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I was in charge of the solo exhibition graphics for photographer Choi Won-hyuk, held under the title ≪Open Studio≫. Because the exhibition wasn't meant to deliver a specific message but rather to gather the artist's works, the main task was to harmoniously express the space and the artist's image. Accordingly, the process of selecting the image to be utilized as the main poster from among the artist's images was done first. Later, a secondary process of editing the chosen image to the exact size of the page was undertaken, and the work concluded by tuning the exhibition information according to hierarchy.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"]
  },
  {
    slug: "miam",
    title: "Photographer Choi Won-hyuk ≪MiamMiam≫",
    scope: "Identity design",
    category: "Commercial",
    completion: "Aug. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "An exhibition proceeding without a special statement or narrative, structured entirely via photographic images alone. Just as one might encounter various visual experiences while walking through multiple cities, to provide a variety of visual experiences purely through images without a statement, I constructed a layout with photographs containing diverse subjects without a specific form.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"]
  },
  {
    slug: "oboae",
    title: "Oboae x Photographer Choi Won-hyuk",
    scope: "Paper design",
    category: "Commercial",
    completion: "Aug. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "Developed 5 types of postcards for Oboae located in Jungang-ro, Jeju. The front bears the photo titles, and the back was developed with 4 graphic layouts.",
    images: ["00.JPG", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"]
  },
  {
    slug: "cidae",
    title: "Goi Goi",
    scope: "Editorial design",
    category: "Commercial",
    completion: "Jul. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "I took charge of the wordtype and symbol design for the gift packaging brand Goi Goi. The core concept of this project was that even with the same packaging tools and methods, each packaging is unique depending on the person gifting it. For the symbol, though the brand name consists solely of repetitions of the three letters [g,o,i], it was composed so that each letter could have slight variations. Through this, I intended to portray the sense of manual hand-crafting, slightly uneven from folding paper by hand yet distinctly heartfelt. For the wordtype, I considered versatility alongside the slightly uneven symbol, structuring it in a balanced form.",
    images: ["01.jpg", "02.jpg", "03.jpg"]
  },
  {
    slug: "nneed",
    title: "Nneed Coffee",
    scope: "Identity design",
    category: "Commercial",
    completion: "Jul. 2023",
    thumbnail: "Thumbnail.jpg",
    description: "Before setting the design concept, I underwent a process to prioritize what needed to be solved through the project. 1. Organize and visualize the brand story 2. Integrate brand elements \nFirst, I organized the brand story. Next, I conducted research on the category called Cafe, based on which I set the project direction. From the perspective of customers seeking out the brand: 1. Operating the brand through SNS 1-1. Producing content matching SNS sizes 1-2. Producing content through cameras 1-3. Maintaining the brand tone through setting photo styles 2. Brand integration through removal \nFor [1], I considered it a characteristic of the Cafe category itself. Unless it's a roastery supplying coffee beans, they usually didn't have a separate website, so I judged customer touchpoints to only be map apps or SNS. Thus, I believed showing a [consistent image] on SNS was a crucial key to this project. \nFor [2], I judged based on changeable scope. Since it wasn't a project with the volume to remodel the space itself, I thought the realistically expected effect of the project concentrated on online promotion. Therefore, I believed there shouldn't be a sense of disparity when a customer who saw online promotions actually visited the space. Thus, instead of emphasizing the changed brand through actively developing elements, starting with the constraint that the space remains maintained, I visualized focusing on the task of 'removing' so that the online promotions and other content wouldn't feel disparate from the physical space. \nUltimately, I proceeded with designing 21 types spanning wordmark and symbol logos, posters, postcards, business cards, t-shirts, menus, to-go cups, and content.",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg"]
  },
];
