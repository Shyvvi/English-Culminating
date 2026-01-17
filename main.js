/// -------------------------- PRIOR MADE FRAMEWORKS (derived from Unit 1 Project) --------------------------
// Utility class used for storing and handling two dimensional vectors (x and y)
class Vec2d {
    x = 0;
    y = 0;
    /**
     * Creates a two dimensional vector for storing locations and/or values
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Whether this vector and the vector provided within the arguement have the same values
     * @param {Vec2d} vec2d 
     * @returns Boolean
     */
    equals(vec2d) {
        return vec2d.getX() == this.getX() && vec2d.getY() == this.getY(); 
    }

    /**
     * Adds this vector to the vector provided within the arguements
     * @param {Vec2d} vec2d 
     * @returns The sum of the two vectors
     */
    add(vec2d) {
        return new Vec2d(this.x + vec2d.getX(), this.y + vec2d.getY())
    }

    /**
     * Subtracts this vector to the vector provided within the arguements
     * @param {Vec2d} vec2d 
     * @returns The difference of the two vectors
     */
    subtract(vec2d) {
        return new Vec2d(this.x - vec2d.getX(), this.y - vec2d.getY())
    }

    /**
     * Multiplies this vector to the vector provided within the arguements
     * @param {Number} value 
     * @returns the product of the multiplied vector
     */
    multiply(value) {
        this.x = this.x * value;
        this.y = this.y * value;
        return this;
    }

    /**
     * Divides this vector to the vector provided within the arguements
     * @param {Number} value 
     * @returns the quotient of divided vector
     */
    divide(value) {
        this.x = this.x / value;
        this.y = this.y / value;
        return this;
    }

    /**
     * Returns the x value of this vector
     * @returns
     */
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    /**
     * Sets the X value of the vector
     * @param {Number} value 
     */
    setX(value) {
        this.x = value;
    }
    /**
     * Sets the Y value of the vector
     * @param {Number} value 
     */
    setY(value) {
        this.y = value;
    }

    clone() {
        return new Vec2d(this.x, this.y);
    }

    screenPercent() {
        return new Vec2d(window.innerWidth/100 * this.x, window.innerHeight/100 * this.y);
    }

    /**
     * Logs the value
     */
    logValues() {
        console.log(this + " = " + this.x + " " + this.y);
    }
}

// ImageHTMLElement allows for the dynamic creation of new images on a webpage which can be moved and animated very easily
class ImageHTMLElement {
    // imageSource is where the actual .png is located within the local files
    imageSource = "";
    // the location of where the image is created initially
    spawnLocation;
    // the HTML div where this image will be stored and moved
    containerDiv = "";dicc
    // IDRoot is the text before the actual ID (eg: root-69)
    IDRoot = "";
    ID = getNewID();
    /**
     * 
     * @param {String} imageSource 
     * @param {Vec2d} spawnLocation 
     * @param {String} containerDiv 
     * @param {String} IDRoot 
     */
    constructor(imageSource, spawnLocation, containerDiv, IDRoot) {
        this.imageSource = imageSource;
        this.spawnLocation = spawnLocation;
        this.containerDiv = containerDiv;
        this.IDRoot = IDRoot;
        this.initialize();
    }

    // initialization function which is called by the createObject() function
    // controls everything which only needs to be ran once
    initialize() {
        // create the HTML img and store it inside of a constant blah blah blah
        const IMG_ELEMENT = document.createElement("img");
        // set the necessary CSS values
        IMG_ELEMENT.style.position = "absolute";
        IMG_ELEMENT.draggable = false;
        // again, set the ID of the HTML element so it can be referred to in the future by this object
        IMG_ELEMENT.id = this.getID();

        // push the image to the div in the actual HTML
        document.getElementById(this.containerDiv).appendChild(IMG_ELEMENT);
        
        // set the actual image to the source provided within the super constructor
        this.setSprite(this.imageSource);
        // move the image to the spawn location provided within the super constructor
        this.moveSprite(this.spawnLocation);
    }

    /**
     * Toggles whether this image is to be displayed or not
     * @param {boolean} value 
     */
    setDisplayed(value) {
        // set the CSS display to visible or not based on the boolean provided within the arguements
        if(value) {
            this.getSprite().style.display = "block";
        } else {
            this.getSprite().style.display = "none";
        }
    }

