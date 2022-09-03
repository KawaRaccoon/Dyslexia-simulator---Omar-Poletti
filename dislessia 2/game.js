import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
// Initializing the Kaboom Context : 
kaboom({
    width: window.innerWidth,
    height: window.innerHeight,
    font: "sinko",
    background: [0, 0, 0,],
});

// Here we are going to load all our sounds : 
loadSound("bg", "background.mp3");
const background = play("bg", {
    volume: 0.4,
    loop: true
})
// Loading our backgrounds : 
loadSprite("background","background.jpg");
loadSprite("background1","background1.jpg")
loadSprite("background2","background2.jpg")
loadSound("explosion", "explosion.wav")
loadSound("gameover", "gameover.wav")
loadSound("roar","roar.wav")
loadSound("laugh","laugh.wav")
// Here we are loading all our sprites at once before making any scenes or levels : 
loadSprite('bg', "bg.jpg")
loadSprite("ground", "ground.png")
loadSprite("player", "player.jpg");
loadSprite("player2", "player_white.png");
loadSprite("player3", "player_blue.jpg");
loadSprite("level1", "level 1.png")
loadSprite("door", "door.jpg")
loadSprite("door_white", "door_white.jpg");
loadSprite("vanita", "vanita.png")
loadSprite("cow1", "cow.jpg");
loadSprite("cow2", "incomprehensible cow.png")
loadSprite("enemy1", "enemy-black.png");
loadSprite("enemy2", "enemy.png")
loadSprite("happyProfessorBlue", 'happyProfessor.png');
loadSprite('angryProfessorBlue', "angryProfessorBlue.png")
loadSprite('angryProfessorBlack', "angryProfessorBlack.jpg")
loadSprite("happyProfessorBlack","happyProfessorBlack.jpg");
loadSprite("angryProfessorLevel3","angryProfessorLevel3.png")
loadSprite("candy", "candy.png")


//   The game has four levels or scenes : 
//    1 - Level 0 
//    2 - Level 1
//    3 - Level 2 
//    4 - Level 3 



// The Interface scene is here : 

scene("interface", () => {
    add([
        sprite('bg', { width: width(), height: height() }),
        pos(0, 0)
    ])
    add([
        text("Hello Welcome to "),
        pos(250, 24),
        scale(5)
    ])
    add([
        text("Press any key to play the Game"),
        pos(100, 550),
        scale(4)
    ])
    onKeyRelease(() => {
        go("gameLevel0")
    })
})

go('interface');

// Game Over scene: 

scene("gameover", () => {
    wait(3,()=>{
        go("gameLevel1")
    })
    const roar = play("roar", {
        volume: 0.4,
    })
    add([
        sprite("angryProfessorLevel3"),
        pos((width() / 2) - 150, (height() / 2) - 300),
        scale(1),
        solid(),
        area(),
    ])
    add([
        text("Game Over"),
        color(255, 0, 0),
        pos(400, 300),
        scale(5)
    ])
 
    add([
        text("Press L to go to the Level 1."),
        pos(200, 400),
        scale(3)
    ])
    add([
        text("Press N to go to the Level 2."),
        pos(200, 500),
        scale(3)
    ])
    add([
        text("Press t to go to the Level 3."),
        pos(200, 600),
        scale(3)
    ])
    // Way to go back in our game : 

    onKeyPress("n", () => {
        wait(1, () => {
            go('gameLevel2');
        })
    })
    onKeyPress("t", () => {
        wait(1, () => {
            go('gameLevel3');
        })
    })
    onKeyPress("l", () => {
        wait(1, () => {
            go('gameLevel1');
        })
    })
})

//  _____ 0 Level ______ 

// Level 0

//--------- Making our  level 0 for reaching the school in our Game  ---------- : 

