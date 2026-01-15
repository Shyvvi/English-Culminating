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
let IDTracker = 0;
// function for getting a unique ID for an object
function getNewID() {
    IDTracker++;
    return IDTracker;
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
        this.getSprite().style.opacity = opacity / 100+"";
    }

    // function for getting the opacity of the sprite
    getOpacity() {
        return this.getSprite().style.opacity * 100;
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

// -------------------------------------- NEW CLASSES ---------------------------------------

class Page extends TickingElement {
    displayed = true;
    elementArray = [];
    constructor(elementArray) {
        super();
        this.elementArray = elementArray;
    }

    setDisplayed(value) {
        this.displayed = value;
        for (let i = 0; i < this.elementArray.length; i++) {
            this.elementArray[i].getP().style.display = value ? "block" : "none";
            if(value) {
                this.elementArray[i].setOpacity(0);
            }
        }
    }

    tick() {
        if(displayed) {
            this.elementTransition();
        }
    }

    elementTransition(element) {
        if(element.getOpacity() <= 1) {
            element.setOpacity(element.getOpacity() + 1);
        }
    }
}

const LIGHT_MOVEMENT_SPEED = 15;
let LIGHT_FLICKER_AMOUNT = 3;
let gradientPos = new Vec2d(window.outerWidth/2, window.outerHeight/2);
let mousePos = new Vec2d(0, 0);

alwynMorrisPage = new Page([
    new TextBox(new Vec2d(200, 200), "text-container", "text", 200, "testing testing testing"),
    new ImageHTMLElement("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOMbyoBHZ71JnhAqCdljrc_YAURKggtdB3XaYRZwlnHdq-aChrvEjXJBqVjkW6-uMhMPpIcr-Gcz6ooBi96pl-FxWfVm2Vt4qptDPcQg&s=10", new Vec2d(300, 200), "image-container", "image")
]);

initialize();
function initialize() {
    document.addEventListener("mousemove", (e) => {
        mousePos = new Vec2d(e.clientX, e.clientY);
    });
}

function tick() {
    moveLight();
}

function moveLight() {
    let gradientDifference = mousePos.subtract(gradientPos);
    gradientDifference.divide(LIGHT_MOVEMENT_SPEED);

    gradientPos = gradientPos.add(gradientDifference);

    let gradientCenter = new Vec2d((gradientPos.getX() / window.innerWidth) * 100, (gradientPos.getY() / window.innerHeight) * 100);
    let gradientSize = getRandomInt(280-LIGHT_FLICKER_AMOUNT, 280+LIGHT_FLICKER_AMOUNT);

    const revealedArea = document.querySelector(".revealed-area");
    revealedArea.style.background = `radial-gradient(circle ${gradientSize}px at ${gradientCenter.getX()}% ${gradientCenter.getY()}%, transparent 10%,rgba(0, 0, 0, 0.98))`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}