    // get the ID of this ImageHTMLElement (used for HTML access and more)
    getID() {
        return this.IDRoot+"-"+this.ID;
    }

    // function for setting the actual image to be displayed
    // image sources must be a .png and must be within the local assets folder
    setSprite(source) {
        this.getSprite().src = source;
    }
    // function for getting the HTML element which this object is linked to
    getSprite() {
        return document.getElementById(this.getID());
    }

    // function for changing the location of this sprite
    moveSprite(vec2d) {
        let spriteSize = this.getSpriteSize();
        // this is so the location of the sprite is centered and not on the corner
        // if this code was not in place, moving around the sprite would have it's position anchored to the top left corner
        // this code places the anchor within the center of the image
        this.getSprite().style.left = vec2d.getX() - (spriteSize.getX() / 2) + "px";
        this.getSprite().style.top = vec2d.getY() - (spriteSize.getY() / 2) + "px";
    }
    // get the location of the sprite
    getSpriteLocation() {
        let spriteSize = this.getSpriteSize();
        return new Vec2d(
            // also offset so the location of the sprite is anchored to it's center rather than the top left corner
            parseInt(String(this.getSprite().style.left).replace("px", "")) + (spriteSize.getX() / 2), 
            parseInt(String(this.getSprite().style.top).replace("px", "")) + (spriteSize.getY() / 2)
        );
    }

    // function for setting the size of the sprite
    setSpriteSize(size) {
        this.getSprite().width = size.getX();
        this.getSprite().height = size.getY();
    }
    // function for getting the size of the sprite
    getSpriteSize() {
        return new Vec2d(
            this.getSprite().width, 
            this.getSprite().height
        );
    }

    // check for whether two imageHTMLElements are overlapping
    // bounding modifier changes the size of the other imageHTMLElement, making its detection size larger or smaller
    isOverlappingImage(imageHTMLElement, boundingModifier) {
        // get the rectangles of this sprite and the sprite provided within the arguements
        const thisRect = this.getSprite().getBoundingClientRect();
        const otherRect = imageHTMLElement.getSprite().getBoundingClientRect();

        // this part I got from stackoverflow :)
        const xOverlap = Math.max(0, Math.min(thisRect.right-boundingModifier.getX(), otherRect.right) - Math.max(thisRect.left+boundingModifier.getX(), otherRect.left));
        const yOverlap = Math.max(0, Math.min(thisRect.bottom-boundingModifier.getY(), otherRect.bottom) - Math.max(thisRect.top+boundingModifier.getY(), otherRect.top));

        // return for whether the x and y differences are more than zero (which means they're overlapping)
        return xOverlap > 0 && yOverlap > 0;
    }

    // function for rotating the sprite a set amount of degrees
    rotateSprite(degrees) {
        this.getSprite().style.transform = "rotate("+degrees+"deg)";
    }

    // function for setting the opacity of the sprite
    setOpacity(opacity) {
        this.getSprite().style.opacity = opacity / 100+"";
    }

    // function for getting the opacity of the sprite
    getOpacity() {
        return this.getSprite().style.opacity * 100;
    }

    resize(value) {
        this.getSprite().style.height = value+"%";
        return this;
    }
}

// the framework required for ticking elements
// configurable, the speed at which the game ticks
const TICKING_SPEED = 10;
// the setInterval for the ticking elements (so the tickingElements actually tick)
let tickingObjects = [];
let primaryTicker = setInterval(tickElements, TICKING_SPEED);
function tickElements() {
    for(let i = 0; i < tickingObjects.length; i++) {
        // have a try and catch as if one ticking element throws an exception, it will halt all further ticking
        // this effectively freezes all ticking for the game meaning it wont work
        try {
            if(!tickingObjects[i].exemptedTicking) {
                tickingObjects[i].tick();
            }
        } catch (error) {
            // throw a tickFailError which it will be exempted from ticking furthermore if it continues to error
            tickingObjects[i].tickFailError(tickingObjects[i], error);
        }
    }
    tick();
}
/** TickingElement is a parent class for objects which are to be ticked non-persistently
 *  this means that these objects will not tick when the game is paused
 *  TickingElement acts as a tag of sorts where if a class extends this one, it will automatically have the tick() function called
 */
class TickingElement {
    constructor() {}

    initTickingElement(childClass) {
        tickingObjects.push(childClass);
    }
    // !! all of the code below is essentially a failsafe to make sure the program keeps running even when there are errors !!