scene("gameLevel0", () => {
    background.play()
    let firstMap = [
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                           !!!!!!!!!!!                 ",
        "                                                                                       ",
        "                                                     !!!!!!              !!!!!         ",
        "                                                                                       ",
        "                                          !!!!!!!!!!!                           !!!!   ",
        "        !!                                                                             ",
        "        !!                             !!",
        "        !!                                                                          !!!!!!!!    ",
        "        !!                $ $                                                                  ",
        "=========================================                                                   =======",
    ]
    let firstMapConfig = {
        //  map configs : 
        //  size of each block
        width: 32,
        height: 32,
        // symbol means
        "=": () => [
            rect(20, 20),
            color(56, 155, 0),
            area(),
            solid(),
        ],
        "!": () => [
            rect(20, 20),
            area(),
            solid()
        ],
        "$": () => [
            sprite("enemy1"),
            area(),
            solid(),
            body(),
            scale(0.2),
            //  custom component : 
            enemiesMove(),
            health(2),
            "danger",
        ],
    }
    //  enemies move logic : 
    function enemiesMove(distance = 330, speed = 80, dir = 1) {
        return {
            id: "enemiesMove",
            // functin requires these components : 
            require: ["pos", "area",],
            startingPos: vec2(0, 0),
            add() {
                this.startingPos = this.pos;
                this.on("collide", (obj, side) => {
                    if (side === "left" || side === "right") {
                        dir = -dir;
                    }
                });
            },
            update() {
                if (Math.abs(this.pos.x - this.startingPos.x) >= distance) {
                    dir = -dir;
                }
                this.move(speed * dir, 0);
            },
        };
    }
    
    // Adding first level : 
    addLevel(firstMap, firstMapConfig)
    background.play()
    onUpdate(() => {
        if (player.pos.x > 3200) {
            go("gameLevel1")
        }

    })
    let myText = add([
        text("Hurry UP! You need to reach the school", { fade: 0.4 }),
        lifespan(5),
        pos(-300, 1000),
        scale(3)
    ])

    add([
        text("press SPACE to jump", { fade: 0.8 }), 
        pos(-300, 600),
        scale(3)
    ])

    wait(5, () => {
        add([
            text("Press A to fire.", { fade: 0.4 }),
            lifespan(3),
            pos(300, 1000),
            scale(3)
        ])
    })
    

    wait(5, () => {
        add([
            text("Shoot them two times", { fade: 0.8 }),
            
            pos(600, 600),
            scale(3)
        ])
    })
    let anotherText = add([
        text("Fall down and go to the next level."),
        pos(2900, 1000),
        scale(3)
    ])
    // Defining some game constants for our player : 
    const PLAYER_SPEED = 200;
    const PLAYER_WIDTH = 20;
    const PLAYER_HEIGHT = 25;
    const BULLET_SPEED = 200;
    let flipX;
    // player sprite : 
    const player = add([
        // rect(PLAYER_WIDTH, PLAYER_HEIGHT),
        sprite("player2"),
        scale(0.2),
        // color(30, 45, 78),   
        pos(100, -30),
        solid(),
        area(),
        health(6),
        body(),
        "player"
    ])
    // Adding event listeners for our player  : 
    onKeyDown("right", () => {
        player.flipX(false)
        flipX = false
        player.move(PLAYER_SPEED, 0)
    })
    onKeyDown("left", () => {
        player.flipX(true)
        flipX = true
        if (toScreen(player.pos).x > 20) {
            player.move(-PLAYER_SPEED, 0)
        }
    })
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    })
    // Event to fire the bullet : 
    // Defining our bullet :  
    let bullet = add([
        rect(10, 10),
        area(),
        solid(),
        pos(-100, -100),
        lifespan(0.2)
    ])
    onKeyPress("a", () => {
        bullet = add([
            rect(10, 10),
            area(),
            solid(),
            pos(player.pos.x + PLAYER_WIDTH, player.pos.y + 15),
            lifespan(1),
            "bullet"
        ])
        onUpdate(() => {
            if (!flipX) {
                bullet.move(BULLET_SPEED, 0)
            }
            else {
                bullet.pos.x = bullet.pos.x - PLAYER_WIDTH
                bullet.move(-BULLET_SPEED, 0)
            }
        })
    })
    //  camera position follow the player : 
    // action runs every frame : 
    onUpdate(() => {
        camPos(player.pos);
        if (player.pos.y >= 1200) {
            const gameover = play("gameover", {
                volume: 0.4,
            })
            go("gameover");
        }
    })

    // Detecting for collision between our player's bullet and the enemies : 
    onCollide("bullet", "danger", (bullet, danger) => {
        const explosion = play("explosion", {
            volume: 0.2,
        })
        background.volume(0.01)
        explosion.play()
        destroy(bullet);
        addKaboom(bullet.pos);
        danger.hurt(1)
        if (danger.hp() < 0) {
            destroy(danger)
        }
        shake()
        wait(0.8, () => {
            background.volume(0.4)
        })

    })

    // Detecting for collision between our player and enemy : 
    onCollide("player", "danger", (player, danger) => {
        const explosion = play("explosion", {
            volume: 0.2,
        })
        explosion.play()
        player.hurt(1)
        if (player.hp() < 0) {
            destroy(player);
            wait(1, () => {
                const gameover = play("gameover", {
                    volume: 0.4,
                })
                go('gameover')
            })
        }
        addKaboom(player.pos);
        shake()

    })
})



