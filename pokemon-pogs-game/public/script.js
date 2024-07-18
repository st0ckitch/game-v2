document.addEventListener('DOMContentLoaded', () => {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleMotionEvent, true);
    } else {
        alert('Device Motion not supported');
    }

    let startX = 0;
    let startY = 0;
    let startZ = 0;
    let isSlapping = false;
    const powerFill = document.getElementById('powerFill');
    const feedback = document.getElementById('feedback');

    function handleMotionEvent(event) {
        const acceleration = event.accelerationIncludingGravity;

        if (isSlapping) {
            const power = calculatePower(acceleration.x - startX, acceleration.y - startY, acceleration.z - startZ);
            updatePowerMeter(power);
        }
    }

    document.body.addEventListener('touchstart', () => {
        isSlapping = true;
        const motion = window.DeviceMotionEvent.accelerationIncludingGravity;
        startX = motion.x;
        startY = motion.y;
        startZ = motion.z;
    });

    document.body.addEventListener('touchend', () => {
        isSlapping = false;
        const power = parseFloat(powerFill.style.width);
        provideFeedback(power);
    });

    function calculatePower(x, y, z) {
        return Math.sqrt(x * x + y * y + z * z).toFixed(2);
    }

    function updatePowerMeter(power) {
        const powerPercentage = Math.min(power * 10, 100); // Adjust this factor for calibration
        powerFill.style.width = powerPercentage + '%';
    }

    function provideFeedback(power) {
        if (power > 50) { // Adjust threshold for successful slap
            feedback.textContent = 'Successful Slap!';
        } else {
            feedback.textContent = 'Try Harder!';
        }
        powerFill.style.width = '0%';
    }
});
    