    // constant for the maximum amount of failed ticks a TickingElement can have
    TICK_FAIL_THRESHOLD = 10;
    // variable for storing the amount of failed ticks a TickingElement has
    tickFailAmount = 0;
    // boolean to determine whether a TickingElement is exempted from ticking or not
    exemptedTicking = false;

    // function which is called whenever an object fails to tick
    tickFailError(object, error) {
        // increment the amount of failed ticks
        this.tickFailAmount++;
        // log the error to console
        console.error(object + " has failed to tick correctly "+this.tickFailAmount+" times! \n("+error+")");
        // if the amount of failed ticks surpasses the threshold constant, exempt it from ticking furthermore as it is broken
        if(this.tickFailAmount > this.TICK_FAIL_THRESHOLD) {
            object.exemptTicking(object);
        }
    }

    // function which logs this TickingElement's exemption from ticking furthermore 
    exemptTicking(object) {
        // make sure to actually exempt this object from ticking
        this.exemptedTicking = true;
        console.error(object + " surpassed the tick fail threshold and will be exempted from ticking!");
    }
}


class TextBox {
    spawnLocation;
    containerDiv;
    IDRoot;
    width;
    text;
    ID = getNewID();
    constructor(spawnLocation, containerDiv, IDRoot, width, text) {
        this.spawnLocation = spawnLocation;
        this.containerDiv = containerDiv;
        this.IDRoot = IDRoot;
        this.width = width;
        this.text = text;
        this.initialize();
    }  
    initialize() {
        console.log("test");
        // create the HTML img and store it inside of a constant blah blah blah
        const P_ELEMENT = document.createElement("p");
        // set the necessary CSS values
        P_ELEMENT.style.position = "absolute";
        P_ELEMENT.style.maxWidth = this.width+"%";
        // again, set the ID of the HTML element so it can be referred to in the future by this object
        P_ELEMENT.id = this.getID();

        document.getElementById(this.containerDiv).appendChild(P_ELEMENT);
    
        // move the image to the spawn location provided within the super constructor
        this.moveText(this.spawnLocation);
        this.setText(this.text);
    }

    center() {
        this.getP().style.transform = "translate(-50%, -50%)";
        return this;
    }

    getID() {
        return this.IDRoot+"-"+this.ID;
    }

    // function for getting the HTML element which this object is linked to
    getP() {
        return document.getElementById(this.getID());
    }

    // function for setting the actual text to be displayed
    setText(text) {
        this.getP().innerText = text;
    }

    // function for setting the opacity of the sprite
    setOpacity(opacity) {
        this.getP().style.opacity = opacity / 100+"";
    }

    // function for getting the opacity of the sprite
    getOpacity() {
        return this.getP().style.opacity * 100;
    }

    // function for changing the location of this sprite
    moveText(vec2d) {
        this.getP().style.left = vec2d.getX() + "px";
        this.getP().style.top = vec2d.getY() + "px";
    }
    // get the location of the sprite
    getTextLocation() {
        return new Vec2d(
            // also offset so the location of the sprite is anchored to it's center rather than the top left corner
            parseInt(String(this.getP().style.left).replace("px", "")), 
            parseInt(String(this.getP().style.top).replace("px", ""))
        );
    }
}

let IDTracker = 0;
// function for getting a unique ID for an object
function getNewID() {
    IDTracker++;
    return IDTracker;
}

// -------------------------------------- NEW CLASSES ---------------------------------------

class Page extends TickingElement {
    displayed = true;
    elementArray = [];
    constructor(elementArray) {
        super();
        this.elementArray = elementArray;
        this.initTickingElement(this);
    }

    setDisplayed(value) {
        this.displayed = value;
        for (let i = 0; i < this.elementArray.length; i++) {
            if(this.elementArray[i].getID() != null) {
                document.getElementById(this.elementArray[i].getID()).style.display = value ? "block" : "none";
                if(value) {
                    this.elementArray[i].setOpacity(0);
                }
            }
        }
    }

    tick() {
        if(this.displayed) {
            for(let i = 0; i < this.elementArray.length; i++) {
                this.elementTransition(this.elementArray[i]);
            }
        }
    }

    elementTransition(element) {
        if(element.getOpacity() == null) {
            element.setOpacity(0);
        } else if(element.getOpacity() <= 100) {
            element.setOpacity(element.getOpacity() + 1);
        } 
    }
}