// Level 1 
// ---------------------- Our Level number 1 scene is here  ---------------- : 

 
         //     THE RIGHT ANSWER FOR LEVEL 1 IS HERE : 

// Come on - said Betsy - We have to pick up this corn. We don't have another can of popcorn
scene("gameLevel1", () => {
    let right;
    let destroyedTimer = false;
    // Our background is here : 
    let background = add([
        sprite("background"),
        scale(2.2)
    ])

    // Our timer code is here : 
    let time = 100;
    const timer = add([
        text(time),
        pos(600, 20),
        scale(3),
    ])
    // This will reduce the time by almost 1 second : 
    onUpdate(() => {
        if(time > 0){
                time = time - 0.02;
                timer.text = time.toFixed(0);
        }
        else if(time < 0){
            destroyedTimer = true
        }
    });

    // spawn the donkey when the time runs out : 
    wait(time,()=>{
        // if the time runs out then : 
        textarea.style.display = "none"
        every("incorrect", destroy)
        every("text", destroy)
        const roar = play("roar", {
            volume: 0.6,
        })
        add([
            sprite("angryProfessorBlue"),
            pos((width() / 2) - 100, (height() / 2) - 150),
            scale(0.8),
            solid(),
            area(),
            body(),
        ])
        wait(2, () => {
            go("gameover");
        })
    })
    

    //    Our level Text : 
    add([text("Welcome to the Class, Level 1"),
    pos(150, 100),
    lifespan(3, { fade: 0.5 }),
    scale(4),
    color(255, 255, 255,)
    ])
    wait(2.8,()=>{
        add([text("Write without quotation marks"),
        pos(200, 100),
        lifespan(3, { fade: 0.8 }),
        scale(3),
        color(255, 255, 255,),
        ])
    })
        

    wait(6, () => {
        add([text("Click Outside the box when you are done."),
        pos(150, 100),  
        lifespan(3, { fade: 0.8 }),
        scale(3),
        color(255, 255, 255,),
        ])
    })

    wait(10, () => {
        add([text("Remember: as a dyslexic you misread what is written."),
        pos(50, 60),
        lifespan ( 20, {fade : 0.8}),
        scale(2),
        color (255, 255, 255),
        ])
    })
    wait(10, () => {
        add([text("the letters 'p', 'q', 'd' and 'b' are reversed and the"),
        pos(50, 100),
        lifespan ( 20, {fade : 0.8}),
        scale(2),
        color (255, 255, 255),
        ])
    })

    wait(10, () => {
        add([text("sentences are disconnected where they should be connected"),
        pos(50, 140),
        lifespan ( 20, {fade : 0.8}),
        scale(2),
        color (255, 255, 255),
        ])
    })
   
    wait(10, () => {
        add([text("HURRY UP!"),
        pos(870, 200),
        lifespan ( 20, {fade : 0.8}),
        scale(2),
        color (255, 255, 255),
        ])
    })
    wait(10, () => {
        add([text("write the sentence before "),
        pos(870, 230),
        lifespan ( 20, {fade : 0.8}),
        scale(2),
        color (255, 255, 255),
        ])
    })
    wait(10, () => {
        add([text("time runs out!"),
        pos(870, 260),
        lifespan ( 20, {fade : 0.8}),
        scale(2),
        color (255, 255, 255),
        ])
    })
    // Our Map is here : 
    let secondMap = [
        "!                          !",
        "!                          !",
        "!                          !",
        "!                          !",
        "!                          !",
        "!                          !",
        "!                          !",
        "!                          !",
        "!           $ $            !",
        "!                          !",
        "!===============^=========",

    ]
    let secondMapConfig = {
        width: 60,
        height: 42,
        "=": () => [
            sprite("ground"),
            scale(0.2),
            pos(-100, 220),
            solid(),
            area(),

        ],
        "!": () => [
            rect(10, height()),
            color(0, 0, 0),
            solid(),
            area(),
            scale(1)

        ],
        "^": () => [
            sprite("door"),
            pos(100, 221),
            solid(),
            area(),
            scale(0.9),
            origin("botleft"),
            "door"
        ],
    }
    // Adding level to the stage : 

    addLevel(secondMap, secondMapConfig)
    // Defining some game constants for our player : 
    const PLAYER_SPEED = 200;
    let flipX;
    // First lets create our player sprite : 
    const player = add([
        // rect(PLAYER_WIDTH, PLAYER_HEIGHT)
        sprite("player2"),
        scale(0.5),
        pos(40, 520),
        solid(),
        area(),
        "player"
    ])

    if (right) {
        // Adding event listeners for our player  : 
        onKeyDown("right", () => {
            player.flipX(false)
            flipX = false
            player.move(PLAYER_SPEED, 0)
        })
        onKeyDown("left", () => {
            player.flipX(true)
            flipX = true
            if (toScreen(player.pos).x > 20) {
                player.move(-PLAYER_SPEED, 0)
            }
        })
    }
    else if (!right) {
        wait(4, () => {
            add([text("You can only move when you give the answer."),
            pos(70, 100),
            lifespan(3, { fade: 0.5 }),
            scale(3),
            color(255, 255, 255,),
                "text"
            ])
        })
    }
    //  Level 1 Logic is here : 
    let incorrectWords = add([
        sprite("level1"),
        pos(390, 170),
        scale(0.2),
        rotate(0.5, 0.5),
        "incorrect"
    ])

  
    // Creating a textarea : 
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.id = "mytextarea"
    textarea.style.zIndex = "1"
    textarea.style.display = "flex";
    textarea.style.height = "100px";
    textarea.style.width = "500px";
    textarea.style.border = "2px solid red";
    textarea.style.position = "absolute"
    textarea.style.top = "500px"
    textarea.style.left = "370px"
    textarea.style.fontSize = "14px"

    // Our correct text is here : 

    let correctWords = `Come on - said Betsy - We have to pick up this corn. We don't have another can of popcorn`;

    // This event occurs when you click outside the element :
    textarea.addEventListener('blur', () => {
        console.log(textarea.value)

        // If you give the right answer then this will happen : 
        if (textarea.value == correctWords) {
            textarea.style.display = "none  "
            right = true
            destroy(incorrectWords);
            add([text("Go to the door to go to the next Level"),
            pos(300, 400),
            lifespan(6, { fade: 0.1 }),
            scale(2),
            color(255, 255, 255,)
            ])
            add([text("sometimes the best gift you can give to a dyslexic is the gift of time"),
            pos(150, 365),
            lifespan(6, { fade: 0.1 }),
            scale(2),
            color(255, 255, 255,)
            ])
            const laugh = play("laugh", {
                volume: 0.6,
            })
            let happyProfessor = add([
                sprite("candy"),
                pos((width() / 2) - 80, (height() / 2) - 150),
                scale(1),
                solid(),
                area(),
            ])
            // Adding event listeners again for our player to move : 
            onKeyDown("right", () => {
                player.flipX(false)
                flipX = false
                player.move(PLAYER_SPEED, 0)
            })
            onKeyDown("left", () => {
                player.flipX(true)
                flipX = true
                if (toScreen(player.pos).x > 20) {
                    player.move(-PLAYER_SPEED, 0)
                }
            })

            // Collision with the door : 
            player.onCollide("door", () => {
                wait(1, () => {
                    go("gameLevel2")
                })

            })
        }
        // If you don't give the right answer : 
        else {
            textarea.style.display = "none";
            every("incorrect", destroy)
            every("text", destroy)
            const roar = play("roar", {
                volume: 0.6,
            })
            let angryProfessor = add([
                sprite("angryProfessorBlue"),
                pos((width() / 2) - 100, (height() / 2) - 150),
                scale(0.8),
                solid(),
                area(),
                body(),
            ])
            go("gameover")
        }
    })
})


