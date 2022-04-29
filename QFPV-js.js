//Please note code was used from https://www.sitepoint.com/simple-javascript-quiz
(function () {
    // Functions
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );

        // combine the ouput 
        quizContainer.innerHTML = output.join('');
    }

    //Funtion to iterate through each question, check to see if the user input is correct and then display red or green accordingly
    function showResults() {

        // get answers from the quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;
            }
            // if answer is wrong or blank
            else {
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length} Questions correct!`;
    }

    // this will effectivelycreate slides that are revealed and hidden in order to display each question 
    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        //hide previous button the first slide and the next button on the last
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }

    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    // Variables created, including all quiz questions
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "Which VTX output power will give you the best range?",
            answers: {
                A: "25mw",
                B: "100mw",
                C: "200mw",
                D: "500mw"
            },
            correctAnswer: "D"
        },
        {
            question: "You are 2 miles away from your starting position and your video signal begins to cut out, should you?",
            answers: {
                A: "Raise your controller over your head",
                B: "Increase the quads altitude",
                C: "Turn around and dive",
                D: "Drop to your knees and pray"
            },
            correctAnswer: "B"
        },
        {
            question: "What is the maximum legal flight height in the UK?",
            answers: {
                A: "22m",
                B: "122m",
                C: "222m",
                D: "333m"
            },
            correctAnswer: "B"
        },
        {
            question: "What voltage should you store your lipo batteries at?",
            answers: {
                A: "3.2v",
                B: "3.8v",
                C: "4.2v",
                D: "4.8v"
            },
            correctAnswer: "B"
        },
        {
            question: "Video link quality can depend on which on the following?",
            answers: {
                A: "Clouds",
                B: "Rain",
                C: "Wind",
                D: "Atenna postion"
            },
            correctAnswer: "D"
        },
        {
            question: "When is it safe to arm your quad?",
            answers: {
                A: "In your bedroom, with the propellors attached",
                B: "In a crowded park",
                C: "In an open space, 10m away from the drone",
                D: "In an open space, standing over the drone"
            },
            correctAnswer: "C"
        },
        {
            question: "Props out propellor direction is genrellay accepted as a better configuration?",
            answers: {
                True: "Props Out",
                False: "Prop In"
            },
            correctAnswer: "True"
        },
        {
            question: "What is not an acrobatic trick in FPV?",
            answers: {
                A: "Split S",
                B: "Power Loop",
                C: "Yaw Spin",
                D: "Jam Roll"
            },
            correctAnswer: "D"
        },
        {
            question: "In FPV what does ESC stand for?",
            answers: {
                A: "Electric Speed controller",
                B: "Electro-static Charge",
                C: "European Society of Cardiology",
                D: "Eurovision Song Contest"
            },
            correctAnswer: "A"
        }
    ];

    // start the quiz
    buildQuiz();

    // navigation of the questions
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Show the first quiz question
    showSlide(currentSlide);

    //when these buttons are clicked, call the relevant function
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