const BUTTONS = document.querySelectorAll('.select-btn');
const LIGHT_MOVEMENT_SPEED = 15;
let LIGHT_FLICKER_AMOUNT = 3;
let lightExpanded = false;
let lightSize = 280;
let gradientPos = new Vec2d(window.outerWidth/2, window.outerHeight/2);
let mousePos = new Vec2d(0, 0);

// new TextBox(new Vec2d(10, x).screenPercent(), 'text-container', 'text', 80, ''),

let pageIndex = 0;
let pages = [
    homePage = new Page([
        new TextBox(new Vec2d(50, 20).screenPercent(), 'text-container', 'text', 80, 'Explore a handful of many unsung Indigenous voices which have made an impact and hold significance to their communities in one way or another.').center(),
        new TextBox(new Vec2d(50, 30).screenPercent(), 'text-container', 'text', 80, 'Akin to the darkness on this website, these 3 unsung Indigenous voices deserve more recognition for the impacts and efforts which they have made.').center(),
        new TextBox(new Vec2d(50, 40).screenPercent(), 'text-container', 'text', 80, 'Spread the word now, and sing what\'s otherwise unsung.').center(),
        new TextBox(new Vec2d(50, 80).screenPercent(), 'text-container', 'text', 80, '(If an issue occurs, reload the website or try resizing the website and then reloading it, I apologize in advance for any potential inconveniences as a result of programming)\nIt is also to note that this website was developed on Microsoft Edge ').center()
    ]),
    alwynMorrisPage = new Page([
        new TextBox(new Vec2d(10, 10).screenPercent(), 'text-container', 'text', 80, 'Alwyn Morris was an Indigenous sprint kayaker who is a member of the Mohawk Nation of Kahnawake, raised by his grandparents near Montreal, Quebec he followed his career to win multiple international titles representing Canada. His cultural identity of being Mohawk and Indigenous played a major role in how he represented himself publicly which included at competition, this would eventually lead to him not only breaking history, but creating a historical moment at the Olympics.'),
        new TextBox(new Vec2d(10, 30).screenPercent(), 'text-container', 'text', 50, 'Achievements:\nFirst Canadian of Indigenous descent to win an Olympic gold medal\nHis significant titles include:\n- Gold medal in K-2 1000m at 1984 Los Angeles Summer Olympics\n- Silver medal in K-2 500m at 1984 Los Angeles Summer Olympics\n- Silver medal in K-2 1000m at 1982 Belgrade World Championships\n- Bronze medal in K-2 500m at 1983 Tampere World Championships'),
        new TextBox(new Vec2d(10, 50).screenPercent(), 'text-container', 'text', 40, 'Alwyn Morris is very much deemed notable through making history by being one of the first Canadians of Indigenous descent to win an Olympic gold medal at the summer events, but also using international sport as a means to represent and take pride in Indigenous identity in what is now known as the "Eagle Feather Salute".'),
        new TextBox(new Vec2d(10, 70).screenPercent(), 'text-container', 'text', 40, 'He performed the Eagle Feather Salute during the Olympic medal ceremony where he raised an eagle feather to honour his grandparents and to share his victory with Indigenous communities across Canada. Referring to his grandfather: "He wasn\'t there any longer and I needed to be able to show my respect for what he had taught me and went through with me.", showing his gratitudes towards the ones who raised and cared for him. He wanted to show that he was not only Canadian but also Mohawk, saying in a phone interview from Montreal: "What I did on the podium was really important for me.".'),
        new TextBox(new Vec2d(10, 95).screenPercent(), 'text-container', 'text', 40, 'Alwyn Morris\' Eagle Feather Salute became a historic cultural moment in Olympic history and increased Indigenous pride and recognition on an international stage, demonstrating pride, gratitude and respect all without uttering a single word.'),
        new TextBox(new Vec2d(10, 110).screenPercent(), 'text-container', 'text', 80, 'Annotated Bibliography:\n\n Dirk Meissner The Canadian Press. "From a Single Feather to a Top-flight Program." Toronto Star, 27 Dec. 2009, www.thestar.com/sports/olympics-and-paralympics/from-a-single-feather-to-a-top-flight-program/article_732072d7-9c78-51ee-9818-7cccd1a2232a.html. \n\nAlwyn Morris, an Indigenous sprint kayaker from the Mohawk Nation of Kahnawake representing Canada, deserves more recognition for his achievements which have not only made history, but have also spread awareness and pride of his heritages and community. The news article for Alwyn Morris provides an interview which asks him questions regarding his career and the actions which made him one of, if not the most influential Indigenous athlete of all time. In Alwyn Morris\' competitive career, he was the first Canadian of Indigenous descent to win an Olympic gold medal in the Olympics Summer Games. While standing on the podium, Alwyn Morris raised an eagle feather which created widespread influence which is now recognized as \"The Eagle Feather Salute\". Alwyn Morris stated that the purpose of the salute was not only to share his victory with the Indigenous community, but also to commemorate his grandparents, saying: \"He wasn\'t there any longer and I needed to be able to show my respect for what he had taught me and went through with me.\", referring to his grandfather. Alwyn Morris stated: \"What I did on the podium was really important for me\" in a phone interview from Montreal. The Eagle Feather Salute he performed on an Olympic podium not only made widespread influence among Indigenous communities, but it also served as a means of showing his pride and heritage of being a part of the Mohawk nation at an international scene. Alwyn Morris stated that the purpose of the Eagle Feather Salute was to share the victory with the Indigenous communities from Canada, and to pay tributes to his grandparents as they had raised and nurtured him throughout the entirety of his childhood with his grandfather not being able to witness his achievement due to his passing. He also that it was important to show the world that he was not only Canadian, but also a member of the Mohawk nation within Canada which really demonstrates why the Eagle Feather Salute he performed on the podium made a great impact in the Indigenous community across Canada, making history in the process and allowing for him to say everything which he wanted to say without uttering a word. All of his actions show why Alwyn Morris is deserving of the title of being one of the most influential and significant Indigenous athletes in history, as he not only shows respect to the Indigenous community within Canada, but also takes great pride in such, spreading international awareness and acknowledgement of his heritage. Overall, the interview on Alwyn Morris from TheStar as a source provides sufficient and reliable information for Alwyn Morris, as it is within his own words. While the article does not speak upon his other significant achievements such as his Olympic bronze medal from the same Olympics or his world championship titles, it still mentions his most prominent title and provides an excellent amount of information on the significance of the action which made him famous, the Eagle Feather Salute. This makes the source quite significant in providing reliable, sufficient and sincere information for use on the website. Alwyn Morris\' achievements in the Olympics and actions on the podium have shown great amount of pride and respect to the Indigenous community in Canada, sharing his victory with them and thus, should be recognized and commemorated more for his contributions to spreading awareness and pride for Indigenous communities within Canada.'),
        new TextBox(new Vec2d(10, 190).screenPercent(), 'text-container', 'text', 80, 'Sources:\n\nTeam Canada - Canadian Olympic Committee. (2019, September 20). Alwyn Morris - Team Canada. Team Canada. https://olympic.ca/team-canada/alwyn-morris/\n\nCbc. (2009, December 9). Olympic torch cheered in Mohawk community. CBC. https://www.cbc.ca/news/canada/montreal/olympic-torch-cheered-in-mohawk-community-1.776911\n\nWikipedia contributors. (2025b, December 29). Alwyn Morris. Wikipedia. http://en.wikipedia.org/wiki/Alwyn_Morris\n\nDirk Meissner The Canadian Press. "From a Single Feather to a Top-flight Program." Toronto Star, 27 Dec. 2009, www.thestar.com/sports/olympics-and-paralympics/from-a-single-feather-to-a-top-flight-program/article_732072d7-9c78-51ee-9818-7cccd1a2232a.html. '),
        new ImageHTMLElement('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOMbyoBHZ71JnhAqCdljrc_YAURKggtdB3XaYRZwlnHdq-aChrvEjXJBqVjkW6-uMhMPpIcr-Gcz6ooBi96pl-FxWfVm2Vt4qptDPcQg&s=10', new Vec2d(60, 30).screenPercent(), 'image-container', 'image').resize(80),
        // new ImageHTMLElement('https://olympic.ca/wp-content/uploads/2011/09/142116510-e1546624419400.jpg?quality=100', new Vec2d(10, 80).screenPercent(), 'image-container', 'image').resize(25)
    ]),
    nadineCaronPage = new Page([
        new TextBox(new Vec2d(10, 10).screenPercent(), 'text-container', 'text', 80, 'Nadine Caron is a Canadian surgeon from First Nations Ojibwe and Italian descent, born in Kamloops, British Columbia who grew to pursue medicine which led to her becoming one of the first female First Nations students to graduate from the University of British Columbia\'s medical school. Her being an Indigenous woman has a major role in her career path leading her to instigate multiple studies and addressing health inequities which affect Indigenous peoples within Canada.'),
        new TextBox(new Vec2d(10, 30).screenPercent(), 'text-container', 'text', 50, 'Achievements:\n- First female First Nations general surgeon in Canada\n- First female First Nations graduate of UBC\'s medical school\n- Founder of UBC\'s Centre for Excellence in Indigenous Health\n- Inductee of the Canadian Medical Hall of Fame (2025)\n- Recipient of numerous national and institutional awards\n'),
        new TextBox(new Vec2d(10, 60).screenPercent(), 'text-container', 'text', 40, 'Nadine Caron is deemed notable for not only making many "firsts" within the field of medicine, but also for utilizing her position as an Indigenous woman to bring notice to health inequalities and potentially higher risks found within Indigenous communities. Nadine Caron\'s research resulted in identifying that Indigenous peoples are not only at higher risk of contracting certain types of cancer but also have a higher risk of death to all types of cancers. Her studies have supported and made a significant impact on how Indigenous health is both addressed and handled within Canada.'),
        new TextBox(new Vec2d(10, 90).screenPercent(), 'text-container', 'text', 40, 'On numerous occasions, Nadine Caron speaks about the importance of mentorship and giving back to others with her wishes to inspire more Indigenous and non-Indigenous students who are interested in medicine. She remains very humble, saying that much of her success is from the mentors who supported her throughout her life stating: "I am where I am because of coaches, instructors, professors, mentors, and I believe in giving back", also despite having opportunities to work abroad in greater projects, she chose to remain in Canada and work in local communities really demonstrating her dedication and respect to improving Indigenous health and health in general in her career.'),
        new TextBox(new Vec2d(10, 120).screenPercent(), 'text-container', 'text', 40, 'Nadine Caron\s work has benefited numerous Indigenous communities across Canada by spreading awareness of potential health hazards that affect Indigenous peoples across Canada and by also advocating for healthcare systems which prioritize equity. Her numerous achievements have garnered great Indigenous awareness and pride within the medicine community and continue to inspire future generations of Indigenous students interested in medicine.'),
        new TextBox(new Vec2d(10, 150).screenPercent(), 'text-container', 'text', 80, 'Annotated Bibliography:\n\nWikipedia contributors. "Nadine Caron." Wikipedia, 4 Nov. 2025, en.wikipedia.org/wiki/Nadine_Caron.\n\nNadine Caron is a Canadian Surgeon who has made numerous achievements and studies in the field of health, deserves more widespread recognition and credibility for the contributions she has made. The Wikipedia page for Nadine Caron not only outlines her early life but also all of her publications, studies, achievements, awards and more, all of which make her a significant figure in both the health field and Indigenous communities, whilst also sourcing many useful sub sources such as interviews, bibliographies and more. Nadine Caron is the first Canadian female First Nations student to graduate from University of British Columbia\'s medical school, and has numerous achievements throughout her career. Some of her achievements include: Shrum Gold Medal top undergraduate student from Simon Fraser University 1993, Honorary Doctor of Science from Simon Fraser University in 2016, Dr. Thomas Dignan Indigenous Health Award from the Royal College of Physicians, and even being the Inductee of the Canadian Medical Hall of Fame with her formal induction from June 2025,  whilst having many more awards. Alongside all of her awards and commemorations throughout her career Nadine Caron has also made many significant and important discoveries especially regarding health inequities in Canada, such as the discovery of First Nations in British Columbia to have higher cancer rates and lower survival rates to almost all forms of cancer. Nadine Caron\'s achievements within her career prove as a great demonstration of the significant impacts which she has made within the health field, whether it is in regards to discoveries in cancer or instigating the increased risks which Indigenous peoples face after surgery. Her contributions to the field of health have not only benefited the Indigenous community, bringing more light to risks which pose hazards but also the greater population, which is why her contributions should be recognized more widespread. Despite her countless achievements and discoveries within her field, she remains very humble which is seen in numerous interviews and quotes which she has stated in the past, which is why she is a great role model for people to look up to, especially Indigenous peoples who are interested in the health field.  In summary, Nadine Caron\'s Wikipedia page serves as a great and reliable source of information to use for the website, as it shares a great amount of important information regarding Nadine Caron\'s achievements and general life whilst also citing many trustworthy sources which support Indigenous perspectives such as interviews, commemorations and more. Wikipedia as an organization have explicitly stated their neutral take on documentation and denial of bias to provide neutral and sincere information. Additionally, the page has numerous volunteers working regularly to review and update its content to ensure the information provided is accurate, credible and reliable. All of these reasons prove why Wikipedia is a reliable source and as such can be used for the website as a sufficient source of information for the website. Nadine Caron\'s numerous contributions and discoveries to the field of health which have not only benefited the Indigenous community, but also the general populace should be more recognized and widespread.'),
        new TextBox(new Vec2d(10, 225).screenPercent(), 'text-container', 'text', 80, 'Sources:\n\nNadine Caron | Canada\'s 1st female Indigenous surgeon. (2022, October 24). [Video]. CBC. https://www.cbc.ca/player/play/video/1.3893460 \n\nTerry Fox Foundation. (2025, October 14). Meet the Terry Fox Foundation Board of Directors. https://terryfox.org/board-of-directors/\n\nBarrier-breaking Indigenous MD Nadine Caron to receive honorary degree from UFV. (2025, January 13). UFV Today. https://blogs.ufv.ca/blog/2017/06/barrier-breaking-indigenous-md-nadine-caron-to-receive-honorary-degree-from-ufv/\n\nWikipedia contributors. "Nadine Caron." Wikipedia, 4 Nov. 2025, en.wikipedia.org/wiki/Nadine_Caron.'),
        new ImageHTMLElement('https://www.med.ubc.ca/files/2021/05/Dr.-Nadine-Caron-TBC-500x500-1.jpg', new Vec2d(60, 30).screenPercent(), 'image-container', 'image').resize(60),
        new ImageHTMLElement('https://www.fnha.ca/AboutSite/NewsAndEventsSite/NewsSite/PublishingImages/about/news-and-events/news/dr-nadine-caron-named-founding-first-nations-health-authority-chair-in-cancer-and-wellness-at-ubc/FNHA-UBC-Cancer-Chair-Image-5.jpg', new Vec2d(60, 100).screenPercent(), 'image-container', 'image').resize(25)
    ]),
    riceWaubgeshigPage = new Page([
        new TextBox(new Vec2d(10, 10).screenPercent(), 'text-container', 'text', 80, 'Waubeshig Rice is an Indigenous author and journalist who is a member of the Wasauksig First Nation in Ontario. He was born and raised within his community and uses his experiences from living an Indigenous lifestyle into creating sincere, true and engaging stories for readers. Waubeshig Rice\'s works commonly cover topics such as identity, community and references to history both highlighting and expressing Indigenous cultures and the resilience of Indigenous peoples throughout Canada\'s history.'),
        new TextBox(new Vec2d(10, 30).screenPercent(), 'text-container', 'text', 50, 'Achievements:\n- Published numerous popular Indigenous novels and short story collections, including Legacy (2014) and Moon of the Crusted Snow (2018)\n- Has made many contributions to major Canadian publications as a journalist covering many significant Indigenous issues\n- Recipient of literary awards and recognition for contributions to Indigenous literature'),
        new TextBox(new Vec2d(10, 60).screenPercent(), 'text-container', 'text', 40, 'Waubeshig Rice is deemed as notable as he not only delivers many forms of literature such as stories or journalist publications but also for his ability to provide readers with credible, sincere stories to readers from Indigenous voices and perspectives. Through both means of fiction and journalism he has highlighted numerous struggles, histories and cultural keypoints within his writings, bringing more light to the Indigenous communities within Canada.'),
        new TextBox(new Vec2d(10, 90).screenPercent(), 'text-container', 'text', 40, 'Waubeshig Rice has stated numerous times in the past that he prioritizes preserving and sharing culture within his storytelling in multiple interviews saying that: "Storytelling is a way for us to remember who we are, and to imagine who we want to become,". This puts strong emphasis on the role of storytelling to him and shows how his dedication to Indigenous communities and cultures goes past just himself, he even goes to the extent of mentoring aspiring Indigenous writers and contributes extensively to spreading the word of Indigenous voices in media and literature.'),
        new TextBox(new Vec2d(10, 120).screenPercent(), 'text-container', 'text', 40, 'Waubeshig Rice\'s works have contributed greatly to spreading awareness of Indigenous voices and experiences not only within Canada, but also internationally. Although he writes mostly fiction as he is primarily an author, the experiences presented in his stories can be very real and true to Indigenous history. He also shows cultural accuracy in his storytelling which challenges stereotypes and offers accurate portrayals of Indigenous life, which includes the cultural aspects and potential hardships one may encounter. His storytelling has done many things for the Indigenous community and has spread lots of awareness in doing so.'),
        new TextBox(new Vec2d(10, 150).screenPercent(), 'text-container', 'text', 80, 'Sources:\nWikipedia contributors. (2026, January 4). Waubgeshig Rice. Wikipedia. https://en.wikipedia.org/wiki/Waubgeshig_Rice\n\nMy WordPress. (2025, September 26). About - Waubgeshig Rice Author journalist. Waubgeshig Rice Author Journalist - Representing Wasauksing First Nation. https://waub.ca/about/\n\nWaubgeshig Rice | The Writers\' Union of Canada. (n.d.-b). https://writersunion.ca/member/waubgeshig-rice \n\nWikipedia contributors. (2025, October 14). Moon of the crusted snow. Wikipedia. https://en.wikipedia.org/wiki/Moon_of_the_Crusted_Snow'),
        new ImageHTMLElement('https://images.squarespace-cdn.com/content/v1/63c85cd787bfcf46d3a5fcb2/dae1747b-1d38-4b69-a2a0-ad626075dfcf/au-Rice-credit-Shilo-Adamson.jpg', new Vec2d(60, 30).screenPercent(), 'image-container', 'image').resize(60),
        new ImageHTMLElement('https://m.media-amazon.com/images/I/71Saa3PUKYL._UF1000,1000_QL80_.jpg', new Vec2d(63, 100).screenPercent(), 'image-container', 'image').resize(30),
        new ImageHTMLElement('https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1410298891i/23196841.jpg', new Vec2d(80, 100).screenPercent(), 'image-container', 'image').resize(30)
    ])
];