// Level 2 
//------------------------ Our Level number 2 scene is here ------------------------: 
scene("gameLevel2", () => {
    add([text("Welcome to Level no. 2"),
    pos(300, 100),
    lifespan(3, { fade: 0.8 }),
    scale(3),
    color(255, 255, 255,)
    ])

    // Our Map is here : 
    let thirdMap = [
        "!                               !",
        "!                               !",
        "!                               !",
        "!                               !",
        "!                               !",
        "!                               !",
        "!                               !",
        "!               $ $             !",
        "!                               !",
        "!==================^=====",

    ]
    let thirdMapConfig = {
        width: 60,
        height: 42,
        "=": () => [
            sprite("ground"),
            scale(0.2),
            pos(-100, 250),
            solid(),
            area(),

        ],
        ".": () => [
            circle(16),
            scale(0.1),
            color(245, 245, 245),
        ],
        "!": () => [
            rect(10, height()),
            color(0, 0, 0),
            solid(),
            area(),
            scale(1)

        ],
        "^": () => [
            sprite("door_white"),
            pos(-95, 251),
            solid(),
            area(),
            scale(0.6),
            origin("botleft"),
            "door_white"
        ],
    }
    // Adding level to the stage : 

    addLevel(thirdMap, thirdMapConfig)
    let background = add([
        sprite("background1"),
        scale(2.135)
    ])
    let thisText =  add([
        text("Now a picture will appear before you only for an instant"),
        pos((width()/2) - 450, 100,{fade:0.8}),
        scale(2)
    ])
    wait(6,()=>{
        destroy(thisText)
        let thisTextToo = add([
            text("choose the most appropriate title for the image."),
            pos((width()/2) - 600, 100,{fade:0.8}),
            "thisTextToo",
            scale(3)
        ])  
    })

    
    // Defining some game constants for our player : 
    const PLAYER_SPEED = 200;
    let flipX;
    // First lets create our player sprite : 
    const player = add([
        // rect(PLAYER_WIDTH, PLAYER_HEIGHT),
        sprite("player2"),
        scale(0.5),
        pos(100, 550),
        body(),
        solid(),
        area(),
        "player"
    ])
    //   You would still be able to go to the next level no matter if the answer is true or false.

wait(9,()=>{
    let skull = add([
        sprite("vanita"),
        scale(0.8),
        pos((width() / 2) - 150, (height() / 2) - 200),
        "vanita",
    ])
    wait(0.7, () => {
        destroy(skull)
    })
wait(4, () => {
    let option1Box = add([
        rect(200,80),
        color(0,0,0),
        pos(170,380),
        area(),
        "option1Box"
    ])
        let option1 = add([
            text("Death"),
            scale(3),
            area(), 
            pos(200, 400),
            "option1"
        ])
        onClick("option1Box", ()=>{
            destroy(background)
            destroy(option1)
            destroy(option2)
            destroy(option3)
            destroy(option4)
            destroy(option1Box)
            destroy(option2Box)
            destroy(option4Box)
            destroy(option3Box)
            let EndingText = add([
                text("This levels shows what the Perceptual Difficulties are"),
                pos(20,440),
                scale(2.6)
            ])
            add([
                text("for a dyslexic person"),
                pos(20, 460),
                scale(2.6)
            ])
            add([
                text("but don't worry,"),
                pos(20, 300),
                scale(3.2),
                
            ])
            add([
                text("you were supposed to lose"),
                pos(20, 350),
                scale(3),
                
            ])
            add([
                text("press RIGHT to reach the next level"),
                pos(80, 630),
                scale(2),
                
            ])

            add([
                text("the right answer is Beauty"),
                pos(20, 380),
                scale(3),
            ])

            add([
                text("Look Closely"),
                pos(100, 100),
                scale(3),
                color(255,0,0)
            ])
            add([
                text("There is a woman!"),
                pos(20, 200),
                scale(3),
                color(255,0,0)
            ])
            add([
                sprite("vanita"),
                pos(800, (height() / 2) - 400),
                scale(0.8),
                solid(),
                area(),
            ])
            every("thisTextToo",destroy)
            const roar = play("roar",{
                volume:0.4,
            })
            add([
                sprite("angryProfessorLevel3"),
                pos(450,50),
                scale(1),
            ])
            onKeyDown("right", () => {
                player.flipX(false)
                flipX = false
                player.move(PLAYER_SPEED, 0)
            })
            onKeyDown("left", () => {
                player.flipX(true)
                flipX = true
                if (toScreen(player.pos).x > 20) {
                    player.move(-PLAYER_SPEED, 0)
                }
            })

        })
        let option2Box = add([
            rect(200,80),
            color(0,0,0),
            pos(390,380),
            area(),
            "option2Box"
        ])
        let option2 = add([
            text('Beauty'),
            scale(3),
            pos(440, 400),
            area(),
            "option2"
        ])
        onClick("option2Box", ()=>{
            add([
                sprite("happyProfessorBlue"),
                pos((width() / 2) - 150, (height() / 2) - 300),
                scale(1),
                solid(),
                area(),
            ])
            add([
                sprite("vanita"),
                pos(900, (height() / 2) - 300),
                scale(0.6),
                solid(),
                area(),
            ])
            destroy(background)
            destroy(option1)
            destroy(option2)
            destroy(option3)
            destroy(option4)
            destroy(option1Box)
            destroy(option2Box)
            destroy(option4Box)
            destroy(option3Box)
            let endingText = add([
                text("This level shows what the Perceptual Difficulties are"),
                pos(10,400),
                scale(2.6)
            ])
            add([
                text("for a dyslexic person"),
                pos(20, 460),
                scale(2.6)
            ])
            add([
                text("Good Job !"),
                pos(100, 100),
                scale(3),
                color(255,0,0)
            ])
            add([
                text("You saw the woman"),
                pos(20, 200),
                scale(3),
                color(255,0,0)
            ])
            add([
                text("press RIGHT to reach the next level"),
                pos(80, 630),
                scale(2),
                
            ])
            every("thisTextToo",destroy)
            const laugh = play("laugh", {
                volume: 0.4,
            })
            onKeyDown("right", () => {
                player.flipX(false)
                flipX = false
                player.move(PLAYER_SPEED, 0)
            })
            onKeyDown("left", () => {
                player.flipX(true)
                flipX = true
                if (toScreen(player.pos).x > 20) {
                    player.move(-PLAYER_SPEED, 0)
                }
            })

            // Collision with the door : 
            player.onCollide("door", () => {
                wait(1, () => {
                    go("gameLevel2")
                })

            })
         })
         let option3Box = add([
            rect(200,80),
            color(0,0,0),
            pos(600,380),
            area(),
            "option3Box"
        ])
        let option3 = add([
            text('Skull'),
            scale(3),
            pos(650, 400),
            area(),
            "vanita"
        ])
        onClick("option3Box", ()=>{
            destroy(background)
            destroy(option1)
            destroy(option2)
            destroy(option3)
            destroy(option4)
            destroy(option1Box)
            destroy(option2Box)
            destroy(option4Box)
            destroy(option3Box)
            let EndingText = add([
                text("This level shows what the Perceptual Difficulties are"),
                pos(20,440),
                scale(2.6)
            ])
            add([
                text("for a dyslexic person"),
                pos(20, 460),
                scale(2.6)
            ])

            add([
                text("but don't worry,"),
                pos(20, 300),
                scale(3.2),
                
            ])
            add([
                text("you were supposed to lose"),
                pos(20, 350),
                scale(3),
                
            ])
            add([
                text("the right answer is Beauty"),
                pos(20, 380),
                scale(3),
            ])
            add([
                text("Look Closely"),
                pos(100, 100),
                scale(3),
                color(255,0,0)
            ])
            add([
                text("There is a woman!"),
                pos(20, 200),
                scale(3),
                color(255,0,0)
            ])
            add([
                text("press RIGHT to reach the next level"),
                pos(80, 630),
                scale(2),
                
            ])
            add([
                sprite("vanita"),
                pos(800, (height() / 2) - 400),
                scale(0.8),
                solid(),
                area(),
            ])
            every("thisTextToo",destroy)
            const roar = play("roar",{
                volume:0.4,
            })
            add([
                sprite("angryProfessorLevel3"),
                pos(450,50),
                scale(1),
            ])
            onKeyDown("right", () => {
                player.flipX(false)
                flipX = false
                player.move(PLAYER_SPEED, 0)
            })
            onKeyDown("left", () => {
                player.flipX(true)
                flipX = true
                if (toScreen(player.pos).x > 20) {
                    player.move(-PLAYER_SPEED, 0)
                }
            })

        })
        let option4Box = add([
            rect(200,80),
            color(0,0,0),
            pos(820,380),
            area(),
            "option4Box"
        ])
        let option4 = add([
            text('Hell'),
            scale(3),
            pos(850, 400),
            area(),
            "option4"
        ])
        onClick("option4Box", ()=>{
            destroy(background)
            destroy(option1)
            destroy(option2)
            destroy(option3)
            destroy(option4)
            destroy(option1Box)
            destroy(option2Box)
            destroy(option4Box)
            destroy(option3Box)
            let EndingText = add([
                text("This level shows what the Perceptual Difficulties are"),
                pos(20,440),
                scale(2.6)
            ])
            add([
                text("for a dyslexic person"),
                pos(20, 460),
                scale(2.6)
            ])

            add([
                text("but don't worry,"),
                pos(20, 300),
                scale(3.2),
                
            ])
            add([
                text("you were supposed to lose"),
                pos(20, 350),
                scale(3),
                
            ])
            add([
                text("the right answer is Beauty"),
                pos(20, 380),
                scale(3),
                
            ])
            add([
                text("press RIGHT to reach the next level"),
                pos(80, 630),
                scale(2),
                
            ])
            add([
                text("Look Closely"),
                pos(100, 100),
                scale(3),
                color(255,0,0)
            ])
            add([
                text("There is a woman!"),
                pos(20, 200),
                scale(3),
                color(255,0,0)
            ])
            add([
                sprite("vanita"),
                pos(800, (height() / 2) - 400),
                scale(0.8),
                solid(),
                area(),
            ])
            every("thisTextToo",destroy)
            const roar = play("roar",{
                volume:0.4,
            })
            add([
                sprite("angryProfessorBlack"),
                pos(450,50),
                scale(1),
            ])
            onKeyDown("right", () => {
                player.flipX(false)
                flipX = false
                player.move(PLAYER_SPEED, 0)
            })
            onKeyDown("left", () => {
                player.flipX(true)
                flipX = true
                if (toScreen(player.pos).x > 20) {
                    player.move(-PLAYER_SPEED, 0)
                }
            })

         })
    })
 
    // Collsion Between our player and the door and going to the next level LEVEL NUMBER 3 : 
    player.onCollide("door_white", () => {
        console.log("You collided with the door")
        wait(1, () => {
            go("gameLevel3");
        })
    })
})
})

