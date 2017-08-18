/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

class Helper {

    lerp(current, target, fraction) {
        if(isNaN(target) || target === Infinity || target === -Infinity) return current;
        return current + (target - current) * fraction;
    }

    constrain(max, min, value) {
        return Math.min(max, Math.max(min, value));
    }

}

module.exports = Helper;