initialize();
async function initialize() {
    moveArray(0);
    await sleep(10);
    document.addEventListener("mousemove", (e) => {
        mousePos = new Vec2d(e.clientX, e.clientY);
    });

    document.addEventListener('keydown', function(event) {
        if (event.code == "KeyC") {
            document.getElementById("space-hint").style.display = "none";
            if(lightExpanded) {
                lightExpanded = false;
                lightSize = 280;
            } else {
                lightExpanded = true;
                lightSize = 3*300;
            }
        }
    });

    BUTTONS.forEach(button => {
    button.addEventListener('click', function() {
        this.blur();
    });
    moveArray(0);
});
}

function tick() {
    moveLight();
}

/**
 * Moves through the closetArray, changing the closetIndex
 * @param {Number} amount 
 */
function moveArray(amount) {
    // move the array index
    pageIndex += amount;

    // these if statements make sure the current location is within the array
    // if a position outside of the array is tried to be accessed, it will most likely throw errors
    if(pageIndex < 0) {
        // set the position of the array to the top so it loops
        pageIndex = 0;
    } // check if the position of the array is outside of array's bounds again
    else if(pageIndex > pages.length-1) {
        // set the position of the array to the bottom so it loops
        pageIndex = pages.length-1;
    }

    for(let i = 0; i<pages.length; i++) {
        pages[i].setDisplayed(false);
    }

    pages[pageIndex].setDisplayed(true);
}

function moveLight() {
    let gradientDifference = mousePos.subtract(gradientPos);
    gradientDifference.divide(LIGHT_MOVEMENT_SPEED);

    gradientPos = gradientPos.add(gradientDifference);

    let gradientCenter = new Vec2d((gradientPos.getX() / window.innerWidth) * 100, (gradientPos.getY() / window.innerHeight) * 100);
    let gradientSize = getRandomInt(lightSize-LIGHT_FLICKER_AMOUNT, lightSize+LIGHT_FLICKER_AMOUNT);

    const revealedArea = document.querySelector(".revealed-area");
    revealedArea.style.background = `radial-gradient(circle ${gradientSize}px at ${gradientCenter.getX()}% ${gradientCenter.getY()}%, transparent 10%,rgba(0, 0, 0, 0.98))`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}