// Level 3 
//------------------------ Our Level number 3 scene is here ------------------------: 
scene("gameLevel3", () => {
    let background = add([
        sprite("background2"),
        scale(2.2)
    ])
    // Our Level text : 
    add([text("Welcome to Level no. 3"),
    pos((width() / 2) - 300, 100),
    lifespan(3, { fade: 0.8 }),
    scale(3),
    color(255, 255, 255,)
    ])
    // Waiting three seconds and adding this text : 

    wait(3, () => {
        add([text("Tell us what you see?"),
        pos((width() / 2) - 280, 100),
        lifespan(10, { fade: 0.8 }),
        scale(3),
        color(255, 255, 255,),
        "text1"
        ])
    })

    // Waiting 7 seconds and doing this : 

    wait(7, () => {
        // Adding our incomprehensible cow : 
        let cow1 = add([
            sprite('cow2'),
            pos((width() / 2) - 80, (height() / 2) - 180),
            scale(0.9)
        ])
      
        // Creating an input tag to take input from the user : 

        let input = document.createElement('input');
        input.id = "myinput"
        input.style.zIndex = "1"
        // input.style.display = "flex";
        input.style.height = "50px";
        input.style.width = "60px";
        input.style.border = "2px solid red";
        input.style.position = "absolute"
        input.style.top = "500px"
        input.style.left = "530px"
        input.type = "text"
        input.style.borderRadius = "10px"
        input.style.fontSize = "20px"
        document.body.appendChild(input);

        // Adding Event Listener for when you click outside the input tag : 

        input.addEventListener("blur", () => {
            if ((input.value).toLowerCase() == "cow") {
                destroy(cow1)
                input.remove()
                // Adding win Text here : 

                add([
                    text("YOU WON THE GAME !"),
                    pos((width() / 2) - 400, 50),
                    color(255, 0, 255),
                    scale(5)
                ])
                // Playing our Professor laugh : 
                const laugh = play("laugh",{
                    volume:0.4,
                })
                // Our Happy Professor : 
                add([
                    sprite("happyProfessorBlue"),
                    pos((width() / 2) - 200, (height() / 2) - 200),
                    scale(1),
                    solid(),
                    area(),
                ])
                add([
                    sprite('cow1'),
                    pos(800, 160),
                    scale(0.8)
                ])

                add([
                    text("As a dyslexic, you have experienced the perceptual difficulties involved "),
                    pos(20, 380),
                    color(255, 255, 255),
                    scale(2.15)
                ])
                add([
                    text("in processing an image. As a dyslexic, the understanding of the image is"),
                    pos(20, 410),
                    color(255, 255, 255),
                    scale(2.15)
                ])
                add([
                    text("given by the guidelines offered by the educator, as you see in the picture"),
                    pos(20, 440),
                    color(255, 255, 255),
                    scale(2.15)
                ])
                add([
                    text("above"),
                    pos(580, 470),
                    color(255, 255, 255),
                    scale(2.15)
                ])
                add([
                    text("Press any key to go back to the game. "),
                    pos(290, 500),
                    color(0, 0, 255),
                    scale(3)
                ])
                //    Going back to the game : 

                onKeyPress(() => {
                    go("gameLevel0")
                })
                add([
                    text("You have sharp eyes"),
                    pos(20, 200),
                    scale(3)
                ])
                //  End of Game Text here : 

                add([
                    text("---End of Game---"),
                    pos((width() / 2) - 550, 550),
                    color(255, 0, 0),
                    scale(7)
                ])
            }
            else {
                destroy(cow1)
                input.remove()
                // Adding Lose Text here : 

                add([
                    text("YOU LOST THE GAME !"),
                    pos((width() / 2) - 400, 70),
                    color(255, 0, 255),
                    scale(5)
                ])
                // Playing our professor roar : 
                const roar = play("roar",{
                    volume:0.4,
                })
                   // Our Happy Professor : 
                   add([
                    sprite("angryProfessorLevel3"),
                    pos((width() / 2) - 150, (height() / 2) - 200),
                    scale(1),
                    solid(),
                    area(),
                ])
                add([
                    text("Press any key to go back to the game. "),
                    pos(290, 500),
                    color(255, 255, 255),
                    scale(3)
                ])
                add([
                    text("As a dyslexic, you have experienced the perceptual difficulties involved "),
                    pos(20, 380),
                    color(255, 255, 255),
                    scale(2.15)
                ])
                add([
                    text("in processing an image. As a dyslexic, the understanding of the image is"),
                    pos(20, 410),
                    color(255, 255, 255),
                    scale(2.15)
                ])
                add([
                    text("given by the guidelines offered by the educator, as you see in the picture"),
                    pos(20, 440),
                    color(255, 255, 255),
                    scale(2.15)
                ])
                add([
                    text("above"),
                    pos(580, 470),
                    color(255, 255, 255),
                    scale(2.15)
                ])

                add([
                    text("It's a COW"),
                    pos(150, 300),
                    color(255, 0, 0),
                    scale(3)
                ])
                 add([
                    sprite('cow1'),
                    pos(800, 160),
                    scale(0.8)
                ])
                // Going Back to the game :
                onKeyPress(() => {
                    go("gameLevel0")
                })

                //  End of Game Text here : 

                add([
                    text("---End of Game---"),
                    pos((width() / 2) - 550, 550),
                    color(255, 0, 0),
                    scale(7)
                ])
            }
        })
    })

})
