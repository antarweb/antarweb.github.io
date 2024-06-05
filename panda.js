    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
    input.addEventListener('input', movePandaEyes);
    input.addEventListener('input', shakePandaEars);
    input.addEventListener('focus', lookLeftDown);
    input.addEventListener('blur', lookStraightAndSmile);
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for demo purposes
    winkPanda();
});

function movePandaEyes(event) {
    const eyeLeftGroup = document.getElementById('eye-left-group');
    const eyeRightGroup = document.getElementById('eye-right-group');
    const inputLength = event.target.value.length;
    const maxOffset = 4; // Maximum pixels to move left or right
    const moveRatio = 0.2; // Movement ratio to control sensitivity

    // Calculate the offset based on input length
    const offset = Math.min(inputLength * moveRatio, maxOffset);

    // Update eye positions smoothly
    eyeLeftGroup.setAttribute('transform', `translate(${offset - 2}, 2.5)`); // Maintain the downward look
    eyeRightGroup.setAttribute('transform', `translate(${offset - 2}, 2.5)`); // Maintain the downward look
}

function shakePandaEars() {
    const earLeft = document.getElementById('ear-left');
    const earRight = document.getElementById('ear-right');
    const earLeft2 = document.getElementById('ear-left2');
    const earRight2 = document.getElementById('ear-right2');

    // Smooth transition to the shaking position
    earLeft.style.transition = 'transform 0.1s ease-in-out';
    earRight.style.transition = 'transform 0.1s ease-in-out';
    earLeft2.style.transition = 'transform 0.1s ease-in-out';
    earRight2.style.transition = 'transform 0.1s ease-in-out';
    
    earLeft.style.transform = 'translateY(-3px)';
    earRight.style.transform = 'translateY(-3px)';
    earLeft2.style.transform = 'translateY(-3px)';
    earRight2.style.transform = 'translateY(-3px)';

    // Restore the ears to their original position
    setTimeout(() => {
        earLeft.style.transform = 'translateY(0)';
        earRight.style.transform = 'translateY(0)';
        earLeft2.style.transform = 'translateY(0)';
        earRight2.style.transform = 'translateY(0)';
    }, 100); // Restore the ears after 0.1 seconds
}

function lookLeftDown() {
    const eyeLeftGroup = document.getElementById('eye-left-group');
    const eyeRightGroup = document.getElementById('eye-right-group');
    const mouth = document.getElementById('mouth');

    // Smooth transition to the left-down position
    eyeLeftGroup.style.transition = 'transform 0.5s ease-out';
    eyeRightGroup.style.transition = 'transform 0.5s ease-out';
    mouth.style.transition = 'd 0.5s ease-out';

    eyeLeftGroup.setAttribute('transform', 'translate(-2, 2.5)');
    eyeRightGroup.setAttribute('transform', 'translate(-2, 2.5)');

    // Update mouth to thinking expression
    mouth.setAttribute('d', 'M44,70 Q50,72 56,70');
}

function lookStraightAndSmile() {
    const eyeLeftGroup = document.getElementById('eye-left-group');
    const eyeRightGroup = document.getElementById('eye-right-group');
    const mouth = document.getElementById('mouth');

    // Smooth transition to the center position
    eyeLeftGroup.style.transition = 'transform 0.5s ease-out';
    eyeRightGroup.style.transition = 'transform 0.5s ease-out';
    mouth.style.transition = 'd 0.5s ease-out';
    
    eyeLeftGroup.setAttribute('transform', 'translate(0, 0)');
    eyeRightGroup.setAttribute('transform', 'translate(0, 0)');
    
    // Update mouth to smiling expression
    mouth.setAttribute('d', 'M42,70 Q50,75 58,70');
}

function winkPanda() {
    const eyeLeft = document.getElementById('eye-left');
    const eyeLeftb1 = document.getElementById('eye-left-bubble');
    const eyeLeftb2 = document.getElementById('eye-left-bubble-2');
    const mouth = document.getElementById('mouth');

    // Wink the left eye
    eyeLeft.setAttribute('ry', 1);
    eyeLeftb1.setAttribute('ry', 0);
    eyeLeftb2.setAttribute('ry', 0);

    // Update mouth to smiling expression
    mouth.setAttribute('d', 'M42,70 Q50,75 58,70');

    // Restore the eye after a short delay
    setTimeout(() => {
        eyeLeft.setAttribute('rx', 5);
        eyeLeft.setAttribute('ry', 6);
    eyeLeftb1.setAttribute('rx', 2);
    eyeLeftb2.setAttribute('rx', 1.5);
    eyeLeftb1.setAttribute('ry', 2);
    eyeLeftb2.setAttribute('ry', 1.5);
    }, 200); // Restore the eye after 0.2 seconds
}